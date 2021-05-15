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



async function showArtes(artes) {
    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
    }
    let elemAside = document.getElementById("galeria");
    let html = "";
    for (let arte of artes) {
            html += "<section class='arteMoldura' id = 'arte' onclick='showSessoes("+arte.arteID1+","+JSON.stringify(arte.nome_artista)+")' >"+
            "<div class='imagemArte-zoom imagemArte-zoom-slow'> <img class='imagemArte' src=" + arte.imagem + "> </div>"+
            "<section class='infoArte'> <h1>" + arte.nome + "</h1>" +
            "<p>Artista: "+ arte.nome_artista +"</p>"+
            "<p> Localização: " + arte.latitude + ", " + arte.longitude +" </p> </section> </section>"
        }
    elemAside.innerHTML = html;
}

function showSessoes(arteID,nome_artista) {
    sessionStorage.setItem("arteID",arteID);
    sessionStorage.setItem("nome_artista",nome_artista);
    window.location = "sessoes.html";
}