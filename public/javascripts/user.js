window.onload = async function () {
    loadFavoritos()

    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPage.html'>" + sessionStorage.getItem("nome_user") + "</a>";
    }
}

async function loadFavoritos() {
    userID = sessionStorage.getItem("userID")
    console.log(userID);
    try {
        let favoritos = await $.ajax({
            url: "/api/users/favoritos/" + userID,
            method: "get",
            dataType: "json",
        });
        showFavoritos(favoritos)
    } catch (err) {
        console.log(err);
    }
}

async function showFavoritos(favoritos) {
    console.log(JSON.stringify(favoritos));
    console.log(JSON.stringify(favoritos.descricao));
    let html = "";
    for (let favorito of favoritos) {
        html = "<figure class='img__wrap' onclick='showSessao(" + favorito.sessao_id + ")'>" +
            "<img class='favImage' src=" + favorito.imagem + ">" +
            "<div class='img__description_layer'>" +
            "<p class='img__description'>" +
            "" + favorito.timestamp + "<br>" +
            "Descrição: " + favorito.descricao + "<br>" +
            "</p>" +
            "</div></figure>";

        html1 =
            "<img src=" + favorito.imagem + ">" +
            "<p>"+ favorito.timestamp + "<br>" +
            "Descrição: " + favorito.descricao + "<br>" +
            "</p>";
    }
    document.getElementById("favoritos").innerHTML = html;
}

function showSessao(sessaoID) {
    sessionStorage.setItem("sessaoID", sessaoID);
    window.location = "sessaoFotos.html";
}
