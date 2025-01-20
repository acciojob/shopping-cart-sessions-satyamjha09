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
/**
 * Get cart items from sessionStorage.
 * If no cart is found, return an empty array.
 */
function getCart() {
  const cartData = sessionStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

/**
 * Save the current cart array to sessionStorage.
 * @param {Array} cart - The array of cart items to store.
 */
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

/****************************
 *  Rendering Functions
 ****************************/
/**
 * Render the product list with an "Add to Cart" button for each product.
 */
function renderProducts() {
  // Clear existing products (if any) before re-rendering
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
  
  // Add click event to each "Add to Cart" button
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      addToCart(productId);
    });
  });
}

/**
 * Render the cart list from sessionStorage.
 */
function renderCart() {
  // Clear existing cart items (if any) before re-rendering
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

  // Add click events to each "Remove" button in the cart
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      removeFromCart(productId);
    });
  });
}

/****************************
 *  Cart Manipulation
 ****************************/
/**
 * Add a product to the cart by productId.
 */
function addToCart(productId) {
  // Find the product in the products array
  const product = products.find((p) => p.id === parseInt(productId, 10));
  if (!product) return;

  // Get current cart from sessionStorage
  const cart = getCart();

  // Add the selected product to the cart array
  cart.push(product);

  // Save updated cart to sessionStorage
  saveCart(cart);

  // Re-render the cart on the page
  renderCart();
}

/**
 * Remove a product from the cart by productId.
 */
function removeFromCart(productId) {
  let cart = getCart();

  // Filter out the product to remove
  cart = cart.filter((item) => item.id !== parseInt(productId, 10));

  // Save updated cart to sessionStorage
  saveCart(cart);

  // Re-render the cart on the page
  renderCart();
}

/**
 * Clear the entire cart.
 */
function clearCart() {
  // Remove cart data from sessionStorage
  sessionStorage.removeItem("cart");

  // Re-render the now-empty cart
  renderCart();
}

/****************************
 *  Initialize Page
 ****************************/
// Render products on page load
renderProducts();

// Render the cart (if any) on page load
renderCart();

// Attach event listener for the "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

