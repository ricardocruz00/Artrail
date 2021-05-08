window.onload = async function() {

    let sessaoID = await sessionStorage.getItem("sessaoID");
      let sessao = await $.ajax({
        url: "/api/sessoes/info/"+sessaoID,
        method: "get",
        dataType: "json"
    });
    console.log(sessao);

    document.getElementById("sessao").innerHTML = "<p>Descrição: "+sessao.descricao+"</p>"+
    "<p>Estado de Conservação: "+sessao.estado_conservacao+"</p>"+
    "<p>"+sessao.timestamp+"</p>"+
    "<p>Publicado por: "+sessao.nome_user+"</p>"

}