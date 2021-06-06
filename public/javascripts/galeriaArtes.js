window.onload = function () {
    loadArtes();
}

async function loadArtes() {

    let elemAside = document.getElementById("galeria");
        try {
            let artes = await $.ajax({
                url: "/api/artes",
                method: "get",
                dataType: "json"
            });
            //console.log(JSON.stringify(artes));
            showArtes(artes);
        } catch (err) {
            console.log(err);
            elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
                "<h2> Por favor tente mais tarde</h2>";
        }
}

async function logOut() {
    await sessionStorage.removeItem("userID");
    window.location = "index.html";
}

async function showArtes(artes) {
    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPage.html'>" + sessionStorage.getItem("nome_user") + "</a>";
    }
    let elemAside = document.getElementById("galeria");
    let html = "";
    for (let arte of artes) {
            html += "<figure onclick='showSessoes("+arte.arteID1+","+JSON.stringify(arte.nome_artista)+")' >"+
            ""+ arte.imagem +"</figure>";
        }
    elemAside.innerHTML = html;
}

function showSessoes(arteID,nome_artista) {
    sessionStorage.setItem("arteID",arteID);
    sessionStorage.setItem("nome_artista",nome_artista);
    window.location = "sessoes.html";
}