// --- Get Product ID from URL ---
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// --- Render Product Page ---
function renderProductPage(product) {
  // --- Product Slider ---
  const sliderHTML = `
            ${[product.product_image, ...(product.gallery || [])]
            .map(
                (img) => `
                <div class="swiper-slide">
                    <img src="${img}" alt="Product">
                </div>`
                )
            .join("")}
  `;
  document.getElementById("slider-container").innerHTML = sliderHTML;
  document.getElementById("swiper-Thumbs-Dyn").innerHTML = sliderHTML;

  // --- Product Info with Size ---
  //const sizeOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join("");

  const infoHTML = `
    
    <div class="product-brand">LeafyLux</div>
        <h1 class="product-title">${product.product_name}</h1>
        
        <div class="product-stats">
            <span class="sold-count"> <img src="images/sold-icon.png" alt=""> <span>568+ Sold</span> in last 30 days</span>
        </div>
        
        <div class="rating bgnone">
            <div class="stars">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star half">★</span>
            </div>
            <span class="rating-text">4.5 (1000+ Reviews)</span>
        </div>
        
        <div class="pricing">
            <span class="discount-badge"></span>
            <span class="original-price" data-sale="${product.sale_price?.toFixed(2)}">$${product.sale_price?.toFixed(2)}</span>
            <span class="current-price" data-offer="${product.offer_price.toFixed(2)}">$${product.offer_price.toFixed(2)}</span>
        </div>
        <p class="tax-info">(Price Inclusive of all taxes)</p>
        
        <div class="gift-option">
            <input type="checkbox" id="gift-option">
            <label for="gift-option">Make This a Gift</label>
        </div>
        
        
        
        <div class="action-buttons">
            <div class="quantity-section">
                <button class="qty-btn minus" id="decrement-btn">-</button>
                <input type="tel" value="1" min="1" class="quantity-input" id="quantity-input" readonly>
                <button class="qty-btn plus" id="increment-btn">+</button>
            </div>
            <a class="btn add-to-cart-btn btn-secondary" id="add-to-cart-btn">
                Add to Cart
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M10.5 9.5V6.5L14.5 10.5L10.5 14.5V11.5H6.5V9.5H10.5ZM10.5 0.5C16.02 0.5 20.5 4.98 20.5 10.5C20.5 16.02 16.02 20.5 10.5 20.5C4.98 20.5 0.5 16.02 0.5 10.5C0.5 4.98 4.98 0.5 10.5 0.5ZM10.5 18.5C14.92 18.5 18.5 14.92 18.5 10.5C18.5 6.08 14.92 2.5 10.5 2.5C6.08 2.5 2.5 6.08 2.5 10.5C2.5 14.92 6.08 18.5 10.5 18.5Z" fill="white"/>
                </svg>
            </a>
            
        </div>
        
        <a href="#" class="btn buy-now-btn" id="add-to-wishlist-btn">
            Add to Wesh List
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M10.5 9.5V6.5L14.5 10.5L10.5 14.5V11.5H6.5V9.5H10.5ZM10.5 0.5C16.02 0.5 20.5 4.98 20.5 10.5C20.5 16.02 16.02 20.5 10.5 20.5C4.98 20.5 0.5 16.02 0.5 10.5C0.5 4.98 4.98 0.5 10.5 0.5ZM10.5 18.5C14.92 18.5 18.5 14.92 18.5 10.5C18.5 6.08 14.92 2.5 10.5 2.5C6.08 2.5 2.5 6.08 2.5 10.5C2.5 14.92 6.08 18.5 10.5 18.5Z" fill="#0F3E13"/>
            </svg>
        </a>
        
        <!-- Highlights -->
        <div class="highlights">
            <h3>HIGHLIGHTS:</h3>
            <div class="highlight-card">
                <div class="highlight-icon">
                    <img src="images/watering-can.png" alt="">
                </div>
                <div class="highlight-content">
                    <h4>Water Just Once a Week</h4>
                    <p>Water only when the topsoil feels dry; an empty reservoir doesn't always mean more water is needed.</p>
                </div>
            </div>
        </div>
        
        <!-- Care Features -->
        <div class="care-features">
            <div class="feature">
                <img src="images/pot-icon.png" alt="">
                <span>Needs 1-2 Hrs. Direct Sunlight</span>
            </div>
            <div class="feature">
                <img src="images/pet-icon.png" alt="">
                <span>Not Pet-Friendly</span>
            </div>
            <div class="feature">
                <img src="images/lm-icon.png" alt="">
                <span>Low Maintenance</span>
            </div>
        </div>
        
        <!-- Delivery Details -->
        <div class="delivery-section">
            
            <div class="delivery-info">
                <div class="delivery-item">
                    <img src="images/truck-icon.png" alt="">
                    <span><strong>FREE SHIPPING</strong> on orders above $40!</span>
                </div>
                <div class="delivery-item">
                    <img src="images/percel-icon.png" alt="">
                    <span>Cash on Delivery is available</span>
                </div>
            </div>
        </div>
  `;
  document.getElementById("product-info").innerHTML = infoHTML;

  const ProductDsc = `
        <p class="mb-4">${product.product_description}</p>
  `;
  document.getElementById("description-content").innerHTML = ProductDsc;

  // --- calculate Discount ----
  document.querySelectorAll(".pricing").forEach(product => {
    const salePrice = parseFloat(product.querySelector(".original-price").dataset.sale);
    const offerPrice = parseFloat(product.querySelector(".current-price").dataset.offer);
    const badge = product.querySelector(".discount-badge");

    if (salePrice > 0 && offerPrice < salePrice) {
        const discountPercent = Math.round(((salePrice - offerPrice) / salePrice) * 100);
        badge.textContent = `Save ${discountPercent}%`;
    } else {
        badge.textContent = "No Discount";
    }
  });


  // --- Quantity Logic ---
  let quantity = 1;
  const input = document.getElementById("quantity-input");
  const subtotalEl = document.getElementById("subtotal");

  document.getElementById("increment-btn").onclick = () => {
    quantity++;
    input.value = quantity;
    //subtotalEl.textContent = (product.offer_price * quantity).toFixed(2);
  };

  document.getElementById("decrement-btn").onclick = () => {
    if (quantity > 1) {
      quantity--;
      input.value = quantity;
      //subtotalEl.textContent = (product.offer_price * quantity).toFixed(2);
    }
  };

  // --- Add to Cart ---
  document.getElementById("add-to-cart-btn").onclick = () => {
    // const size = document.getElementById("size-select").value;
    // if (!size) {
    //   alert("Please select a size.");
    //   return;
    // }

    let cart = getCart();
    const existingItem = cart.find(p => p.id === product.id );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const itemToAdd = { ...product, quantity };
      cart.push(itemToAdd);
    }

    saveCart(cart);
    updateCartCount();
    alert(`Added ${quantity} x ${product.product_name} to cart`);
  };

  // --- Add to Wishlist ---
  document.getElementById("add-to-wishlist-btn").onclick = () => {
    let wishlist = getWishlist();
    const exists = wishlist.find(p => p.id === product.id);
    if (!exists) {
      wishlist.push(product);
      saveWishlist(wishlist);
      updateWishlistCount();
      alert(`Added ${product.product_name} to wishlist`);
    } else {
      alert(`${product.product_name} is already in your wishlist.`);
    }
  };
}

// --- Init Product Page ---
document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromURL();
  if (!productId) return;

  fetch("mockData/product.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      if (!product) {
        document.getElementById("product-info").innerHTML = "<p>Product not found.</p>";
        return;
      }
      renderProductPage(product);
    })
    .catch(err => {
      console.error("Failed to load product data:", err);
      document.getElementById("product-info").innerHTML = "<p>Error loading product.</p>";
    });
});
