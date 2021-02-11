//globalne promenljive
let qNo = 0; //cuva broj pitanja u okviru kviza
let ans = []; //cuva niz brojeva odgovora pitanja od stranje korisnika
let tacniOdgovori = [4, 1, 2, 3]; //sadrzi brojeve tacnih odgovora za pitanja respektivno
let tacnoUradjena = 0; //broji tacno uradjena pitanja

//onload pozivi funkcija
pribaviKviz();

//funkcije i jquery
function pribaviKviz() {
  let kvdata = sessionStorage.getItem("kvizkod");
  console.log(kvdata);

  fetch("https://localhost:44333/kviz/" + kvdata, {
    method: "GET",
  }).then((p) =>
    p.json().then((data) => {
      let naziv = data["naziv"];
      document.querySelector("#quizNameSurvey").innerHTML = naziv;

      tacniOdgovori = [];
      tacnoUradjena = 0;
      ans = [];
      qNo = 0;

      data["pitanja"].forEach((element) => {
        let pitanje = element["tekst"];
        let odg1 = element["odgovor1"];
        let odg2 = element["odgovor2"];
        let odg3 = element["odgovor3"];
        let odg4 = element["odgovor4"];
        let tacan = element["tacan"];

        console.log(element);
        qNo++;
        generisiKarticuPitanja(
          ".question-container-for-addition",
          qNo,
          pitanje,
          odg1,
          odg2,
          odg3,
          odg4
        );

        tacniOdgovori.push(tacan);
      });
    })
  );
}

function generisiKarticuPitanja(host, redNo, pitanje, odg1, odg2, odg3, odg4) {
  var element = $(
    '<div class="tm-bg-black tm-form-block">' +
      '<p class="mb-4">' +
      redNo +
      ". " +
      pitanje +
      "</p>" +
      '<ul class="ml-3">' +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group' +
      redNo +
      '"value="1" type="radio" />' +
      "<span>A. " +
      odg1 +
      "</span>" +
      "</label>" +
      "</li>" +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group' +
      redNo +
      '" value="2" type="radio" />' +
      "<span>B. " +
      odg2 +
      "</span>" +
      "</label>" +
      "</li>" +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group' +
      redNo +
      '" value="3" type="radio" />' +
      "<span>C. " +
      odg3 +
      "</span>" +
      "</label>" +
      "</li>" +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group' +
      redNo +
      '" value="4" type="radio" />' +
      "<span>D. " +
      odg4 +
      "</span>" +
      "</label>" +
      "</li>" +
      "</ul>" +
      "</div>"
  );
  $(host).append(element);
  console.log("generator proso");
}

function zavrsiTest() {
  for (let i = 0; i < qNo; i++) {
    let grNo = i + 1;
    console.log(grNo);
    let val = document.querySelector(
      "input[name=" + "group" + grNo + "]:checked"
    ).value;
    console.log(val);
    ans.push(val);
  }

  console.log(ans);
  proveriTacneOdgovore();
}

function proveriTacneOdgovore() {
  for (let i = 0; i < qNo; i++) {
    if (ans[i] == tacniOdgovori[i]) tacnoUradjena++;
  }
  console.log("tacni odgovori: " + tacnoUradjena);
  let tmp = tacnoUradjena;
  //tacnoUradjena = 0;
  //ans = [];
  return tmp;
}

function zavrsiISubmitujTest() {
  let kvdata = sessionStorage.getItem("kvizkod");
  let dataSubmit = document.querySelectorAll(".my-data-for-submit");
  let ime = dataSubmit[0].value;
  let prezime = dataSubmit[1].value;
  let email = dataSubmit[2].value;
  console.log(kvdata);
  console.log(ime);
  console.log(prezime);
  console.log(email);
  console.log(tacnoUradjena);

  fetch("https://localhost:44333/kviz/ucesnik/" + kvdata, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ime: ime,
      prezime: prezime,
      email: email,
      tacniOdgovori: tacnoUradjena,
    }),
  }).then((p) => {
    if (p.ok) {
      alert("Uspesno uradjen i predat kviz");
      window.location.href = "index.html";
    }
  });
}

//testiranje hradcode test

/*generisiKarticuPitanja(
  ".question-container-for-addition",
  1,
  " pitanje asdassadasasdasd",
  "odgovor1",
  "odgovor 2",
  "odgovor 3",
  "odgovor4"
);

generisiKarticuPitanja(
  ".question-container-for-addition",
  2,
  " pitanje asdassadasasdasd",
  "odgovor1",
  "odgovor 2",
  "odgovor 3",
  "odgovor4"
);
tacniOdgovori = [1, 3];
qNo = 2;

//question-container-for-addition
*/
