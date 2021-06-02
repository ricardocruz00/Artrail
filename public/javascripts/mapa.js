var mymap = L.map('mapid').setView([38.727978, -9.157447], 13);

var markersLayer = L.layerGroup();
var routingLayer = L.layerGroup();
mymap.addLayer(markersLayer);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 21,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiMjAwMHl0cmljYXJkbyIsImEiOiJja2llYzA2aDkweDJsMnRyc2NmYTdlb2hmIn0.wvxtVtYjr_2Us5p1V6lGyg'
}).addTo(mymap);


var searchControl = L.esri.Geocoding.geosearch().addTo(mymap);

var results = L.layerGroup().addTo(mymap);

searchControl.on('results', function (data) {
  results.clearLayers();
});

//direções

// var ghRouting = new GraphHopper.Routing({ key: "b8d15971-3f3b-4158-b2c1-2195d844bc28", host: "https://graphhopper.com/api/1/", vehicle: "car", elevation: false });

// var markerRota;

// function getDirecoes (latArt,longArt){
//   mymap.on('click', function(e) {
//     if(ghRouting.points.length > 1) {ghRouting.clearPoints();routingLayer.clearLayers();mymap.removeLayer(markerRota);}
// ghRouting.addPoint(new GHInput(e.latlng.lat, e.latlng.lng));
// ghRouting.addPoint(new GHInput(latArt,longArt));
// markerRota = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);

// routingLayer = L.geoJson().addTo(mymap);
// routingLayer.options = {
//   style: { color: "#00cc33", "weight": 5, "opacity": 0.7 }
// };

// ghRouting.doRequest()
//   .then(function (json) {
//     var path = json.paths[0];
//     routingLayer.addData({
//       "type": "Feature",
//       "geometry": path.points
//     });
//     console.log(json);
//   })
//   .catch(function (err) {
//     var str = "An error occured: " + err.message;
//     $("#routing-response").text(str);
//   });

// });
// }

function artesMarkers(artes) {
  for (let arte of artes) {
  var marker = markersLayer.addLayer(L.marker([arte.latitude, arte.longitude]).bindPopup("<input type='button' class='markerInput' onclick='showArtesMapa("+ arte.arteID1 +","+ JSON.stringify(arte.nome)+","+ JSON.stringify(arte.nome_artista) +","+ JSON.stringify(arte.imagem) +")' value='" + arte.nome + "'>").addTo(mymap));
//    artesMarkers(arte.latitude, arte.longitude, arte.nome, arte.id);                                           
    console.log(JSON.stringify(arte.arteID1));
    }
}

function getArteNome(nomeArte) {
  sessionStorage.setItem("arteNome", nomeArte);
  getRota();
}

function clearMarker() {
  markersLayer.clearLayers();
}



