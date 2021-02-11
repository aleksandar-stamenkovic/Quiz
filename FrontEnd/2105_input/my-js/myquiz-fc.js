function generisiKarticuMyQuiz(host, imekv, idkv, pitanjakv, ucesnicikv) {
  let brojac = 1;
  let stringParagrafa = "";
  let stringParagrafaUcesnici = "";
  pitanjakv.forEach((el) => {
    stringParagrafa += '<p class="mb-0">' + brojac + ": " + el + "</p>";
    brojac++;
  });

  ucesnicikv.forEach((el) => {
    stringParagrafaUcesnici += '<p class="mb-0">' + el + "</p>";
  });

  console.log(stringParagrafa);
  var element = $(
    '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 tm-login-r my-quiz-card">' +
      '<label hidden id="idkviza">' +
      idkv +
      "</label>" +
      '<header class="font-weight-light tm-bg-black p-5 h-100">' +
      '<div class="obrisi-kviz-btn" onclick="obrisiKviz(this)">obriši kviz</div>' +
      '<h5 class="mt-0 text-white" style="font-weight: bold;">Kviz: <a class="my-qu-card-color">' +
      imekv +
      "</a></h5>" +
      '<p class="mb-0" style="font-weight: bold;">Pitanja kviza:</p>' +
      stringParagrafa +
      '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 ml-auto mr-0 text-center">' +
      '<p style="font-weight: bold;">ID kviza: ' +
      idkv +
      "</p>" +
      "</div>" +
      '<div hidden class="my-qu-ucesnici-hidden">' +
      stringParagrafaUcesnici +
      "</div>" +
      '<p class="my-qu-card-color hand-point-cursor prikazi-ucesnike-btn" onclick="prikaziUcesnike(this)">prikaži učesnike</p>' +
      "</header>" +
      "</div>"
  );
  $(host).append(element);

  console.log("generator proso");
}

function prikaziUcesnike(host) {
  let cardHost = host.parentNode;
  let elToHide = cardHost.querySelector(".my-qu-ucesnici-hidden");

  console.log("asdasasdasadssdsaasa");
  console.log(cardHost.querySelector(".prikazi-ucesnike-btn"));
  if (elToHide.hidden == true) {
    elToHide.hidden = false;
    cardHost.querySelector(".prikazi-ucesnike-btn").innerHTML =
      "sakrij učesnike";
  } else {
    elToHide.hidden = true;
    cardHost.querySelector(".prikazi-ucesnike-btn").innerHTML =
      "prikaži učesnike";
  }
}

function obrisiKviz(host) {
  let parent = host.parentNode.parentNode;
  let id = parent.querySelector("#idkviza").innerHTML;
  console.log(id);

  fetch("https://localhost:44333/kviz/" + id, {
    method: "DELETE",
  }).then((p) => {
    if (p.ok) {
      console.log("uspesno obrisan kviz");
      alert("Kviz je uspešno obrisan");
      console.log(parent);
      $(parent).remove();
    } else {
      console.log("brisanje neuspesno");
    }
  });
}
/*
let niz = [
  "asdasasdadsadsadsdsadsa aasd da a ",
  "asdsafddfggfhjgmgf gfd h gfddgh gh dgf ",
  "dfgsdfgfggfssfgfdgs jkjhpknbob 654gfgf",
];
generisiKarticuMyQuiz(".my-quiz-all-cards", "Moj prvi kviz", 31265, niz);
generisiKarticuMyQuiz(".my-quiz-all-cards", "Moj prvi kviz", 31265, niz);
generisiKarticuMyQuiz(".my-quiz-all-cards", "Moj prvi kviz", 31265, niz);
generisiKarticuMyQuiz(".my-quiz-all-cards", "Moj prvi kviz", 31265, niz);
generisiKarticuMyQuiz(".my-quiz-all-cards", "Moj prvi kviz", 31265, niz);
*/

function pribaviSveKvizove() {
  console.log("onloadbody");
  a = JSON.parse(localStorage.getItem("loged-in"));
  if (a != null) {
    console.log(a);
    document.querySelector(".myquiz-data-ime").innerHTML = "Ime: " + a.ime;
    document.querySelector(".myquiz-data-prezime").innerHTML =
      "Prezime: " + a.prezime;
    document.querySelector(".myquiz-data-email").innerHTML =
      "Email: " + a.email;
  }

  fetch("https://localhost:44333/kviz/email/" + a.email, {
    method: "GET",
  }).then((p) =>
    p.json().then((data) => {
      data.forEach((element) => {
        let naziv = element["naziv"];
        let id = element["idString"];
        let pitanjaJson = element["pitanja"];
        let ucesniciJson = element["ucesnici"];

        console.log("ucenici");
        console.log(element["ucesnici"]);
        console.log("test podataka");
        console.log(naziv, id, pitanjaJson);

        let pitanjaTekst = [];

        pitanjaJson.forEach((el) => {
          pitanjaTekst.push(el["tekst"]);
        });

        let ucesniciTekst = [];
        ucesniciJson.forEach((el) => {
          ucesniciTekst.push(
            el["ime"] +
              "| " +
              el["prezime"] +
              "| " +
              el["email"] +
              "| tacnih odgovora:[ " +
              el["tacniOdgovori"] +
              " ]"
          );
        });

        generisiKarticuMyQuiz(
          ".my-quiz-all-cards",
          naziv,
          id,
          pitanjaTekst,
          ucesniciTekst
        );
      });
    })
  );
}

//onload pozivi funkcija
pribaviSveKvizove();
