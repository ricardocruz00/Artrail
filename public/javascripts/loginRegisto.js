async function checkLogin() {
    var userName = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    let user = {
        username: userName,
        password: password
    } 
    if (userName.length == 0)
        swal("Enter a username ", "");
    else if (password.length == 0)
        swal("Enter a password ", "");
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
                await swal("User loged in!", "");
                sessionStorage.setItem("nome_user", dados[0].nome_user);
                sessionStorage.setItem("userID", dados[0].userID);
                window.location = "index.html";
            }
            else
            await swal("Username or password incorrect!", "");;
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
        swal("Enter a name ", "");
    else if (newUsername.length == 0)
        swal("Enter a username ", "");
    else if (password.length == 0)
        swal("Enter a password ", "");
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
                swal("This username is already taken, please try again with a different username", "");
            }
            await swal("User successfully registered")
            window.location = "login.html";
        } catch (err) {
            console.log(err);
        }
    }
}
