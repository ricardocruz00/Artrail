window.onload = async function() {
    let arteID = sessionStorage.getItem("arteID");
    let nome_artista = sessionStorage.getItem("nome_artista");
    
    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPage.html'>" + sessionStorage.getItem("nome_user") + "</a>";
    }

    let sessoes = await $.ajax({
        url: "/api/sessoes/"+arteID,
        method: "get",
        dataType: "json"
    });
    console.log(sessoes);
    console.log(JSON.stringify(nome_artista));

    let nomeArtistaHTML = "";
    nomeArtistaHTML += "<p>"+nome_artista+"</p>";
    document.getElementById("artista").innerHTML = nomeArtistaHTML;


    let html = "";
    for(let sessao of sessoes) {
        html+= "<figure class='img__wrap' onclick='showSessao("+sessao.sessaoID1+")'>"+
        ""+ sessao.imagem +""+
        "<div class='img__description_layer'>"+
        "<p class='img__description'>"+
        "Descrição: "+sessao.descricao+"<br>"+
        "Estado de Conservação: "+sessao.estado_conservacao+"<br>"+
        ""+sessao.timestamp+"<br>"+
        "Publicado por: "+sessao.nome_user+"<br>"+
        "</p>"+
        // "<section class='overlay'>"+
        // "<div class='text'>"+
        // "Descrição: "+sessao.descricao+""+
        // "Estado de Conservação: "+sessao.estado_conservacao+""+
        // ""+sessao.timestamp+""+
        // "Publicado por: "+sessao.nome_user+" </div> </section>" +
        "</div></figure>";
    }
    document.getElementById("lista").innerHTML = html;

    
}

function showSessao(sessaoID) {
        sessionStorage.setItem("sessaoID",sessaoID);
        window.location = "sessaoFotos.html";
}

async function logOut() {
    await sessionStorage.removeItem("userID");
    window.location = "sessoes.html";
}
