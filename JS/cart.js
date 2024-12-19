// document.addEventListener("DOMContentLoaded", () => {
//   var quantities = document.getElementsByClassName("quantity-input");
//   var prices = document.getElementsByClassName("price");
//   var totals = document.getElementsByClassName("total-price");
//   var subtotalElement = document.getElementById("subtotal-amount");
//   var minusButtons = document.getElementsByClassName("minus-btn");
//   var plusButtons = document.getElementsByClassName("plus-btn");

 
//   function updateCart() {
//     var subtotal = 0;

//     for (var i = 0; i < quantities.length; i++) {
//       var quantity = Number(quantities[i].value);
//       var price = Number(prices[i].innerText.replace("Price:", "").replace("$", "").trim());
//       var total = quantity * price;

//       totals[i].innerText = "$" + total.toFixed(2);
//       subtotal += total;
//     }

//     subtotalElement.innerText = "$" + subtotal.toFixed(2);
//   }


//   function decreaseQuantity(index) {
//     if (quantities[index].value > 1) {
//       quantities[index].value--;
//       updateCart();
//     }
//   }


//   function increaseQuantity(index) {
//     quantities[index].value++;
//     updateCart();
//   }

//   for (var i = 0; i < minusButtons.length; i++) {
//     minusButtons[i].addEventListener("click", function () {
//       decreaseQuantity(Array.prototype.indexOf.call(minusButtons, this));
//     });
//   }


//   for (var i = 0; i < plusButtons.length; i++) {
//     plusButtons[i].addEventListener("click", function () {
//       increaseQuantity(Array.prototype.indexOf.call(plusButtons, this));
//     });
//   }


//   for (var i = 0; i < quantities.length; i++) {
//     quantities[i].addEventListener("input", updateCart);
//   }


//   updateCart();
//   });
  

document.addEventListener("DOMContentLoaded", () => {

  var subtotalElement = document.getElementById("subtotal-amount");
  var minusButtons = document.getElementsByClassName("minus-btn");
  var plusButtons = document.getElementsByClassName("plus-btn");
  

  function renderCartItems() {
    var cartContainer = document.getElementById("cart-items-container"); 
 
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    

    cartContainer.innerHTML = '';

   
    let subtotal = 0;


    cart.forEach((item, index) => {
     
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <div class="cart-item">
      <img src="${item.image}" alt="Chair" class="product-img">
      <div class="product-details">
        <h3>${item.title}</h3>
        <p class="price" data-price="360">Price: ${item.price}</p>
      </div>
      <div class="quantity-controls">
        <button class="minus-btn">-</button>
        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
        <button class="plus-btn">+</button>
        <button onclick="removeItem(${index})" class="plus-btn" id="delete" style="margin:0px 5px"><i class="fa-solid fa-trash"></i></button>
      </div>
      <p class="total-price" style="margin:0px 5px">$${(item.price * item.quantity).toFixed(2)}</p>
      
    </div>
      `;
      
     
      cartContainer.appendChild(itemDiv);

      subtotal += item.price * item.quantity;
    });

    subtotalElement.innerText = "$" + subtotal.toFixed(2);
  }

  
  function updateLocalStorage() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const quantities = document.getElementsByClassName("quantity-input");
    for (let i = 0; i < quantities.length; i++) {
      const quantity = Number(quantities[i].value);
      cart[i].quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart)); 
    renderCartItems(); 
  }


  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); 
    renderCartItems(); 
  }

 
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('minus-btn')) {
      const index = Array.prototype.indexOf.call(minusButtons, e.target);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
      }
    }
    
    if (e.target.classList.contains('plus-btn')) {
      const index = Array.prototype.indexOf.call(plusButtons, e.target);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart[index].quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
    }
  });


  renderCartItems();
});
