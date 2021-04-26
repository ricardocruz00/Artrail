window.onload = function () {
    loadArtes();
}

async function loadArtes() {

    let elemAside = document.getElementById("galeria");
        try {
            let artes = await $.ajax({
                url: "/api/artes",
                method: "get",
                dataType: "json"
            });
            console.log(JSON.stringify(artes));
            showArtes(artes);
        } catch (err) {
            console.log(err);
            elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
                "<h2> Por favor tente mais tarde</h2>";
        }
}


async function showArtes(artes) {
    let elemAside = document.getElementById("galeria");
    let html = "";
    for (let arte of artes) {
            html += "<section class='arteMoldura' id = 'arte' ><h1>" + arte.nome + "</h1>" +
                "<p> Localização: " + arte.latitude + ", " + arte.longitude +" </p>"  +
                "<p> imagem: " + arte.imagem + " </p>"
        }
    elemAside.innerHTML = html;
}