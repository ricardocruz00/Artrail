window.onload = async function () {
    loadCategoriasLista();
    loadEstadosLista();
    loadSessoes();

    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPageSessoes.html'>" + sessionStorage.getItem("nome_user") + "</a>";
    }
}

async function loadSessoes() {
    let arteID = sessionStorage.getItem("arteID");
    let elem = document.getElementById("lista");
    try {
        let sessoes = await $.ajax({
            url: "/api/sessoes/" + arteID,
            method: "get",
            dataType: "json"
        });
        // console.log(sessoes);
        // console.log(JSON.stringify(nome_artista));
        showSessoes(sessoes);
    } catch (err) {
        console.log(err);
        elem.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

async function showSessoes(sessoes) {
    let nome_artista = sessionStorage.getItem("nome_artista");
    let nomeArtistaHTML = "";
    nomeArtistaHTML += "<p>" + nome_artista + "</p>";
    document.getElementById("artista").innerHTML = nomeArtistaHTML;


    let html = "";
    for (let sessao of sessoes) {
        html += "<figure class='img__wrap' onclick='showSessao(" + sessao.sessaoID1 + ")'>" +
            "" + sessao.imagem + "" +
            "<div class='img__description_layer'>" +
            "<p class='img__description'>" +
            "Description: " + sessao.descricao + "<br>" +
            "Conservation state: " + sessao.estado_conservacao + "<br>" +
            "" + sessao.timestamp + "<br>" +
            "Published by: " + sessao.nome_user + "<br>" +
            "</p>" +
            "</div></figure>";
    }
    document.getElementById("lista").innerHTML = html;
}



function showSessao(sessaoID) {
    sessionStorage.setItem("sessaoID", sessaoID);
    window.location = "sessaoFotos.html";
}

async function logOut() {
    await sessionStorage.removeItem("userID");
    window.location = "sessoes.html";
}

async function loadCategoriasLista() {

    let elemCategorias = document.getElementById("categorias");
    try {
        let categorias = await $.ajax({
            url: "/api/sessoes/categorias/all",
            method: "get",
            dataType: "json"
        });
        // console.log(JSON.stringify(categorias));
        showCategorias(categorias);
    } catch (err) {
        console.log(err);
        elemCategorias.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

async function showCategorias(categorias) {
    if (sessionStorage.getItem("userID") !== null) {
        let htmlLabel = " <a>Give this Art Categories</a>"
        let html = "";
        for (let categoria of categorias) {
            console.log(JSON.stringify(categoria.categoria_nome));
            html += "<input type='button' class='categoriaB' value='" + categoria.categoria_nome + "' onclick='addCategoria(" + categoria.categoriaID + ")'></input>";
        }
        document.getElementById("categorias").innerHTML = html;
        document.getElementById("label").innerHTML = htmlLabel;
    }
}

async function addCategoria(categoria_id) {
    let arte_id = sessionStorage.getItem("arteID")
    let user_id = sessionStorage.getItem("userID")
    let categoriaArte = {
        user_id: user_id,
        arte_id: arte_id,
        categoria_id: categoria_id
    }
    console.log(categoriaArte);
    try {
        let result = await $.ajax({
            url: "/api/artes/categoria",
            method: "post",
            dataType: "json",
            data: JSON.stringify(categoriaArte),
            contentType: "application/json"
        });
        swal("Good job!", "Successfully assigned a category to this art!", "success");
    } catch (err) {
        console.log(err);
    }
}

async function loadEstadosLista() {

    let elemEstados = document.getElementById("estados");
    try {
        let estados = await $.ajax({
            url: "/api/sessoes/estados/all",
            method: "get",
            dataType: "json"
        });
        console.log(JSON.stringify(estados));
        showEstados(estados);
    } catch (err) {
        console.log(err);
        elemEstados.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

async function showEstados(estados) {
    let htmlLabel = " <a>States of Conservation</a>"
    let html = "";
    let html1 = "";
    for (let estado of estados) {
        console.log(JSON.stringify(estado.estado_conservacao));
        html += "<input type='button' class='estadoB' value='" + estado.estado_conservacao + "' onclick='filtrarSessoes(" + estado.estadoConservacaoArteID + ")'></input>";
        html1 += "<p>" + estado.estado_conservacao + "</p>";
    }
    document.getElementById("estados").innerHTML = html;
    document.getElementById("labelEstados").innerHTML = htmlLabel;
}

async function filtrarSessoes(estadoID) {
    let arteID = sessionStorage.getItem("arteID");
    let sessaoEstado = {
        arteID: arteID,
        estadoID: estadoID
    }
    try {
        let sessoesFiltradas = await $.ajax({
            url: "/api/sessoes/sessoesEstado/filtrado/",
            method: "get",
            dataType: "json",
            data: sessaoEstado,
            contentType: "application/json"

        });
        showSessoes(sessoesFiltradas);
        console.log(sessoesFiltradas);
        show
    } catch (err) {
        console.log(err);
    }
}
