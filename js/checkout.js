function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}


 
function updateCartCount() {
  const cart = getCart();
  const el = document.getElementById("cart-count");
  if (el) {
    const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    el.textContent = totalQty;
  }
}
 
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}
 
function updateWishlistCount() {
  const wishlist = getWishlist();
  const el = document.getElementById("wish-count");
  if (el) el.textContent = wishlist.length;
}
 

// ---------- Totals ----------
function calculateCartTotals() {
  const cart = getCart();
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.offer_price * (item.quantity || 1);
  });
 
  const total = subtotal;
  document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
}
function renderCartItems() {
  const cart = getCart();
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  cart.forEach(item => {
    const quantity = item.quantity || 1;
    const sizes = item.sizes || []; // array of sizes, e.g., ["S", "M", "L"]
    //const selectedSize = item.size || (sizes.length > 0 ? sizes[0] : "Free");
    const selectedSize = item.size || "";

    const sizeOptions = sizes.map(size => `
      <option value="${size}" ${size === selectedSize ? "selected" : ""}>${size}</option>
    `).join("");

    const html = `
    <div class="cart-item">
        <img src="${item.product_image}" alt="${item.product_name}">
        <div class="cart-info">
        <h4>${item.product_name}</h4>
        <p>Qty: ${item.quantity || 1}</p>
        <p>Price: $${item.offer_price.toFixed(2)} <s>$${item.sale_price.toFixed(2)}</s></p>
        </div>
    </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
  }); 

}

function paymentProcess() {
    const form = document.getElementById("orderForm");

    // Validate form using HTML5 built-in validation
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Collect form data
    const orderData = {
        orderId: "ORD" + Math.floor(100000 + Math.random() * 900000), // random 6-digit order ID
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        country: document.getElementById("country").value.trim(),
        state: document.getElementById("state").value.trim(),
        city: document.getElementById("city").value.trim(),
        pinCode: document.getElementById("pinCode").value.trim(),
        address: document.getElementById("address").value.trim(),
        apartment: document.getElementById("apartment").value.trim(),
        landmark: document.getElementById("landmark").value.trim(),
        paymentMethod: document.querySelector("input[name='paymentMethod']:checked")?.value || "COD",
        cart: JSON.parse(localStorage.getItem("cartItems")) || [], // store cart items if you already manage them
        subtotal: document.getElementById("cart-subtotal").textContent,
        total: document.getElementById("cart-total").textContent
    };

    // Save order info in localStorage
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Redirect to Thank You page
    window.location.href = "thank-you.html";
}



// ---------- Init ----------
document.addEventListener("DOMContentLoaded", function () {

    renderCartItems();
    calculateCartTotals();
    updateCartCount();
    updateWishlistCount();

    // Attach to button
        document.querySelector(".checkout-btn").addEventListener("click", paymentProcess);

});