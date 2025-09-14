
  let allProducts = [];

  // --- Get selected categories ---
  function getSelectedCategories() {
    return Array.from(document.querySelectorAll(".category-filter:checked")).map(cb => cb.value.toLowerCase());
  }

  // --- Get price filter ---
  function getMaxPrice() {
    const input = document.getElementById("price-range");
    return input ? parseFloat(input.value) : Infinity;
  }

  // --- Apply filters ---
  function applyFilters() {
    const categories = getSelectedCategories();
    const maxPrice = getMaxPrice();

    const filtered = allProducts.filter(p => {
      const matchCategory = categories.length === 0 || categories.includes(p.subcategory.toLowerCase());
      const matchPrice = p.offer_price <= maxPrice;
      return matchCategory && matchPrice;
    });

    renderProducts(filtered);
  }

  // --- Render products ---
  function renderProducts(products) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    products.forEach(product => {
      const html = `
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
                    <a class="btn addtocart-btn btn-secondary quick-add" data-id="${product.id}">Add to Cart
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                            <path d="M10.5 9.5V6.5L14.5 10.5L10.5 14.5V11.5H6.5V9.5H10.5ZM10.5 0.5C16.02 0.5 20.5 4.98 20.5 10.5C20.5 16.02 16.02 20.5 10.5 20.5C4.98 20.5 0.5 16.02 0.5 10.5C0.5 4.98 4.98 0.5 10.5 0.5ZM10.5 18.5C14.92 18.5 18.5 14.92 18.5 10.5C18.5 6.08 14.92 2.5 10.5 2.5C6.08 2.5 2.5 6.08 2.5 10.5C2.5 14.92 6.08 18.5 10.5 18.5Z" fill="white"/>
                        </svg>
                    </a>
                    <a href="product-details.html?id=${product.id}" class="btn buynow-btn" >View More
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                            <path d="M10.5 9.5V6.5L14.5 10.5L10.5 14.5V11.5H6.5V9.5H10.5ZM10.5 0.5C16.02 0.5 20.5 4.98 20.5 10.5C20.5 16.02 16.02 20.5 10.5 20.5C4.98 20.5 0.5 16.02 0.5 10.5C0.5 4.98 4.98 0.5 10.5 0.5ZM10.5 18.5C14.92 18.5 18.5 14.92 18.5 10.5C18.5 6.08 14.92 2.5 10.5 2.5C6.08 2.5 2.5 6.08 2.5 10.5C2.5 14.92 6.08 18.5 10.5 18.5Z" fill="#0F3E13"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        
        `;
      container.insertAdjacentHTML("beforeend", html);
    });

    setupProductEvents(products);
  }

  // --- Setup add-to-cart and wishlist events ---
  function setupProductEvents(products) {
    document.querySelectorAll(".quick-add").forEach(button => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const item = products.find(p => p.id === id);
        if (!item) return;

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
      });
    });

    document.querySelectorAll(".wishlist-icon").forEach(button => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const item = products.find(p => p.id === id);
        if (!item) return;

        let wishlist = getWishlist();
        const exists = wishlist.find(p => p.id === id);
        if (!exists) {
          wishlist.push(item);
          saveWishlist(wishlist);
          updateWishlistCount();
          alert(`Added to wishlist: ${item.product_name}`);
        } else {
          alert(`${item.product_name} is already in your wishlist.`);
        }
      });
    });
  }

  // --- On Page Load ---
  document.addEventListener("DOMContentLoaded", () => {
    // Auto-check category checkbox if URL has ?category=
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromURL = urlParams.get("category");

    if (categoryFromURL) {
      const checkbox = document.querySelector(`.category-filter[value="${categoryFromURL.toLowerCase()}"]`);
      if (checkbox) checkbox.checked = true;
    }

    // Load products
    fetch("mockData/product.json")
      .then(res => res.json())
      .then(data => {
        allProducts = data;

        // Apply initial filter if category exists in URL
        const initialFiltered = categoryFromURL
          ? data.filter(p => p.subcategory.toLowerCase() === categoryFromURL.toLowerCase())
          : data;

        renderProducts(initialFiltered);
        updateCartCount();
        updateWishlistCount();
      })
      .catch(err => {
        console.error("Error loading products:", err);
      });

    // Set up filter listeners
    document.querySelectorAll(".category-filter").forEach(cb => cb.addEventListener("change", applyFilters));

    const priceRange = document.getElementById("price-range");
    if (priceRange) {
      priceRange.addEventListener("input", () => {
        const valEl = document.getElementById("price-value");
        if (valEl) valEl.textContent = priceRange.value;
        applyFilters();
      });
    }
  });
