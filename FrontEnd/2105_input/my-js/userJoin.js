function proveriLogIn() {
  //window.location.href = "#drink";
  console.log("onloadbody");
  a = JSON.parse(localStorage.getItem("loged-in"));

  if (a != null) {
    console.log(a.loged);
    console.log(a.ime);
    console.log(a.prezime);
    console.log(a.email);
    if (a.loged == true) {
      /*console.log("iff");
      let btnReg = document.querySelector("#buttonRegisterSpan");
      btnReg.innerHTML = a.ime;
      btnReg = document.querySelector("#buttonRegister");
      btnReg.href = "#drink";

      let btnLog = document.querySelector("#btnPrijava");
      btnLog.hidden = true;
      btnLog = document.querySelector("#btnOdjava");
      btnLog.hidden = false;*/
    } else {
      /*console.log("elss");
      let btnReg = document.querySelector("#buttonRegisterSpan");
      btnReg.innerHTML = "Registruj se";
      btnReg = document.querySelector("#buttonRegister");
      btnReg.href = "#register";

      let btnLog = document.querySelector("#btnPrijava");
      btnLog.hidden = false;
      btnLog = document.querySelector("#btnOdjava");
      btnLog.hidden = true;*/
    }
  } else {
    console.log("niste ulogovani");
    window.location.href = "login.html";
  }
}

function registrujSe() {
  let nizRegister = document.querySelectorAll(".registration-controls");
  let ime = nizRegister[0].value;
  let prezime = nizRegister[1].value;
  let email = nizRegister[2].value;
  let password = nizRegister[3].value;
  console.log(email.includes("@"));
  if (
    ime.length == 0 ||
    prezime.length == 0 ||
    email.length == 0 ||
    password.length == 0 ||
    !email.includes("@")
  ) {
    console.log("nevalidno");
    return;
  }

  console.log(ime);
  console.log(prezime);
  console.log(email);
  console.log(password);

  fetch("https://localhost:44333/korisnik", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ime: ime,
      prezime: prezime,
      email: email,
      password: password,
    }),
  }).then((p) => {
    if (p.ok) {
      localStorage.clear();
      localStorage.setItem(
        "loged-in",
        JSON.stringify({
          email: email,
          loged: true,
          ime: ime,
          prezime: prezime,
        })
      );

      console.log("USPESNO REGISTROVANJE");
      a = JSON.parse(localStorage.getItem("loged-in"));
      console.log(a.loged);
      console.log(a.email);
      console.log(a.ime);
      console.log(a.prezime);
      window.location.href = "index.html";
    } else {
      window.location.href = "signup.html";
    }
  });
}

function logujSe() {
  let nizRegister = document.querySelectorAll(".login-controls");
  let email = nizRegister[0].value;
  let password = nizRegister[1].value;
  console.log(email);
  console.log(password);

  fetch("https://localhost:44333/korisnik/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((p) =>
    p.json().then((data) => {
      if (data["uspesno"] == true) {
        console.log(data);
        localStorage.clear();

        console.log(data);
        localStorage.setItem(
          "loged-in",
          JSON.stringify({
            email: email,
            loged: true,
            ime: data["ime"],
            prezime: data["prezime"],
          })
        );
        a = JSON.parse(localStorage.getItem("loged-in"));
        console.log(a.email);
        console.log("USPESNO LOGOVANJE");

        window.location.href = "index.html";
      } else {
        window.location.href = "login.html";
      }
    })
  );
}

function OdjaviSe() {
  console.log("odjava test");
  localStorage.clear();
  window.location.href = "index.html";
}

//instant pozivi funcija
//proveriLogIn();
