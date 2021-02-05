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
