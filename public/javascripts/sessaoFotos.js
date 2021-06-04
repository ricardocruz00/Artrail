window.onload = async function() {

    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPage.html'>" + sessionStorage.getItem("nome_user") + "</a>";
    }

    let sessaoID = await sessionStorage.getItem("sessaoID");
      let sessao = await $.ajax({
        url: "/api/sessoes/info/"+sessaoID,
        method: "get",
        dataType: "json"
    });
    console.log(sessao);

    document.getElementById("sessao").innerHTML =
    // "<button class='material-icons btn'>favorite</button>"+
    "<p>Descrição: "+sessao.sessaoInfo.descricao+"</p>"+
    "<p>Estado de Conservação: "+sessao.sessaoInfo.estado_conservacao+"</p>"+
    "<p>"+sessao.sessaoInfo.timestamp+"</p>"+
    "<p>Publicado por: "+sessao.sessaoInfo.nome_user+"</p>"

    let elemAside = document.getElementById("fotos");
    let htmlImage = "";
    for (let foto of sessao.fotos) {
            htmlImage +="<div class='fotos'> <img src=" + foto.imagem + "> </div>";
        }
    elemAside.innerHTML = htmlImage;

}

async function logOut() {
    await sessionStorage.removeItem("userID");
    window.location = "sessaoFotos.html";
}