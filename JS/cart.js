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

let cartBadg = document.getElementById("cart-badge");
// Initialize ctr in local storage if it doesn't exist
if (!localStorage.getItem('ctr')) {
  localStorage.setItem('ctr', 0);
}


let buy_btn = document.getElementById("buy");
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
        <button  class="remove" data-index="${index}" id="delete" style="margin:0px 5px"><i class="fa-solid fa-trash"></i></button>
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

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove") || e.target.closest(".remove")) {
      const index = e.target.dataset.index || e.target.closest(".remove").dataset.index;
      removeItem(index);
    }
  });


  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let quantity = cart[index].quantity;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));




    let ctr = Number(localStorage.getItem('ctr'));
    ctr -= quantity;
    if(ctr<0)ctr=0;
    localStorage.setItem('ctr', ctr);


    cartBadg.innerHTML = ctr;
    renderCartItems();
  }




  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('minus-btn')) {
      const index = Array.prototype.indexOf.call(minusButtons, e.target);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart[index].quantity > 1) {

        let ctr = Number(localStorage.getItem('ctr'));
        --cart[index].quantity;
        ctr--;
        localStorage.setItem('ctr', ctr);
        cartBadg.innerHTML = ctr;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
      }
      else if(cart[index].quantity == 1){
        removeItem(index);
      }
    }

    if (e.target.classList.contains('plus-btn')) {
      const index = Array.prototype.indexOf.call(plusButtons, e.target);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let ctr = Number(localStorage.getItem('ctr'));
      ++cart[index].quantity;
      ctr++;
      localStorage.setItem('ctr', ctr);
      cartBadg.innerHTML = ctr;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
    }
  });


  renderCartItems();
});

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}




function isUserLoggedIn() {
  const userEmail = getCookie("email"); 
  return !!userEmail;
}

const buyBtn = document.getElementById("buy");

buyBtn.addEventListener("click", () => {
  if (isUserLoggedIn()) {
    const successModal = new bootstrap.Modal(document.getElementById("successModal"));
    successModal.show();
    
     // location.assign("./orderShiped.html");
  } else {
    
      alert("Please log in to proceed with the purchase.");
      location.assign("./login.html"); 
  }
});




function addToCart(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {

        cart[existingProductIndex].quantity++;
      } else {

        product.quantity = 1;
        cart.push(product);
      }


      localStorage.setItem('cart', JSON.stringify(cart));


      let ctr = Number(localStorage.getItem('ctr'));
      ctr++;
      localStorage.setItem('ctr', ctr);


      cartBadg.innerHTML = ctr;
    })
    .catch(error => console.error("Error adding to cart:", error));
}


document.addEventListener('DOMContentLoaded', () => {
  let ctr = localStorage.getItem('ctr') || 0;
  cartBadg.innerHTML = ctr;
});
