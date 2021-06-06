window.onload = async function () {
    loadFavoritos()

    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPage.html'>" + sessionStorage.getItem("nome_user") + "</a>";
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
            "<input type='button' class='removeFavB' value='✖ Retirar' onclick='removerFavorito(" + favorito.favoritosID + ")'>"+
            "<div class='img__description_layer' onclick='showSessao(" + favorito.sessao_id + ")'>" +
            "<p class='img__description'>" +
            "" + favorito.timestamp + "<br>" +
            "Descrição: " + favorito.descricao + "<br>" +
            "</p>" +
            "</div></figure>";
            
    }
    document.getElementById("favoritos").innerHTML = html;
}

function showSessao(sessaoID) {
    sessionStorage.setItem("sessaoID", sessaoID);
    window.location = "sessaoFotos.html";
}

//async function removerFavorito(favoritosID) {
//     try {
//         let reserva = await $.ajax({
//           url: "/api/users/updateNotificacao/" + favoritosID,
//           method: "put",
//           dataType: "json"
//         });
//         loadFavoritos();
//       } catch (err) {
//         console.log(err);
//       }
//     //window.location = "userPage.html";
// }
