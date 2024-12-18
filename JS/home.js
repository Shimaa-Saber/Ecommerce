let prevbtn = document.getElementById('prev');
let nextbtn = document.getElementById('next');

const productsContainer = document.getElementById("products-container");
const menBtn = document.getElementById("men-btn");
const womenBtn = document.getElementById("women-btn");



let sliderImg = 0;
let img = document.getElementById("slider-img");
let slider = document.getElementsByTagName("header");



var interval;

interval = setInterval(next, 3000);


 slider[0].addEventListener('mouseenter',()=>clearInterval(interval));   
 nextbtn.addEventListener('mouseenter',()=>clearInterval(interval));
 prevbtn.addEventListener('mouseenter',()=>clearInterval(interval));
 slider[0].addEventListener('mouseleave',()=>interval = setInterval(next, 3000));
 function next() {
    sliderImg++;
    sliderImg = ((sliderImg % 3) + 3) % 3;
    img.setAttribute("src", `images/${sliderImg}.jpg`);
}
function prev(){

    sliderImg--;
    sliderImg = ((sliderImg % 3) + 3) % 3;
    img.setAttribute("src", `images/${sliderImg}.jpg`);
}




nextbtn.addEventListener('click', next);


prevbtn.addEventListener('click',prev);


function fetchProducts(category = "") {
  let apiURL = "https://fakestoreapi.com/products";
  
  if (category) {
    apiURL += `/category/${category}`;
  }

  fetch(apiURL)
    .then((res) => res.json())
    .then((products) => {

      productsContainer.innerHTML = "";

      products.forEach((product) => {
        const productCard = `
          <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-image" />
            <div class="product-details">
            
              <p class="product-price">$${product.price}</p>
            </div>
            <div class="icons">
             <div class="icon cart"  onclick="addToCart(${product.id})">🛒</div>
             <div class="icon heart">❤️</div>
             <div class="icon search"  onclick="navigateToDetails(${product.id})">🔍</div>
            </div>
          </div>
        `;
        productsContainer.innerHTML += productCard;
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

menBtn.addEventListener("click", () => {
  fetchProducts("men's clothing");
});

womenBtn.addEventListener("click", () => {
  fetchProducts("women's clothing");
});

function navigateToDetails(productId) {
  
  window.location.href = `productDetailes.html?id=${productId}`;
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


fetchProducts();