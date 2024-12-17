document.addEventListener("DOMContentLoaded", () => {
  var quantities = document.getElementsByClassName("quantity-input");
  var prices = document.getElementsByClassName("price");
  var totals = document.getElementsByClassName("total-price");
  var subtotalElement = document.getElementById("subtotal-amount");
  var minusButtons = document.getElementsByClassName("minus-btn");
  var plusButtons = document.getElementsByClassName("plus-btn");

 
  function updateCart() {
    var subtotal = 0;

    for (var i = 0; i < quantities.length; i++) {
      var quantity = Number(quantities[i].value);
      var price = Number(prices[i].innerText.replace("Price:", "").replace("$", "").trim());
      var total = quantity * price;

      totals[i].innerText = "$" + total.toFixed(2);
      subtotal += total;
    }

    subtotalElement.innerText = "$" + subtotal.toFixed(2);
  }


  function decreaseQuantity(index) {
    if (quantities[index].value > 1) {
      quantities[index].value--;
      updateCart();
    }
  }


  function increaseQuantity(index) {
    quantities[index].value++;
    updateCart();
  }

  for (var i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener("click", function () {
      decreaseQuantity(Array.prototype.indexOf.call(minusButtons, this));
    });
  }


  for (var i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener("click", function () {
      increaseQuantity(Array.prototype.indexOf.call(plusButtons, this));
    });
  }


  for (var i = 0; i < quantities.length; i++) {
    quantities[i].addEventListener("input", updateCart);
  }


  updateCart();
  });
  