var cartKey = null;

function addToCart(code) {
  var url = "http://localhost:8080/rest/api/cart/insert?codArt=";
  if (cartKey != null) {
    url += code + "&cartKey=" + cartKey;
  } else {
    url += code;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        alert("Articolo Aggiunto Al Carrello");
        cartKey = this.responseText;
      } else {
        alert("Errore inserimento articolo!");
      }
    }
  };

  xmlhttp.open("POST", url, true);
  xmlhttp.send();
}

function viewCart() {
  document.getElementById("view_form").style.display = "none";
  document.getElementById("cart_table").style.display = "block";
  document.getElementById("header_cart").style.display = "block";
  document.getElementById("h2_cart").style.display = "block";

  var url = "http://localhost:8080/rest/api/cart/by-key?cartKey=";
  url += cartKey;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = callViewCart;

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
function callViewCart() {
  if (this.readyState == 4 && this.status == 200) {
    var cartResult = JSON.parse(this.responseText);
    var carrello = [];

    for (var artCode in cartResult.articoli) {
      console.log(cartResult.articoli[artCode]);
      carrello.push(cartResult.articoli[artCode]);
    }
    var htmlArtCart = "";

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
