window.onload = async function() {
    let arteID = sessionStorage.getItem("arteID");
    let nome_artista = sessionStorage.getItem("nome_artista");
    
    let sessoes = await $.ajax({
        url: "/api/sessoes/"+arteID,
        method: "get",
        dataType: "json"
    });
    console.log(sessoes);
    console.log(JSON.stringify(nome_artista));

    let nomeArtistaHTML = "";
    nomeArtistaHTML += "<p>Artista: "+nome_artista+"</p>";
    document.getElementById("artista").innerHTML = nomeArtistaHTML;


    let html = "";
    for(let sessao of sessoes) {
        html+= "<section class='arteMoldura'id='arteMoldura'>"+
        "<div class='imagemArte-zoom imagemArte-zoom-slow'> <img class='imagemArte' src=" + sessao.imagem + "> </div>"+
        "<section class='infoArte'>"+
        "<p>Descrição: "+sessao.descricao+"</p>"+
        "<p>Estado de Conservação: "+sessao.estado_conservacao+"</p>"+
        "<p>"+sessao.timestamp+"</p>"+
        "<p>Publicado por: "+sessao.nome_user+"</p> </section> </section>";
    }
    document.getElementById("lista").innerHTML = html;
}

