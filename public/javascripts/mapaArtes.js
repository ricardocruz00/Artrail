window.onload = function () {
    loadArtes();
}

async function loadArtes() {

    let elemAside = document.getElementById("error");
        try {
            let artes = await $.ajax({
                url: "/api/artes",
                method: "get",
                dataType: "json"
            });
            //console.log(JSON.stringify(artes));
            showArtes(artes);
        } catch (err) {
            console.log(err);
            elemAside.innerHTML = "<h1> Página não está disponível</h1>" +
                "<h2> Por favor tente mais tarde</h2>";
        }
}



async function showArtes(artes) {
    for (let arte of artes) {
        artesMarkers(arte.latitude, arte.longitude, arte.nome, arte.id);
        console.log(JSON.stringify(arte.latitude));
        }
}