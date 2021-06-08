async function checkLogin() {
    var userName = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    let user = {
        username: userName,
        password: password
    } 
    if (userName.length == 0)
        swal("Introduza um Username ", "");
    else if (password.length == 0)
        swal("Introduza uma password ", "");
    else {
        try {
            let dados = await $.ajax({
                url: "/api/users/LoginDados/",
                method: "get",
                dataType: "json",
                data: user,
                contentType: "application/json"

            });
            console.log(dados);
            if (dados[0] != null) {
                await swal("Sessão Iniciada com sucesso!", "");
                sessionStorage.setItem("nome_user", dados[0].nome_user);
                sessionStorage.setItem("userID", dados[0].userID);
                window.location = "index.html";
            }
            else
            await swal("Username ou password incorreto!", "");;
        } catch (err) {
           
            console.log(err);
        }
    }
}


async function addUSer() {
    let nome_user = document.getElementById("name").value;
    let newUsername = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (nome_user.length == 0)
        swal("Introduza um nome ", "");
    else if (newUsername.length == 0)
        swal("Introduza um username ", "");
    else if (password.length == 0)
        swal("Introduza uma password ", "");
    else {
        let user = {
            nome_user: nome_user,
            username: newUsername,
            email: email,
            password: password,
        }
        try {
            let result = await $.ajax({
                url: "/api/users/novoUser",
                method: "post",
                dataType: "json",
                data: JSON.stringify(user),
                contentType: "application/json"
            });
            if (result == null) {
                swal("Username ja se encontra utilizado, por favor tente novamente com um username diferente!", "");
            }
            await swal("User registado")
            window.location = "login.html";
        } catch (err) {
            console.log(err);
        }
    }
}
