//globalne promenljive
let qNo = 0; //cuva broj pitanja u okviru kviza
let ans = []; //cuva niz brojeva odgovora pitanja od stranje korisnika
let tacniOdgovori = []; //sadrzi brojeve tacnih odgovora za pitanja respektivno
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
      '<span class="odgovori-color-' +
      redNo +
      '">A. ' +
      odg1 +
      "</span>" +
      "</label>" +
      "</li>" +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group' +
      redNo +
      '" value="2" type="radio" />' +
      '<span class="odgovori-color-' +
      redNo +
      '">B. ' +
      odg2 +
      "</span>" +
      "</label>" +
      "</li>" +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group' +
      redNo +
      '" value="3" type="radio" />' +
      '<span class="odgovori-color-' +
      redNo +
      '">C. ' +
      odg3 +
      "</span>" +
      "</label>" +
      "</li>" +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group' +
      redNo +
      '" value="4" type="radio" />' +
      '<span class="odgovori-color-' +
      redNo +
      '">D. ' +
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
  return proveriTacneOdgovore();
}

function proveriTacneOdgovore() {
  for (let i = 0; i < qNo; i++) {
    if (ans[i] == tacniOdgovori[i]) tacnoUradjena++;
  }
  console.log("tacni odgovori: " + tacnoUradjena);
  let tmp = tacnoUradjena;
  tacnoUradjena = 0;
  ans = [];
  return tmp;
}

function zavrsiISubmitujTest() {
  if (validirajUnosTesta() == false) {
    console.log("niste cekirali sva polja");
    document.querySelector(".alert-submit-poruka").innerHTML =
      "Niste čekirali neka od pitanja!";
    return;
  }
  if (validirajUnosPodatakaUcesnika() == false) {
    console.log("Niste popunili polje licnih podataka!");
    document.querySelector(".alert-submit-poruka").innerHTML =
      "Niste popunili polja ličnih podataka!";
    return;
  }
  document.querySelector(".alert-submit-poruka").innerHTML = "";

  let brTacnih = zavrsiTest();
  let kvdata = sessionStorage.getItem("kvizkod");
  let dataSubmit = document.querySelectorAll(".my-data-for-submit");
  let ime = dataSubmit[0].value;
  let prezime = dataSubmit[1].value;
  let email = dataSubmit[2].value;
  console.log(kvdata);
  console.log(ime);
  console.log(prezime);
  console.log(email);
  console.log(brTacnih);
  fetch("https://localhost:44333/kviz/ucesnik/" + kvdata, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ime: ime,
      prezime: prezime,
      email: email,
      tacniOdgovori: brTacnih,
    }),
  }).then((p) => {
    if (p.ok) {
      alert("Uspesno uradjen i predat kviz");
      markirajOdgovore();
      generisiInfoORezultatu(document.querySelector(".alert-div"), brTacnih);
      //window.location.href = "index.html";
    }
  });
}

function validirajUnosTesta() {
  let tmpCheckedArr = [];
  for (let i = 0; i < qNo; i++) {
    let grNo = i + 1;
    console.log(grNo);
    let val = document.querySelector(
      "input[name=" + "group" + grNo + "]:checked"
    );
    if (val != null) {
      console.log(val);
      tmpCheckedArr.push(val);
    }
  }
  if (qNo == tmpCheckedArr.length) {
    return true;
  } else {
    return false;
  }
}

function validirajUnosPodatakaUcesnika() {
  let dataSubmit = document.querySelectorAll(".my-data-for-submit");
  let ime = dataSubmit[0].value;
  let prezime = dataSubmit[1].value;
  let email = dataSubmit[2].value;
  if (ime.length == 0 || prezime.length == 0 || email.length == 0) {
    return false;
  }
  return true;
}

function markirajOdgovore() {
  document.querySelector("button.waves-effect").disabled = "disabled";

  for (let i = 0; i < qNo; i++) {
    let x = i + 1;
    let nizodg = document.querySelectorAll(".odgovori-color-" + x);
    console.log(nizodg);

    nizodg[0].style.color = "white";
    nizodg[1].style.color = "white";
    nizodg[2].style.color = "white";
    nizodg[3].style.color = "white";

    nizodg[0].style.backgroundColor = "#F02B25";
    nizodg[1].style.backgroundColor = "#F02B25";
    nizodg[2].style.backgroundColor = "#F02B25";
    nizodg[3].style.backgroundColor = "#F02B25";

    nizodg[tacniOdgovori[i] - 1].style.backgroundColor = "#32C326";
    // console.log(nizodg[tacniOdgovori[i]]);
    console.log(nizodg[tacniOdgovori[i] - 1]);
  }
  let inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = "disabled";
  }
}

/*
 * Dodaje alert info o rezultatu na kvizu.
 * Funkcija proveriTacneOdgovore() uvek vraca 0
 * (gore se resetuje brTacnih na 0)
 */
function generisiInfoORezultatu(host, brTacnih) {
  var element;
  if (brTacnih == 0) {
    element = $(
      '<div class="alert alert-danger" role="alert">' +
        "Br. tačnih odgovora: " +
        brTacnih +
        "" +
        " od ukupno: " +
        qNo +
        "</div>"
    );
  } else {
    element = $(
      '<div class="alert alert-primary" role="alert">' +
        "Br. tačnih odgovora: " +
        brTacnih +
        "" +
        " od ukupno: " +
        qNo +
        "</div>"
    );
  }
  $(host).append(element);
}

//testiranje hradcode test

//generisiInfoORezultatu(document.querySelector(".alert-div"), 0);
//generisiInfoORezultatu(document.querySelector(".alert-div"), 5);

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
