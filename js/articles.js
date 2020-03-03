var arrayIva = [];
var arrayFam = [];

function getArticles() {
  document.getElementById("view_form").style.display = "none";
  document.getElementById("cartTable").style.display = "none";
  document.getElementById("title_Cart").style.display = "none";
  document.getElementById("title_page").style.display = "block";

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = callArticles;

  xmlhttp.open("GET", "http://localhost:8080/rest/api/articles/list", true);
  xmlhttp.send();
}

function callArticles() {
  if (this.readyState == 4 && this.status == 200) {
    var responseObject = JSON.parse(this.responseText);
    var articles = responseObject;
    //console.log(articles);
    var htmlArticles = "";

    for (var art of articles) {
      htmlArticles +=
        "<tr>" +
        "<td >" +
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
        '<input  class="btn btn-danger" value="Modifica Articolo" type="button" onClick="getArticleByCode(\'' +
        art.codArt +
        "')\"/>" +
        "</td>" +
        "<td>" +
        '<input class="btn btn-primary" value="Aggiungi Al Carrello" type="button" onClick="addToCart(\'' +
        art.codArt +
        "')\"/>" +
        "</td>" +
        "<tr>";
    }
    document.getElementById("articles").innerHTML = htmlArticles;
  }
}

function addArticle() {
  var xhr = new XMLHttpRequest();

  xhr.open("PUT", "http://localhost:8080/rest/api/article/save", true);

  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        alert("Articolo aggiunto al database!");
      } else {
        alert("Errore inserimento articolo!");
      }
    }
  };

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
  document.getElementById("view_form").style.display = "none";
}

function getIva() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function callIva() {
    if (this.readyState == 4 && this.status == 200) {
      var responseObject = JSON.parse(this.responseText);

      // for (var i of responseObject) {
      //   console.log("stampa iva " + i.idIva + " " + i.descrizione);
      // }
      arrayIva = responseObject;
      var ivaHtml = "";
      for (var i of responseObject) {
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
      arrayFam = responseObject;
      var famHtml = "";
      for (var i of responseObject) {
        famHtml += "<option value=" + i.id + ">" + i.descrizione + "</option>";
      }
    }

    document.getElementById("fam").innerHTML = famHtml;
  };

  xmlhttp.open("GET", "http://localhost:8080/rest/api/famassort/list", true);
  xmlhttp.send();
}

function getArticleByCode(code) {
  document.getElementById("cart_table").style.display = "none";
  var url = "http://localhost:8080/rest/api/article/by-code?getCod=";
  url += code;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = callArticleByCode;

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function callArticleByCode() {
  if (this.readyState == 4 && this.status == 200) {
    var article = JSON.parse(this.responseText);

    var ivaOptions = document.getElementById("iva").options;

    for (var iva of ivaOptions) {
      if (iva.value == article.idIva) {
        iva.selected = true;
      }
    }

    var famOptions = document.getElementById("fam").options;

    for (var fam of famOptions) {
      if (fam.value == article.idFamAss) {
        fam.selected = true;
      }
    }

    document.getElementById("view_form").style.display = "block";
    document.getElementById("code").value = article.codArt;
    document.getElementById("descr").value = article.descrizione;
    document.getElementById("pzcart").value = article.pzCart;
  }
}
function formDisplay() {
  document.getElementById("view_form").style.display = "block";
  document.getElementById("cartTable").style.display = "none";
  document.getElementById("title_Cart").style.display = "none";
  document.getElementById("code").value = "";
  document.getElementById("descr").value = "";
  document.getElementById("pzcart").value = "";

  var ivaHtml = "";
  for (var i of arrayIva) {
    ivaHtml += "<option value=" + i.idIva + ">" + i.descrizione + "</option>";
  }
  document.getElementById("iva").innerHTML = ivaHtml;
  var famHtml = "";
  for (var i of arrayFam) {
    famHtml += "<option value=" + i.id + ">" + i.descrizione + "</option>";
  }
  document.getElementById("fam").innerHTML = famHtml;
  document.getElementById("title_page").style.display = "block";
}
