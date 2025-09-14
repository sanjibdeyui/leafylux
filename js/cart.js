// ---------- Utilities ----------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
 
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
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
 
// ---------- Update Qty Text in Cart + Summary ----------
function updateQtyText(id, qty) {
  const qtyText = document.querySelector(`.quantity-info[data-id="${id}"]`);
  if (qtyText) qtyText.textContent = `Qty: ${qty}`;
 
  const inputBox = document.querySelector(`.input-group[data-id="${id}"] input`);
  if (inputBox) inputBox.value = qty;
 
  const cart = getCart();
  const item = cart.find(p => p.id === id);

  if (item) {
    const subtotalEl = document.querySelector(`.input-group[data-id="${id}"]`)
      ?.parentElement?.nextElementSibling?.querySelector(".fw-bold");
    if (subtotalEl) subtotalEl.textContent = `$${(item.offer_price * qty).toFixed(2)}`;
  }
 
  const summaryQty = document.querySelector(`#order-items .summary-item[data-id="${id}"] .info small`);
  const summaryPrice = document.querySelector(`#order-items .summary-item[data-id="${id}"] .price`);
  if (summaryQty) summaryQty.textContent = `Qty: ${qty}`;
  if (summaryPrice) summaryPrice.textContent = `$${(item.offer_price * qty).toFixed(2)}`;
 
  if (document.getElementById("order-items")) {
    renderOrderSummary();
  }
}
 
// ---------- Render Cart ----------

function renderCartItems() {
  const cart = getCart();
  const container = document.getElementById("cart-list");
  container.innerHTML = "";

  if (!cart || cart.length === 0) {
    container.innerHTML = `<p class="empty-cart">No item present in your cart.</p>`;
    return;
  }

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
        <img src="${item.product_image}" alt="Product">
        <div class="cart-info">
        <h4 class="cartProName">${item.product_name}</h4>
        <p class="cartProQty quantity-info" data-id="${item.id}">Qty: ${quantity}</p>
        <p class="offer_price">Price: $${item.offer_price.toFixed(2)}</p>
        </div>
        <div class="cart-actions">
        <div class="remove-item" title="Remove item" data-id="${item.id}">X</div>
        <div class="unit-total">
            Unit Total: <span class="fw-bold">$${(item.offer_price * quantity).toFixed(2)}</span>
        </div>
        <div class="quantity-section input-group" data-id="${item.id}">
            <button class="qty-btn minus btn-decrement" data-id="${item.id}">-</button>
            <input type="tel" min="1" class="quantity-input" value="${quantity}">
            <button class="qty-btn plus btn-increment" data-id="${item.id}">+</button>
        </div>
        </div>
    </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
  }); 

  setupRemoveButtons();
  setupQuantityButtons();
  setupSizeChange(); // 👈 add this to listen for size dropdown changes
}

function setupSizeChange() {
  document.querySelectorAll(".size-select").forEach(select => {
    select.addEventListener("change", function () {
      const id = this.getAttribute("data-id");
      const newSize = this.value;

      let cart = getCart();
      const item = cart.find(p => p.id === id);
      if (item) {
        item.size = newSize;
        saveCart(cart);
        renderOrderSummary(); // update order summary with new size
      }
    });
  });
}






 
// ---------- Render Order Summary ----------
function renderOrderSummary(onlyTotals = false) {
  const cart = getCart();
  const container = document.getElementById("order-items");
  const subtotalEl = document.getElementById("subtotal-amount");
  const totalEl = document.getElementById("total-amount");
 
  let subtotal = 0;
  if (!onlyTotals) container.innerHTML = "";
 
  cart.forEach(item => {
    const quantity = item.quantity || 1;
    const totalPrice = item.offer_price * quantity;
    subtotal += totalPrice;
 
    if (!onlyTotals) {
      const html = `
        <div class="summary-item d-flex justify-content-between align-items-center" data-id="${item.id}">
          <img src="${item.product_image}" alt="${item.product_name}" style="width: 60px; height: auto;">
          <div class="info">
            <p class="mb-1">${item.product_name}</p>
            <div><small class="mb-1">Size: ${item.size}</small></div>
            <small>Qty: ${quantity}</small>
          </div>
          <div class="price">$${totalPrice.toFixed(2)}</div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", html);
    }
  });
 
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
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
 
// ---------- Buttons ----------
function setupRemoveButtons() {
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      let cart = getCart().filter(item => item.id !== id);
      saveCart(cart);
      renderCartItems();
      calculateCartTotals();
      updateCartCount();
      renderOrderSummary();
    });
  });
}
 
function setupQuantityButtons() {
  document.querySelectorAll(".btn-increment").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      let cart = getCart();
      const item = cart.find(p => p.id === id);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
        saveCart(cart);
        updateQtyText(id, item.quantity);
        calculateCartTotals();
        updateCartCount();
      }
    });
  });
 
  document.querySelectorAll(".btn-decrement").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      let cart = getCart();
      const item = cart.find(p => p.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCart(cart);
        updateQtyText(id, item.quantity);
        calculateCartTotals();
        updateCartCount();
      }
    });
  });
}
 
// ---------- Init ----------
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("cart-list")) {
    renderCartItems();
    calculateCartTotals();
    updateCartCount();
    updateWishlistCount();
  }
 
  if (document.getElementById("order-items")) {
    renderOrderSummary();
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "thank.html";
      });
    }
  }
});
