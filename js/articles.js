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
        "<button id=update> Modifica Articolo</button>" +
        "</td>" +
        "<td>" +
        "<button id=insToCart> Aggiungi al carrello</button>" +
        "</td>" +
        "<tr>";
    }

    document.getElementById("articleId").innerHTML = htmlArticles;
    document.getElementById("insToCart").onclick = addToCart;
    document.getElementById("update").onclick = update;
    document.getElementById("addArticle").onclick = addArticle;
    document.getElementById("addToCart").onclick = addToCart;
  }
}

function addToCart() {
  alert("Articolo aggiungo al carrello!");
}

function update() {
  alert("Articolo Modificato!");
}

function addArticle() {
  window.open("file:///C:/Users/music/OneDrive/Desktop/supermarket/save.html");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = callAddArticle;
  console.log("richiesta");
  xmlhttp.open("PUT", "http://localhost:8080/rest/api/article/save", true);
  xmlhttp.send();
}

function callAddArticle() {
  console.log("risposta");
  if (this.readyState == 4 && this.status == 200) {
    var responseObject = JSON.parse(this.responseText);
    var article = responseObject;
  }
}

function buildArticle() {
  var article = {
    codArt: document.getElementById("code").value,
    descrizione: document.getElementById("descr").value,
    pezCart: document.getElementById("pzcart").value,
    iva: document.getElementById("iva").value,
    famAss: document.getElementById("fam").value
  };
  for (var x in article) {
    console.log("il valore oggetto article " + x + " e' " + article[x]);
  }
}

function getIva() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function callIva() {
    if (this.readyState == 4 && this.status == 200) {
      var responseObject = JSON.parse(this.responseText);

      var iva = responseObject;
      var ivaHtml = "";
      for (var i of iva) {
        ivaHtml += " " + i.idIva + " " + i.descrizione + " ";
      }
      console.log(ivaHtml);
    }
    document.getElementById("demo").innerHTML = ivaHtml;
  };

  xmlhttp.open("GET", "http://localhost:8080/rest/api/iva/list", true);
  xmlhttp.send();
}
