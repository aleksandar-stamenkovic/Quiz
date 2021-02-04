var map;

function generisiKarticuSearchResult(slikaSrc, ocena, naziv, opis) {
  let opis1 = opis.substring(0, 92) + "...";
  let opis2 = opis.substring(92);
  var element = $(
    '<div class="tm-black-bg tm-special-item">' +
      '<img src="' +
      slikaSrc +
      '" alt="Image" class="search-res-image">' +
      '<div class="tm-special-item-description">' +
      '<div><h3><span class="tm-list-item-price search-rating"><i class="fas fa-star"></i> ' +
      ocena +
      "</span></h3></div>" +
      '<h2 class="tm-text-primary tm-special-item-title add-branch-need">' +
      naziv +
      "</h2>" +
      '<p class="tm-special-item-text">' +
      opis1 +
      "</p>" +
      '<p id="toShow" hidden class="tm-special-item-text">' +
      opis2 +
      "</p>" +
      '<label class="show-more-btn" onclick="prikaziVise(this)">... prikaži više</label>' +
      '<label class="attach-new-branch" onclick="zakaciNovuGranu(this)"> dodaj rutu </label>' +
      "</div>" +
      "</div>"
  );
  $("#searchResult").append(element);
  console.log("generator proso");
}

//generisiKarticuSearchResult(
//  "img/special-01.jpg",
//  4.8,
//  "Kopaonik",
//  "Najlepsa planina lepo organizovana sa veoma lepim skijalistima" +
//    "Najlepsa planina lepo organizovana sa veoma lepim skijalistima Najlepsa planina lepo organizovana sa veoma lepim skijalistima Najlepsa planina lepo organizovana sa veoma lepim skijalistima"
//);

function pretraziMesta() {
  $("#searchResult").empty();
  let searchInput = document.querySelector(".search-place-input").value;
  console.log(searchInput);
  fetch("https://localhost:44340/mesto/" + searchInput, {
    method: "GET",
  }).then((p) =>
    p.json().then((data) => {
      data.forEach((element) => {
        let naziv = element["naziv"];
        let opis = element["opis"];
        let ocena = element["srednjaOcena"];
        let slikaSrc =
          "https://localhost:44340/imageUpload/" + element["imeSlike"];

        console.log(naziv, opis, ocena, slikaSrc);
        generisiKarticuSearchResult(slikaSrc, ocena, naziv, opis);
        setujMarker(naziv);
      });
    })
  );
}

function prikaziVise(host) {
  let realHost = host.parentNode;
  if (realHost.querySelector("#toShow").hidden == true) {
    realHost.querySelector("#toShow").hidden = false;
    host.innerHTML = "... prikaži manje";
  } else {
    realHost.querySelector("#toShow").hidden = true;
    host.innerHTML = "... prikaži više";
  }
}

function zakaciNovuGranu(host) {
  let pnode = host.parentNode.querySelector(".add-branch-need").innerHTML;
  let textExtracted;
  console.log(pnode);

  if (pnode.includes("<") == true) {
    let tmptext = pnode.split("<");
    console.log(tmptext);
    textExtracted = tmptext[0];
  } else {
    textExtracted = pnode;
  }
  console.log("Extraktovan naziv: " + textExtracted);

  document.querySelector(".my-control-route-name").value = textExtracted;
  document.querySelector("#addRoute-btn").click();
}

/*----------------------------------
  Mapa i funkcije vezane za mapu
-----------------------------------*/

function inicijalizujMapu() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWNhYWNhYXMiLCJhIjoiY2trMTN4eXg2MDZucTJ2b2JhdXU4Nm40cyJ9.DwCaq-aCSPz1_pCOFeMJ7A";
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [21, 44.1],
    zoom: 5.2,
  });
  map.addControl(new mapboxgl.NavigationControl());
  /*var marker = new mapboxgl.Marker()
      .setLngLat([21.8957605, 43.320904])
      .addTo(map);*/
}

inicijalizujMapu();

function setujMarker(grad) {
  var mapboxClient = mapboxSdk({
    accessToken:
      "pk.eyJ1IjoiYWNhYWNhYXMiLCJhIjoiY2trMTN4eXg2MDZucTJ2b2JhdXU4Nm40cyJ9.DwCaq-aCSPz1_pCOFeMJ7A",
  });
  mapboxClient.geocoding
    .forwardGeocode({
      query: grad,
      autocomplete: false,
      limit: 1,
    })
    .send()
    .then(function (response) {
      if (
        response &&
        response.body &&
        response.body.features &&
        response.body.features.length
      ) {
        var feature = response.body.features[0];

        /*var map = new mapboxgl.Map({
					container: 'map',
					style: 'mapbox://styles/mapbox/streets-v11',
					center: feature.center,
					zoom: 10
        });*/

        new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
      }
    });
}

//test markeri
//setujMarker("Novi Sad");
//setujMarker("Zrenjanin");
