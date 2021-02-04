function generisiKarticu(host, slikaSrc, naziv, ocena, opis) {
  let opis1 = opis.substring(0, 84) + "...";
  let opis2 = opis.substring(84);
  var element = $(
    '<div class="tm-list-item">' +
      '<img src="' +
      slikaSrc +
      '" alt="Image" class="tm-list-item-img"  onclick="pretraziKarticu(this)">' +
      '<div class="tm-black-bg tm-list-item-text">' +
      '<h3 class="tm-list-item-name add-branch-need"  onclick="pretraziKarticu(this)">' +
      naziv +
      '<span class="tm-list-item-price"><i class="fas fa-star"></i> ' +
      ocena +
      "</span></h3>" +
      '<p class="tm-list-item-description">' +
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
  $(host).append(element);
  console.log("generator proso");
}

function pretraziKarticu(host) {
  let searchFor = host.parentNode
    .querySelector(".tm-list-item-name")
    .innerHTML.split("<")[0];
  console.log(searchFor);
  document.querySelector(".search-place-input").value = searchFor;
  document.querySelector(".search-place-btn").click();
  document.querySelector("#pretrazi-btn").click();
}

function preuzmiPreporuku() {
  fetch("https://localhost:44340/mesto/random", {
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
        generisiKarticu("#bestRated", slikaSrc, naziv, ocena, opis);
      });
    })
  );
}

function preuzmiNajboljeOcenjeno() {
  fetch("https://localhost:44340/mesto/najboljeOcenjeni", {
    method: "GET",
  }).then((p) =>
    p.json().then((data) => {
      data.forEach((element) => {
        let naziv = element["naziv"];
        let opis = element["opis"];
        let ocena = element["srednjaOcena"];
        let slikaSrc =
          "https://localhost:44340/imageUpload/" + element["imeSlike"];

        console.log(slikaSrc);

        console.log(naziv, opis, ocena, slikaSrc);
        generisiKarticu("#popular", slikaSrc, naziv, ocena, opis);
      });
    })
  );
}

preuzmiPreporuku();
preuzmiNajboljeOcenjeno();
