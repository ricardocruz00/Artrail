window.onload = async function() {

    let sessaoID = await sessionStorage.getItem("sessaoID");
      let sessao = await $.ajax({
        url: "/api/sessoes/info/"+sessaoID,
        method: "get",
        dataType: "json"
    });
    console.log(sessao);

    let sessaoID2 = await sessionStorage.getItem("sessaoID");
      let fotos = await $.ajax({
        url: "/api/sessao/"+sessaoID2,
        method: "get",
        dataType: "json"
    });
    console.log(fotos);

    document.getElementById("sessao").innerHTML = "<p>Descrição: "+sessao.descricao+"</p>"+
    "<p>Estado de Conservação: "+sessao.estado_conservacao+"</p>"+
    "<p>"+sessao.timestamp+"</p>"+
    "<p>Publicado por: "+sessao.nome_user+"</p>"


    let elemAside = document.getElementById("fotos");
    let html = "";
    for (let foto of fotos) {
            html +="<div> <img src=" + foto.imagem + "> </div>"
        }
    elemAside.innerHTML = html;
}