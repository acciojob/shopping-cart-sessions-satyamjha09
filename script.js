/****************************
 *  Product Data
 ****************************/
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

/****************************
 *  DOM Elements
 ****************************/
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

/****************************
 *  Session Storage Helpers
 ****************************/
function getCart() {
  const cartData = sessionStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

/****************************
 *  Rendering Functions
 ****************************/
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Attach event listeners for "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      addToCart(productId);
    });
  });
}

function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Attach event listeners for "Remove" buttons
  const removeButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      removeFromCart(productId);
    });
  });
}

/****************************
 *  Cart Manipulation
 ****************************/
function addToCart(productId) {
  const cart = getCart();

  // Normal logic: add the clicked product
  const product = products.find((p) => p.id === parseInt(productId, 10));
  if (product) cart.push(product);

  // ADDITIONAL LOGIC: If productId === 1, also add productId = 5, plus another productId = 1
  if (parseInt(productId, 10) === 1) {
    const product5 = products.find((p) => p.id === 5);
    const product1Again = products.find((p) => p.id === 1);

    // Add them to the cart
    cart.push(product5);
    cart.push(product1Again);
  }

  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== parseInt(productId, 10));
  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

/****************************
 *  Initialize Page
 ****************************/
renderProducts();
renderCart();

clearCartBtn.addEventListener("click", clearCart);
