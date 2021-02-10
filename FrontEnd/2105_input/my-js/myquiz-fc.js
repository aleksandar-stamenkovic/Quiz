function generisiKarticuMyQuiz(host, imekv, idkv, pitanjakv) {
  let stringParagrafa = "";
  pitanjakv.forEach((el) => {
    stringParagrafa += '<p class="mb-0">' + el + "</p>";
  });

  console.log(stringParagrafa);
  var element = $(
    '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 tm-login-r my-quiz-card">' +
      '<header class="font-weight-light tm-bg-black p-5 h-100">' +
      '<h3 class="mt-0 text-white font-weight-light" style="font-weight: bold;">Kviz 3</h3>' +
      '<p style="font-weight: bold;"> Naziv kviza:' +
      imekv +
      "</p>" +
      '<p class="mb-0" style="font-weight: bold;">Pitanja kviza:</p>' +
      stringParagrafa +
      '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 ml-auto mr-0 text-center">' +
      '<p style="font-weight: bold;">ID kviza: ' +
      idkv +
      "</p>" +
      "</div>" +
      "</header>" +
      "</div>"
  );
  $(host).append(element);

  console.log("generator proso");
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
        let id = element["id"];
        let pitanja = element["pitanja"];
        
        console.log(naziv, id, pitanja);
        generisiKarticuMyQuiz(".my-quiz-all-cards", naziv, id, pitanja);
      });
    })
  );
}

pribaviSveKvizove();
