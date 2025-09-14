// Example wishlist JSON (you may load this from localStorage or API)
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


// Target container
const wishlistContainer = document.getElementById("wishlist-container");

// Render wishlist products
function renderWishlist(products) {
  wishlistContainer.innerHTML = ""; // clear old content

  
  if (!products || products.length === 0) {
    wishlistContainer.innerHTML = `<p class="empty-wishlist">No item present in your wishlist.</p>`;
    return;
  }
  
  products.forEach(product => {
    const productCard = `
      <div class="product-card">
        <div class="product-badge sale">Sale</div>
        <div class="product-image">
          <img src="${product.product_image}" alt="${product.product_name}">
        </div>
        <div class="product-info">
          <div class="prodname-rating">
            <h3>${product.product_name}</h3>
            <div class="rating">
              <span class="stars">★</span>
              <span class="rating-count">(4.3)</span>
            </div>
          </div>
          <div class="price">
            <span class="current-price">$${product.offer_price.toFixed(2)}</span>
            <span class="original-price">$${product.sale_price.toFixed(2)}</span>
          </div>
          <div class="prod-card-btns">
            <a class="btn addtocart-btn btn-secondary quick-add" 
               data-id="${product.id}">
               Add to Cart
               <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                 <path d="M10.5 9.5V6.5L14.5 10.5L10.5 14.5V11.5H6.5V9.5H10.5ZM10.5 0.5C16.02 0.5 20.5 4.98 20.5 10.5C20.5 16.02 16.02 20.5 10.5 20.5C4.98 20.5 0.5 16.02 0.5 10.5C0.5 4.98 4.98 0.5 10.5 0.5ZM10.5 18.5C14.92 18.5 18.5 14.92 18.5 10.5C18.5 6.08 14.92 2.5 10.5 2.5C6.08 2.5 2.5 6.08 2.5 10.5C2.5 14.92 6.08 18.5 10.5 18.5Z" fill="white"/>
               </svg>
            </a>
            <a href="product-details.html?id=${product.id}" class="btn buynow-btn">
              View More
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M10.5 9.5V6.5L14.5 10.5L10.5 14.5V11.5H6.5V9.5H10.5ZM10.5 0.5C16.02 0.5 20.5 4.98 20.5 10.5C20.5 16.02 16.02 20.5 10.5 20.5C4.98 20.5 0.5 16.02 0.5 10.5C0.5 4.98 4.98 0.5 10.5 0.5ZM10.5 18.5C14.92 18.5 18.5 14.92 18.5 10.5C18.5 6.08 14.92 2.5 10.5 2.5C6.08 2.5 2.5 6.08 2.5 10.5C2.5 14.92 6.08 18.5 10.5 18.5Z" fill="#0F3E13"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
    wishlistContainer.insertAdjacentHTML("beforeend", productCard);
  });

  addTocart(products);
}

function addTocart(products) {
  document.querySelectorAll(".quick-add").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const item = products.find(p => p.id === id);
      if (!item) return;

      // --- Add to cart logic ---
      let cart = getCart();
      const existing = cart.find(p => p.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        item.quantity = 1;
        cart.push(item);
      }

      saveCart(cart);
      updateCartCount();
      alert(`Added to cart: ${item.product_name}`);

      // --- Remove from wishlist logic ---
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist = wishlist.filter(p => p.id !== id); // remove added product
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      // Optionally re-render wishlist UI
      const wishlistContainer = document.getElementById("wishlist-container");
      if (wishlistContainer) {
        wishlistContainer.innerHTML = ""; // clear old
        renderWishlist(wishlist); // re-render with updated wishlist
      }
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
// Call on page load
updateCartCount();
updateWishlistCount();
renderWishlist(getWishlist());
});


