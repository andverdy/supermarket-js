var rowcode = "";
function getArticles() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = callArticles;

  xmlhttp.open("GET", "http://localhost:8080/rest/api/articles/list", true);
  xmlhttp.send();
}

function callArticles() {
  if (this.readyState == 4 && this.status == 200) {
    var responseObject = JSON.parse(this.responseText);

    var articles = responseObject;
    var htmlArticles =
      "<tr>" +
      "<th>Codice Articolo</th>" +
      "<th>Descrizione</th>" +
      "<th>PzCart</th>" +
      "<th>Iva</th>" +
      "<th>FamAssort</th>" +
      "</tr>";

    for (var art of articles) {
      htmlArticles +=
        "<tr>" +
        "<td>" +
        art.codArt +
        "</td>" +
        "<td>" +
        art.descrizione +
        "</td>" +
        "<td>" +
        art.pzCart +
        "<td>" +
        art.ivaDesc +
        "<td>" +
        art.famAssDesc +
        "<td>" +
        '<input value="Modifica Articolo" type="button" onClick="getArticleByCode(\'' +
        art.codArt +
        "')\"/>" +
        "</td>" +
        "<td>" +
        "<button type=button onclick=>" +
        "Aggiungi al Carrello" +
        "</button>" +
        "</td>" +
        "<tr>";
    }
    //'<input type="button" onClick="gotoNode(\'' + result.name + '\')" />'
    document.getElementById("articleId").innerHTML = htmlArticles;
  }
}

function addArticle() {
  const xhr = new XMLHttpRequest();

  xhr.open("PUT", "http://localhost:8080/rest/api/article/save", true);

  var data = {};
  data.codArt = document.getElementById("code").value;
  data.descrizione = document.getElementById("descr").value;
  data.pzCart = document.getElementById("pzcart").value;
  data.ivaDesc = document.getElementById("iva").value;
  data.famAssDesc = document.getElementById("fam").value;
  var ivaId = document.getElementById("iva");
  data.idIva = ivaId.options[ivaId.selectedIndex].value;
  var famId = document.getElementById("fam");
  data.idFamAss = famId.options[famId.selectedIndex].value;

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));

  xhr.onload = () => {
    console.log(xhr.responseText);
  };
  alert("Articolo aggiungo al carrello!");
  window.location = "file:///C:/Users/music/OneDrive/Desktop/supermarket/.html";
}

function showForm() {
  window.location =
    "file:///C:/Users/music/OneDrive/Desktop/supermarket/save.html";
}

function getIva() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function callIva() {
    if (this.readyState == 4 && this.status == 200) {
      var responseObject = JSON.parse(this.responseText);

      var iva = responseObject;
      var ivaHtml = "";
      for (var i of iva) {
        ivaHtml +=
          "<option value=" + i.idIva + ">" + i.descrizione + "</option>";
      }
    }
    document.getElementById("iva").innerHTML = ivaHtml;
  };

  xmlhttp.open("GET", "http://localhost:8080/rest/api/iva/list", true);
  xmlhttp.send();
}

function getFamAssort() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function callFam() {
    if (this.readyState == 4 && this.status == 200) {
      var responseObject = JSON.parse(this.responseText);

      var famAss = responseObject;
      var famHtml = "";
      for (var i of famAss) {
        famHtml += "<option value=" + i.id + ">" + i.descrizione + "</option>";
      }
    }
    document.getElementById("fam").innerHTML = famHtml;
  };

  xmlhttp.open("GET", "http://localhost:8080/rest/api/famassort/list", true);
  xmlhttp.send();
}

// http://localhost:8080/rest/api/article/by-code?getCod=

function getArticleByCode(code) {
  console.log("invio la richiesta");
  // prendi il codice dalla riga corrispondente

  var url = "http://localhost:8080/rest/api/article/by-code?getCod=";
  url += code;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = callArticleByCode;

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function callArticleByCode() {
  console.log("in attesa di risposta");

  if (this.readyState == 4 && this.status == 200) {
    var responseObject = JSON.parse(this.responseText);
    var codArt = responseObject.codArt;
    var descrizione = responseObject.descrizione;
    var pzCart = responseObject.pzCart;
    var ivaDesc = responseObject.ivaDesc;
    var famAssDesc = responseObject.famAssDesc;
    var idIva = responseObject.idIva;
    var idFamAss = responseObject.idFamAss;

    console.log(
      "stampa " +
        codArt +
        " " +
        descrizione +
        " " +
        pzCart +
        " " +
        ivaDesc +
        " " +
        famAssDesc +
        " " +
        idIva +
        " " +
        idFamAss
    );

    window.location =
      "file:///C:/Users/music/OneDrive/Desktop/supermarket/save.html";

    // document.getElementById("code").innerHTML = ivaDesc;
    // document.getElementById("code").innerHTML = famAssDesc;
  }
  document.getElementById("code").innerHTML = codArt;
  document.getElementById("descr").innerHTML = descrizione;
  document.getElementById("pzcart").innerHTML = pzCart;
}
