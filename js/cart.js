var keyOne = null;
var keyTwo = null;

function addToCart(code) {
  //alert("Articolo Aggiunto Al Carrello");
  var url = "http://localhost:8080/rest/api/cart/insert?codArt=";
  if (keyOne != null) {
    url += code + "&cartKey=" + keyOne;
  } else {
    url += code;
  }

  //console.log("URL: " + url);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = callCart;

  xmlhttp.open("POST", url, true);
  xmlhttp.send();
}

function callCart() {
  if (this.readyState == 4 && this.status == 200) {
    keyOne = this.responseText;
  }
  keyTwo = keyOne;
}
var ccc = null;
function viewCart() {
  document.getElementById("view_form").style.display = "none";
  document.getElementById("cart_table").style.display = "block";
  var url = "http://localhost:8080/rest/api/cart/by-key?cartKey=";
  url += keyTwo;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = callViewCart;

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
function callViewCart() {
  if (this.readyState == 4 && this.status == 200) {
    var cartResult = JSON.parse(this.responseText);
    //console.log(cartResult);
    // for (const [key, value] of Object.entries(cartResult)) {
    //   console.log(key, value);
    //   console.log(value);
    // }
    var map = new Map();
    var mapTwo = new Map();
    var carrello = [];
    for (var key in cartResult) {
      if (!cartResult.hasOwnProperty(key)) {
        continue;
      }
      //console.log(key, cartResult[key]);
      map = cartResult[key];
    }
    for (var key in map) {
      if (!map.hasOwnProperty(key)) {
        continue;
      }
      console.log(map[key]);
      carrello.push(map[key]);
    }
    for (var key in mapTwo) {
      if (!map.hasOwnProperty(key)) {
        continue;
      }
    }
    var htmlArtCart =
      "<h2>|-Carrello degli Acquisti-|</h2>" +
      "<tr>" +
      "<th>Codice Articolo</th>" +
      "<th>Descrizione</th>" +
      "<th>PzCart</th>" +
      "<th>Iva</th>" +
      "<th>FamAssort</th>" +
      "<th>Quantita</th>" +
      "</tr>";

    for (var art of carrello) {
      htmlArtCart +=
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
        art.quantita +
        "<tr>";
    }

    document.getElementById("cart_table").innerHTML = htmlArtCart;
  }
}
