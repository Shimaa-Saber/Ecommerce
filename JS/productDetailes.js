


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");


function decreaseQuantity() {
    let counter=document.getElementById("count");
    if (counter.value > 0) {
        counter.value--;
     
    }
  }

  function increaseQuantity() {
    let counter=document.getElementById("count"); 
   
        counter.value++;
     
    
  }


  function fetchProductDetails() {
    if (!productId) {
      document.getElementById("product-details-container").innerHTML = "<h2>Product not found</h2>";
      return;
    }

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        const detailsContainer = document.getElementById("product-details-container");
        detailsContainer.innerHTML = `
        <div class="product-container">
          <img src="${product.image}" alt="Product Image" id="img1">
          <div id="div1">
            <h3>${product.title}</h3>
            <h3 style="margin-top: 15px; color: #FF2020">${product.price}</h3>
            <span style="display: block;">Category : <span style="margin-left: 20px; color:#FF2020;">${product.category}</span></span>
            <span id="span2" style="padding-top:15px ;margin:10px">Availability: <span id="span3" style="margin-left: 20px;">In Stock</span></span>
            <hr style="margin-top:70px">
            <p>${product.description}</p>
            <div id="div2">
              <div id="div3">
                <button id="mins" style="border: none; background-color: transparent; font-size: 25px; margin-right: 5px;" onclick="decreaseQuantity()">-</button>
                <input id="count" type="number" min="0" value="${product.quantity}" style="margin-top: 5px; margin-left: 5px; border: none; width: 37px; text-align: center; font-size: 20px">
                <button id="plus" style="border: none; background-color: transparent; font-size: 25px;" onclick="increaseQuantity()">+</button>
              </div>
            </div>
            <button id="add_to_cart" onclick="addToCart(${product.id})">ADD TO CART</button>
          </div>
        </div>
      `;
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }

  
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
        alert(`${product.title} added to cart!`);
      })
      .catch(error => console.error("Error adding to cart:", error));
  }
  


  fetchProductDetails();


// Initialize ctr in local storage if it doesn't exist
if (!localStorage.getItem('ctr')) {
  localStorage.setItem('ctr', 0);
}

let cartBadg = document.getElementById("cart-badge");

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




















  