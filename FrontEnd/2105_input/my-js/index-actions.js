function prikaziInput() {
  elementInputHiden;
  document.querySelector("#elementInputHiden").hidden = false;
}

function pristupiKvizu() {
  let kod = document.querySelector(".code-for-quiz-access").value;
  console.log(kod);
  console.log("asdasddsadsa");

  fetch("https://localhost:44333/kviz/proveri/" + kod, {
    method: "GET",
  }).then((p) => {
    if (p.ok) {
      p.json().then((data) => {
        console.log(data);
        if (data == false) {
          document.querySelector(".postojanje-kviza-alert").hidden = false;
          return;
        } else {
          document.querySelector(".postojanje-kviza-alert").hidden = true;
          console.log("proso");
          sessionStorage.setItem("kvizkod", kod);
          window.location.href = "survey.html";
        }
      });
    }
  });

  /*
    // Save data to sessionStorage
    sessionStorage.setItem('key', 'value');

    // Get saved data from sessionStorage
    let data = sessionStorage.getItem('key');

    // Remove saved data from sessionStorage
    sessionStorage.removeItem('key');

    // Remove all saved data from sessionStorage
    sessionStorage.clear();
  */
}

function izlogujSe() {
  localStorage.removeItem("loged-in");
  console.log(localStorage);
  loginButtonSwap(".btn-uloguj-se");
}

function loginButtonSwap(host) {
  a = JSON.parse(localStorage.getItem("loged-in"));
  var element;
  if (a != null) {
    console.log(a.email);
    element = $(
      '<a  onclick="izlogujSe()" class="tm-white-text hand-point-cursor">'+
      '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">' +
      '<path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>' +
      '<path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>' +
      '</svg>' +
      'Izloguj se</a>'
    );
  } else {
    element = $('<a  href="login.html" class="tm-white-text">'+
    '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">' +
      '<path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>' +
      '<path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>' +
    '</svg>' +
    ' Uloguj se</a>');
  }
  $(host).empty();
  $(host).append(element);
}

//onload izvrzavanje funkcija
loginButtonSwap(".btn-uloguj-se");
