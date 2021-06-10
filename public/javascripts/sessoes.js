window.onload = async function() {
    let arteID = sessionStorage.getItem("arteID");
    let nome_artista = sessionStorage.getItem("nome_artista");
    loadCategoriasLista();
    
    if (sessionStorage.getItem("userID") !== null) {
        let nomeUser = document.getElementById("nomeUser");
        nomeUser.innerHTML = "<a>" + sessionStorage.getItem("nome_user") + "</a>";
        let logOut = document.getElementById("logOut");
        logOut.innerHTML = "<li style='float:right'><a onclick='logOut()'>LogOut</a></li>";
        nomeUser.innerHTML = "<a href='userPageSessoes.html'>" + sessionStorage.getItem("nome_user") + "</a>";
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

async function showCategorias(categorias){
    if (sessionStorage.getItem("userID") !== null) {
        let htmlLabel = " <a>Give this Art Categories</a>"
        let html = "";
        for(let categoria of categorias) {
            console.log(JSON.stringify(categoria.categoria_nome));
            html += "<input type='button' class='categoriaB' value='"+categoria.categoria_nome+"' onclick='addCategoria("+categoria.categoriaID+")'></input>";
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
    } catch (err) {
        console.log(err);
    }
}