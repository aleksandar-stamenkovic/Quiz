function prikaziInput() {
  elementInputHiden;
  document.querySelector("#elementInputHiden").hidden = false;
}

function pristupiKvizu() {
  let kod = document.querySelector(".code-for-quiz-access").value;
  console.log(kod);
  sessionStorage.setItem("kvizkod", kod);

  window.location.href = "survey.html";
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
      '<a  onclick="izlogujSe()" class="tm-white-text hand-point-cursor">Izloguj se</a>'
    );
  } else {
    element = $('<a  href="login.html" class="tm-white-text">Uloguj se</a>');
  }
  $(host).empty();
  $(host).append(element);
}
loginButtonSwap(".btn-uloguj-se");
