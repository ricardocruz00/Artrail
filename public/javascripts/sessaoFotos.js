window.onload = async function() {

    let sessaoID = await sessionStorage.getItem("sessaoID");
      let sessao = await $.ajax({
        url: "/api/sessoes/info/"+sessaoID,
        method: "get",
        dataType: "json"
    });
    console.log(sessao);

    document.getElementById("sessao").innerHTML = "<p>Descrição: "+sessao.sessaoInfo.descricao+"</p>"+
    "<p>Estado de Conservação: "+sessao.sessaoInfo.estado_conservacao+"</p>"+
    "<p>"+sessao.sessaoInfo.timestamp+"</p>"+
    "<p>Publicado por: "+sessao.sessaoInfo.nome_user+"</p>"

    let elemAside = document.getElementById("fotos");
    let htmlImage = "";
    for (let foto of sessao.fotos) {
            htmlImage +="<div class='fotos'> <img src=" + foto.imagem + "> </div>"
        }
    elemAside.innerHTML = htmlImage;

}