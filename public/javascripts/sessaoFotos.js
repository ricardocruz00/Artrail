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

    document.getElementById("usernameSection").innerHTML = 
        "<h3>"+sessao.sessaoInfo.nome_user+"</h3>";

    document.getElementById("sessao").innerHTML =
    // "<button class='material-icons btn'>favorite</button>"+
        "<p class='nomeArte'>"+sessao.sessaoInfo.nome+"</p>"+
        "<p>Artista: "+sessao.sessaoInfo.nome_artista+"</p>"+
        "<p>Descrição: "+sessao.sessaoInfo.descricao+"</p>"+
        "<p>Estado de Conservação: "+sessao.sessaoInfo.estado_conservacao+"</p>"+
        "<p>"+sessao.sessaoInfo.timestamp+"</p>"
    //"<p>Publicado por: "+sessao.sessaoInfo.nome_user+"</p>"

    let elemFotos = document.getElementById("fotos");
    let htmlImage = "";
    let htmlImage1 = "";
    let htmlImage2 = "";
    for (let foto of sessao.fotos) {
            // htmlImage +="<div class='fotos'>"+ foto.imagem +"</div>";
            // htmlImage1 +="<section style='width:30%;cursor:zoom-in' onclick='document.getElementById('"+foto.fotografiaID+"').style.display='block''>"+
            // ""+ foto.imagem +""+
            //   "</section>"+
            // "<div id='"+foto.fotografiaID+"' class='w3-modal' onclick='this.style.display='none''>"+
            //   "<div class='w3-modal-content w3-animate-zoom' >"+
            //     ""+ foto.imagem +""+
            //   "</div>"+
            // "</div>"; 

            htmlImage2 +="<section class='imagemSessao' onclick='zoomImage("+foto.fotografiaID+")'>"+
            foto.imagem +
            "</section>"+
            "<div id='"+foto.fotografiaID+"' class='w3-modal' onclick='sairZoom("+foto.fotografiaID+")'>"+
              "<div class='w3-modal-content w3-animate-zoom' >"+
              ""+ foto.imagem +""+
              "</div>"+
            "</div>";
        }
    elemFotos.innerHTML = htmlImage2;

}

function zoomImage(fotografiaID){
    console.log(fotografiaID);
    document.getElementById(fotografiaID).style.display = 'block'
}

function sairZoom(fotografiaID){
    document.getElementById(fotografiaID).style.display = 'none'}

async function logOut() {
    await sessionStorage.removeItem("userID");
    window.location = "sessaoFotos.html";
}