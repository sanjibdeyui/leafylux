function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}
 
function updateWishlistCount() {
  const wishlist = getWishlist();
  const el = document.getElementById("wish-count");
  if (el) el.textContent = wishlist.length;
}
 

function populateOrderData(){
    const orderData = JSON.parse(localStorage.getItem("orderData"));

        if (!orderData) return;

        // Basic info
        document.getElementById("orderId").textContent = "#" + orderData.orderId;
        document.getElementById("confirmEmail").textContent = orderData.email;
        document.getElementById("confirmPhone").textContent = orderData.phone;
        document.getElementById("confirmPayment").textContent =
            orderData.paymentMethod === "credit" ? "Credit Card" :
            orderData.paymentMethod === "other" ? "Other Payment Method" : "Cash on Delivery";

        // Address
        const fullAddress = `
            ${orderData.firstName} ${orderData.lastName}<br>
            ${orderData.address} ${orderData.apartment ? orderData.apartment + "<br>" : ""} 
            ${orderData.city}, ${orderData.state} - ${orderData.pinCode}<br>
            ${orderData.country}
        `;
        document.getElementById("confirmAddress").innerHTML = fullAddress;
        document.getElementById("confirmBilling").innerHTML = fullAddress;
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
document.addEventListener("DOMContentLoaded", () => {
    calculateCartTotals();
    renderCartItems();
    populateOrderData();
    updateWishlistCount();
   
});
