function test() {
  console.log(Date.now());
}
test();

generisiKarticuDodajMesto();

let nizMesta = [];
let rate = 1;
var timemsList = [];
var file_data = [];

function setRating(value) {
  console.log("pre:" + rate);
  rate = value;
  console.log("posle:" + rate);
}

function dodajMesto() {
  a = JSON.parse(localStorage.getItem("loged-in"));

  if (a != null) {
    //console.log(a.loged);
    let naziv = document.querySelector(".my-control-route-name").value;
    let opis = document.querySelector(".my-control-route-descr").value;
    let ocena = rate;
    console.log("dodaj mesto uso" + naziv, opis, ocena);
    if (naziv == "" || opis == "") {
      return false;
    }
    var fullPath = document.getElementById("file").value;
    var filename;
    if (fullPath) {
      var startIndex =
        fullPath.indexOf("\\") >= 0
          ? fullPath.lastIndexOf("\\")
          : fullPath.lastIndexOf("/");
      filename = fullPath.substring(startIndex);
      if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
        filename = filename.substring(1);
      }
    }

    let timems = Date.now();
    console.log(a.ime);

    console.log(filename);
    let tmpObject = {
      naziv: naziv,
      opis: a.ime + ": " + opis,
      ocena: ocena,
      imeSlike: timems + filename,
    };
    file_data.push($("#file").prop("files")[0]);
    timemsList.push(timems);

    console.log(tmpObject);
    console.log(file_data);
    console.log(timemsList);

    $(".dodaj-forma-dinamik").remove();
    generisiKarticuMesto(naziv, opis, ocena, filename);
    nizMesta.push(tmpObject);
    ocena = 1;

    generisiKarticuDodajMesto();
  } else {
    dodajCustomAlert("Morate biti ulogovani kako bi dodali mesto");
  }
  rate = 1;
}

function zavrsiDodavanjeRute() {
  aktivirajSpiner("spiner1", "#zavrsiBtn");
  console.log(JSON.stringify(nizMesta));
  if (nizMesta == null) {
    console.log("lista mesta je null");
    return false;
  }

  fetch("https://localhost:44340/mesto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nizMesta),
  }).then((p) => {
    if (p.ok) {
      console.log("USPESNO DODATA RUTA");
      file_data.forEach((el, index) => {
        uploadSlike(el, timemsList[index]);
      });
      window.location.href = "index.html";
      zaustaviSpiner("#spiner1");
    } else {
      window.location.href = "#addplace";
      zaustaviSpiner("#spiner1");
    }
  });
  file_data.forEach((el, index) => {
    if (el != undefined) {
      console.log(el, timemsList[index]);
      uploadSlike(el, timemsList[index]);
    }
  });
}

function uploadSlike(file_data, time) {
  var form_data = new FormData();
  form_data.append("files", file_data); //<-- OVO MORA OVAKO (nece bez 'files')
  $.ajax({
    url: "https://localhost:44340/ImageUpload/" + time, // point to server-side controller method
    dataType: "text", // what to expect back from the server
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: "post",
    success: function (response) {
      //$('#msg').html(response); // display success response from the server
      console.log("Uploadovana slika");
    },
    error: function (response) {
      //$('#msg').html(response); // display error response from the server
      console.log("Greska Uploadovana slika");
    },
  });
}

function generisiKarticuDodajMesto() {
  var element = $(
    '<div class="dodaj-forma-dinamik">' +
      '<div class="tm-black-bg tm-contact-text-container">' +
      '<form onsubmit="return false">' +
      '<div class="tm-form-group">' +
      '<input type="text" name="name" class="tm-form-control my-control-route-name" placeholder="Naziv mesta" required="" />' +
      "</div>" +
      '<div class="tm-form-group">' +
      '<input type="text" name="description" class="tm-form-control my-control-route-descr" placeholder="Opis . . ." required="" />' +
      "</div>" +
      '<div class="tm-form-group">' +
      '<div class="rating">' +
      '<input type="radio" name="test" id="one" checked onclick="setRating(1)"/>' +
      '<label for="one"><i class="fa fa-star"></i></label>' +
      '<input type="radio" name="test" id="two" onclick="setRating(2)"/>' +
      '<label for="two"><i class="fa fa-star"></i></label>' +
      '<input type="radio" name="test" id="three" onclick="setRating(3)"/>' +
      '<label for="three"><i class="fa fa-star"></i></label>' +
      '<input type="radio" name="test" id="four" onclick="setRating(4)"/>' +
      '<label for="four"><i class="fa fa-star"></i></label>' +
      '<input type="radio" name="test" id="five" onclick="setRating(5)"/>' +
      '<label for="five"><i class="fa fa-star"></i></label>' +
      "</div>" +
      "<br>" +
      "</div>" +
      '<div id="dugmeDodavanja">' +
      '<div class="input-group mb-3">' +
      '<input type="file" id="file" class="upload-slike form-control" name="file" multiple />' +
      "</div>" +
      '<button type="submit"  class="tm-btn-primary tm-align-right" onclick="dodajMesto()">' +
      "Dodaj" +
      "</button>" +
      "</div>" +
      "</form>" +
      "</div>" +
      '<div class="tm-black-bg tm-contact-text-container " >' +
      '<h5 class="tm-list-item-name">Završi putovanje i unesi rutu koja se sastoju iz navedenih mesta.' +
      '<span class="tm-list-item-price">' +
      '<button type="button" id="zavrsiBtn" class="tm-btn-primary tm-align-right" onclick="zavrsiDodavanjeRute()">' +
      "Završi" +
      "</button>" +
      "</span>" +
      "</h5>" +
      "</div>" +
      "</div>"
  );
  $("#addplace").append(element);
  console.log("generator proso");
}

function dodajCustomAlert(string) {
  var element = $(
    '<div id="custom-alert">' +
      "<p></p>" +
      '<div class="tm-black-bg tm-contact-text-container custom-alert-text" >' +
      string +
      "</div>" +
      "</div>"
  );
  $("#dugmeDodavanja").append(element);
  let el = document.querySelector("#custom-alert");
  el.scrollIntoView();
  var timer = setInterval(function () {
    $("#custom-alert").remove();
    clearInterval(timer);
  }, 3000);
  console.log("generator proso");
}

function aktivirajSpiner(idSpinera, idHosta) {
  const number = Math.random() * 10;
  console.log(number);
  var element;
  if (number > 5) {
    element = $(
      '<i id="' + idSpinera + '" class="far fa-snowflake fa-spin"></i>'
    );
  } else {
    element = $('<i id="' + idSpinera + '" class="fas fa-sun fa-spin"></i>');
  }
  $(idHosta).append(element);
}

function zaustaviSpiner(idSpinera) {
  $(idSpinera).remove();
}

function generisiKarticuMesto(naziv, opis, ocena, nazivSlike = "nema slike") {
  var element = $(
    '<div class="tm-list-item">' +
      '<div class="tm-black-bg tm-list-item-text tm-contact-text-container">' +
      '<h3 class="tm-list-item-name">' +
      naziv +
      '<span class="tm-list-item-price"><i class="fas fa-star"></i> ' +
      ocena +
      "</span></h3>" +
      '<p class="tm-list-item-description">' +
      opis +
      "</p>" +
      '<h5 class="tm-list-item-description">Slika: ' +
      nazivSlike +
      "</h5>" +
      "</div>" +
      "</div>"
  );
  $("#addplace").append(element);
  console.log("generator proso");
}
