window.onload = function () {
    loadArtes();
    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPage.html'>" + sessionStorage.getItem("nome_user") + "</a>";
    }
}

async function logOut() {
    await sessionStorage.removeItem("userID");
    window.location = "mapa.html";
}

async function loadArtes() {

    let elemAside = document.getElementById("error");
        try {
            let artes = await $.ajax({
                url: "/api/artes",
                method: "get",
                dataType: "json"
            });
            //console.log(JSON.stringify(artes));
            //showArtes(artes);
            artesMarkers(artes);
        } catch (err) {
            console.log(err);
            elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
                "<h2> Por favor tente mais tarde</h2>";
        }
}



async function showArtesMapa(arteID, arteNome, arteArtista, arteImagem) {
    let html = "";
    html+="<img src=" + arteImagem + ">"+
    "<p>Nome da arte: "+arteNome+"</p>"+
    "<p>Artista: "+arteArtista+"</p>";
     

    document.getElementById("infoC").innerHTML = html;
    console.log(arteID, arteNome, arteArtista, arteImagem);
}
