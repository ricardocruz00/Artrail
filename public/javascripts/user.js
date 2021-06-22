window.onload = async function () {
    loadFavoritos()
    loadSuasSessoes()

    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPageSessoes.html'>" + sessionStorage.getItem("nome_user") + "</a>";
        let userSection = document.getElementById("usernameSection");
        userSection.innerHTML = "<p class='nome'>" + sessionStorage.getItem("nome_user") + "</p>";
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
    //console.log(JSON.stringify(favoritos));
    let html = "";
    for (let favorito of favoritos) {
        console.log(JSON.stringify(favorito.descricao));
        html +=
            "<figure class='img__wrap'>" +
            "<section class='favImage'>"+ favorito.imagem +"</section>" +
            "<input type='button' class='removeFavB' value='✖ Remove' onclick='removerFavorito(" + favorito.favoritosID + ")'>"+
            "<div class='img__description_layer' onclick='showSessao(" + favorito.sessao_id + ")'>" +
            "<p class='img__description'>" +
            "" + favorito.timestamp + "<br>" +
            "Description: " + favorito.descricao + "<br>" +
            "</p>" +
            "</div>"+
            "</figure>";
            
    }
    document.getElementById("favoritos").innerHTML = html;
}

async function loadSuasSessoes() {
    userID = sessionStorage.getItem("userID")
    console.log(userID);
    try {
        let sessoesUser = await $.ajax({
            url: "/api/users/sessoesUser/" + userID,
            method: "get",
            dataType: "json",
        });
        showSuasSessoes(sessoesUser)
    } catch (err) {
        console.log(err);
    }
}

async function showSuasSessoes(sessoesUser) {
    //console.log(JSON.stringify(sessaoUsers));
    let html = "";
    for (let sessaoUser of sessoesUser) {
        console.log(JSON.stringify(sessaoUser.descricao));
        html +=
            "<figure class='img__wrap'>" +
            "<section class='favImage' onclick='showSessao(" + sessaoUser.sessaoID + ")' >"+ sessaoUser.imagem +"</section>" +
            "<div class='.img__description_layer' >" +
            "<p class='img__description'>" +
            "" + sessaoUser.timestamp + "<br>" +
            "Description: " + sessaoUser.descricao + "<br>" +
            "</p>" +
            "</div>"+
            "</figure>";
            
    }
    document.getElementById("suasSessoes").innerHTML = html;
}

function showSessao(sessaoID) {
    sessionStorage.setItem("sessaoID", sessaoID);
    window.location = "sessaoFotos.html";
}

async function removerFavorito(favoritosID) {
     try {
         let favorito = await $.ajax({
           url: "/api/users/removeFav/" + favoritosID,
           method: "put",
           dataType: "json"
         });
         loadFavoritos();
       } catch (err) {
         console.log(err);
       }
}

async function logOut() {
    await sessionStorage.removeItem("userID");
    window.location = "index.html";
}