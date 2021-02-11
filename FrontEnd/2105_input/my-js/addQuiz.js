//globalni parametri
let nizPitanja = [];

//funkcije

function proveriLogIn() {
  console.log("onloadbody");
  a = JSON.parse(localStorage.getItem("loged-in"));

  if (a == null) {
    //window.location.href = "login.html";
  }
}

function dodajPitanje(host) {
  let niz = document.querySelectorAll(".class-pitanje-input");
  let pitanje = niz[0].value;
  let odg1 = niz[1].value;
  let odg2 = niz[2].value;
  let odg3 = niz[3].value;
  let odg4 = niz[4].value;

  let rb1 = niz[5];
  let rb2 = niz[6];
  let rb3 = niz[7];
  let rb4 = niz[8];
  let tacno;
  if (rb1.checked == true) tacno = rb1.value;
  if (rb2.checked == true) tacno = rb2.value;
  if (rb3.checked == true) tacno = rb3.value;
  if (rb4.checked == true) tacno = rb4.value;

  let tmpObject = {
    tekst: pitanje,
    odgovor1: odg1,
    odgovor2: odg2,
    odgovor3: odg3,
    odgovor4: odg4,
    tacan: parseInt(tacno),
  };

  console.log(tmpObject);
  nizPitanja.push(tmpObject);
  console.log(pitanje, odg1, odg2, odg3, odg4, tacno);
  console.log(host.parentNode.parentNode.parentNode.parentNode);
  let parent = host.parentNode.parentNode.parentNode;

  var element2 = $(
    '<div class="tm-bg-white tm-form-pad-big forma-dodaj-pitanje">' +
      "<h6>Pitanje:" +
      pitanje +
      "</h6>" +
      "<h6>Odgovor 1: " +
      odg1 +
      "</h6>" +
      "<h6>Odgovor 2: " +
      odg2 +
      "</h6>" +
      "<h6>Odgovor 3: " +
      odg3 +
      "</h6>" +
      "<h6>Odgovor 4: " +
      odg4 +
      "</h6>" +
      "<h6>Tačan odgovor: " +
      tacno +
      "</h6>" +
      "</div>" +
      "<p></p>"
  );
  $("#addedPitanje").append(element2);
  console.log("generator proso");

  $(parent).remove();
  dodajFormuDodajPitanje("#addPitanje");
}

dodajFormuDodajPitanje("#addPitanje");

function dodajFormuDodajPitanje(host) {
  var element = $(
    '<div class="tm-bg-white tm-form-pad-big forma-dodaj-pitanje">' +
      '<div class="form-group mb-5">' +
      '<input  type="text"placeholder="pitanje " class="validate tm-input-white-bg class-pitanje-input">' +
      '<input type="text" placeholder="odgovor 1" class="validate tm-input-white-bg class-pitanje-input">' +
      '<input  type="text"placeholder="odgovor 2" class="validate tm-input-white-bg class-pitanje-input">' +
      '<input  type="text"placeholder="odgovor 3" class="validate tm-input-white-bg class-pitanje-input">' +
      '<input  type="text"placeholder="odgovor 4" class="validate tm-input-white-bg class-pitanje-input">' +
      '<div class="form-group mb-5">' +
      "<h6>Izaberi tačan odgovor</h6>" +
      "<div>" +
      '<label class="mr-4">' +
      '<input class="with-gap class-pitanje-input" name="gender" type="radio" value="1" />' +
      '<span style="color: black;">pitanje 1</span>' +
      "</label>" +
      "<label>" +
      '<input class="with-gap class-pitanje-input" name="gender" type="radio" value="2" />' +
      '<span style="color: black;">pitanje 2</span>' +
      "</label>" +
      "<label>" +
      '<input class="with-gap class-pitanje-input" name="gender" type="radio" value="3" />' +
      '<span style="color: black;">pitanje 3</span>' +
      "</label>" +
      "<label>" +
      '<input class="with-gap class-pitanje-input" name="gender" type="radio" value="4" />' +
      '<span style="color: black;">pitanje 4</span>' +
      "</label>" +
      "</div>" +
      "</div>" +
      '<div class="text-center mt-5">' +
      '<button type="submit" class="waves-effect btn-large" onclick="dodajPitanje(this)">Dodaj pitanje</button>' +
      "</div>" +
      "</div>" +
      "</div>"
  );
  $(host).append(element);
  console.log("generator proso");
}

function zavrsiDodavanjeKviza() {
  console.log(JSON.stringify(nizPitanja));
  if (nizPitanja == null) {
    console.log("lista mesta je null");
    return false;
  }

  let ime = document.querySelector(".input-naziv-kviza").value;
  console.log("***************************");
  console.log(ime);
  console.log(nizPitanja);
  console.log(JSON.parse(localStorage.getItem("loged-in")).email);
  console.log("***************************");

  fetch(
    "https://localhost:44333/kviz/" +
      JSON.parse(localStorage.getItem("loged-in")).email,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        naziv: ime,
        pitanja: nizPitanja,
      }),
    }
  ).then((p) => {
    if (p.ok) {
      console.log("USPESNO DODAT KVIZ");
      alert("uspesno dodat kviz");
      window.location.href = "index.html";
    } else {
      window.location.href = "application.html";
    }
  });
}
