// --- Cart Utilities ---
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = totalQty;
}

// --- Wishlist Utilities ---
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function updateWishlistCount() {
  const wishlist = getWishlist();
  const el = document.getElementById("wish-count");
  if (el) el.textContent = wishlist.length;
}

// --- Update Counts on Page Load ---
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateWishlistCount();
});
