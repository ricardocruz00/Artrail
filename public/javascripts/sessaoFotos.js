window.onload = async function() {
    loadCategoriasArte();

    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPageSessoes.html'>" + sessionStorage.getItem("nome_user") + "</a>";
    }

    let sessaoID = await sessionStorage.getItem("sessaoID");
      let sessao = await $.ajax({
        url: "/api/sessoes/info/"+sessaoID,
        method: "get",
        dataType: "json"
    });
    console.log(sessao);
    console.log(sessao.reports.nReports);

    document.getElementById("usernameSection").innerHTML = 
        "<h3>"+sessao.sessaoInfo.nome_user+"</h3>";
    
        if (sessao.reports.nReports !== 1){
    document.getElementById("sessao").innerHTML =
        "<p class='nomeArte'>"+sessao.sessaoInfo.nome+"</p>"+
        "<p>Artist: "+sessao.sessaoInfo.nome_artista+"</p>"+
        "<p>Description: "+sessao.sessaoInfo.descricao+"</p>"+
        "<p>Conservation state: "+sessao.sessaoInfo.estado_conservacao+"</p>"+
        "<p>"+sessao.sessaoInfo.timestamp+"</p>"+
        "<p>"+sessao.reports.nReports+" reports were made to this photo session</p>";
        
        if (sessionStorage.getItem("userID") !== null) {
            document.getElementById("sessao").innerHTML +=
        "<section class='report' id='report'><input type='button' value='Report' onclick='addReport()'></section>"+
        "<section class='fav' id='fav'><input type='button' value='Add to the Favorites List' onclick='addFavorito()'></section>";
        }
}
        else{
            document.getElementById("sessao").innerHTML =
        "<p class='nomeArte'>"+sessao.sessaoInfo.nome+"</p>"+
        "<p>Artist: "+sessao.sessaoInfo.nome_artista+"</p>"+
        "<p>Description: "+sessao.sessaoInfo.descricao+"</p>"+
        "<p>Conservation state: "+sessao.sessaoInfo.estado_conservacao+"</p>"+
        "<p>"+sessao.sessaoInfo.timestamp+"</p>"+
        "<p>"+sessao.reports.nReports+" 1 report was made to this photo session</p>";
        
        if (sessionStorage.getItem("userID") !== null) {
            document.getElementById("sessao").innerHTML +=
        "<section class='report' id='report'><input type='button' value='Report' onclick='addReport()'></section>"+
        "<section class='fav' id='fav'><input type='button' value='Add to the Favorites List' onclick='addFavorito()'></section>";
        }
        }

    let elemFotos = document.getElementById("fotos");
    let htmlImage = "";
    for (let foto of sessao.fotos) {
            htmlImage +="<section class='imagemSessao' onclick='zoomImage("+foto.fotografiaID+")'>"+
            foto.imagem +
            "</section>"+
            "<div id='"+foto.fotografiaID+"' class='w3-modal' onclick='sairZoom("+foto.fotografiaID+")'>"+
              "<div class='w3-modal-content w3-animate-zoom' >"+
              ""+ foto.imagem +""+
              "</div>"+
            "</div>";
        }
    elemFotos.innerHTML = htmlImage;

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

async function addReport() {
    let sessaoFotos_id = sessionStorage.getItem("sessaoID")
    let user_id = sessionStorage.getItem("userID")
    let review = {
        user_id: user_id,
        sessaoFotos_id: sessaoFotos_id
    }
    console.log(review);
    try {
        let result = await $.ajax({
            url: "/api/users/report/sessao",
            method: "post",
            dataType: "json",
            data: JSON.stringify(review),
            contentType: "application/json"
        });
        swal("Report done successfully!");
    } catch (err) {
        console.log(err);
    }
}

async function addFavorito() {
    let sessaoFotosID = sessionStorage.getItem("sessaoID")
    let userID = sessionStorage.getItem("userID")
    let favorito = {
        user_id: userID,
        sessao_id: sessaoFotosID
    }
    console.log(favorito);
    try {
        let result = await $.ajax({
            url: "/api/users/addFav/sessao",
            method: "post",
            dataType: "json",
            data: JSON.stringify(favorito),
            contentType: "application/json"
        });
        swal("This photography session was added to the favorites list!", {
            buttons: false,
            timer: 2500,
          });
    } catch (err) {
        console.log(err);
    }
}

async function loadCategoriasArte() {
    let arteID = sessionStorage.getItem("arteID");
    try {
        let categorias = await $.ajax({
            url: "/api/sessoes/categorias/arte/" + arteID,
            method: "get",
            dataType: "json",
        });
        showCategoriasArte(categorias)
    } catch (err) {
        console.log(err);
    }
}

async function showCategoriasArte(categorias) {
    let html="";
    for (let categoria of categorias) {
        html +=
            "<b>"+categoria.categoria_nome+"</b>";
            
    }
    document.getElementById("categoriasArte").innerHTML = html;
}