let prevbtn = document.getElementById('prev');
let nextbtn = document.getElementById('next');



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



fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    })
    .catch((error) => console.error("Error fetching products:", error));
}


function navigateToDetails(productId) {
  
  window.location.href = `product-details.html?id=${productId}`;
}
    })
    .catch((error) => console.error("Error fetching products:", error));
}


function navigateToDetails(productId) {
  
  window.location.href = `product-details.html?id=${productId}`;
}
    })
    .catch((error) => console.error("Error fetching products:", error));
}


function navigateToDetails(productId) {
  
  window.location.href = `product-details.html?id=${productId}`;
}
    // Loop through products and add to the container
    products.forEach((product) => {
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}" class="product-image" />
          <div class="product-details">
            <h3>${product.title}</h3>
            <p class="product-price">$${product.price}</p>
          </div>
        </div>
      `;
      productsContainer.innerHTML += productCard;
    });
})
.catch(error => console.error('Error fetching products:', error));


function displayProducts(products) {
productContainer.innerHTML = ''; 

products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-item");

    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-img">
        <div class="product-details">
            <h3>${product.title}</h3>
            <p class="price" data-price="${product.price}">Price: $${product.price.toFixed(2)}</p>
        </div>
        <div class="quantity-controls">
            <button class="minus-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
            <input type="number" value="1" min="1" class="quantity-input" data-id="${product.id}" onchange="changeQuantity(${product.id}, this.value)">
            <button class="plus-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
        </div>
        <p class="total-price" data-id="${product.id}">$${product.price.toFixed(2)}</p>
        <button class="remove-btn" onclick="removeFromCart(${product.id})">Remove</button>
    `;

    productContainer.appendChild(productDiv);
});
}