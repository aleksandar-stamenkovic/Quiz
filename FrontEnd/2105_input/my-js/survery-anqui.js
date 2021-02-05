//globalne promenljive
let qNo = 2;
let ans = [];
let tacniOdgovori = [4, 1];
let tacnoUradjena = 0;

//funkcije i jquery
function pribaviKviz() {
  let kvdata = sessionStorage.getItem("kvizkod");
  console.log(kvdata);

  /*fetch("https://localhost:44340/mesto/najboljeOcenjeni/" + a.email, {
    method: "GET",
  }).then((p) =>
    p.json().then((data) => {
      let naziv = data["naziv"];
      document.querySelector("#quizNameSurvey").innerHTML = naziv;

      data["pitanja"].forEach((element) => {
        let pitanje = element["pitanje"];
        let odg1 = element["odgovor1"];
        let odg2 = element["odgovor2"];
        let odg3 = element["odgovor3"];
        let odg4 = element["odgovor4"];

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
      });
    })
  );*/
}
pribaviKviz();

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
      '<input class="with-gap" name="group1" value="value1" type="radio" />' +
      "<span>A." +
      odg1 +
      "</span>" +
      "</label>" +
      "</li>" +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group1" value="value2" type="radio" />' +
      "<span>B." +
      odg2 +
      "</span>" +
      "</label>" +
      "</li>" +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group1" value="value3" type="radio" />' +
      "<span>C." +
      odg3 +
      "</span>" +
      "</label>" +
      "</li>" +
      "<li>" +
      "<label>" +
      '<input class="with-gap" name="group1" value="value4" type="radio" />' +
      "<span>D." +
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

function testkoncept() {
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
  console.log("tacni odg" + tacnoUradjena);
  let tmp = tacnoUradjena;
  tacnoUradjena = 0;
  ans = [];
  return tmp;
}
