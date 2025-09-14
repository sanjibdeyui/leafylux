// home page js start


  // Utilities for Cart
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = getCart();
    const el = document.getElementById("cart-count");
    if (el) el.textContent = cart.length;
  }

  // Utilities for Wishlist
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

  fetch("mockData/product.json")
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("product-list"); // Best Selling
      const newCollectionList = document.getElementById("new-collection-list"); // New Collection

      // ======== Best Selling Section ========
    //   productList.innerHTML = "";

    //   const uniqueSubcategories = new Set();
    //   const filteredProducts = [];

    //   for (let product of products) {
    //     if (!uniqueSubcategories.has(product.subcategory)) {
    //       uniqueSubcategories.add(product.subcategory);
    //       filteredProducts.push(product);
    //     }
    //     if (filteredProducts.length === 6) break;
    //   }

    //   filteredProducts.forEach((product) => {
    //     const productHTML = generateProductHTML(product);
    //     productList.insertAdjacentHTML("beforeend", productHTML);
    //   });

    productList.innerHTML = "";

    const newProductLitIds = ["p020", "p022", "p024", "p026", "p028", "p030"];
    const newListItesm = products.filter((p) => newProductLitIds.includes(p.id));

    newListItesm.forEach((product) => {
        const productHTML = generateProductHTML(product);
        productList.insertAdjacentHTML("beforeend", productHTML);
      });


      // ======== New Collection Section ========
      newCollectionList.innerHTML = "";

      const newProductIds = ["p001", "p002", "p003", "p004", "p005", "p006"];
      const newCollectionProducts = products.filter((p) => newProductIds.includes(p.id));

      newCollectionProducts.forEach((product) => {
        const productHTML = generateProductHTML(product);
        newCollectionList.insertAdjacentHTML("beforeend", productHTML);
      });

      // ======== Setup cart & wishlist buttons ========
      document.addEventListener("click", function (event) {
        // Quick Add to Cart
        if (event.target.closest(".quick-add")) {
          const button = event.target.closest(".quick-add");
          const id = button.getAttribute("data-id");
          const item = products.find((p) => p.id === id);
          if (!item) return;
          let cart = getCart();
          const exists = cart.find((p) => p.id === item.id);
          if (!exists) {
            cart.push(item);
            saveCart(cart);
            updateCartCount();
            alert(`Added to cart: ${item.product_name}`);
          } else {
            alert(`${item.product_name} is already in your cart.`);
          }
        }

        // Add to Wishlist
        if (event.target.closest(".wishlist-icon")) {
          const button = event.target.closest(".wishlist-icon");
          const id = button.getAttribute("data-id");
          const item = products.find((p) => p.id === id);
          if (!item) return;
          let wishlist = getWishlist();
          const exists = wishlist.find((p) => p.id === item.id);
          if (!exists) {
            wishlist.push(item);
            saveWishlist(wishlist);
            updateWishlistCount();
            alert(`Added to wishlist: ${item.product_name}`);
          } else {
            alert(`${item.product_name} is already in your wishlist.`);
          }
        }
      });

      updateCartCount();
      updateWishlistCount();
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });

  // Utility to generate product HTML
  function generateProductHTML(product) {
    return `
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
                    <a class="btn addtocart-btn btn-secondary quick-add" data-id="${product.id}" onclick="toggleBag(this)">Add to Cart
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                            <path d="M10.5 9.5V6.5L14.5 10.5L10.5 14.5V11.5H6.5V9.5H10.5ZM10.5 0.5C16.02 0.5 20.5 4.98 20.5 10.5C20.5 16.02 16.02 20.5 10.5 20.5C4.98 20.5 0.5 16.02 0.5 10.5C0.5 4.98 4.98 0.5 10.5 0.5ZM10.5 18.5C14.92 18.5 18.5 14.92 18.5 10.5C18.5 6.08 14.92 2.5 10.5 2.5C6.08 2.5 2.5 6.08 2.5 10.5C2.5 14.92 6.08 18.5 10.5 18.5Z" fill="white"/>
                        </svg>
                    </a>
                    <a href="product-details.html?id=${product.id}" class="btn buynow-btn"> View More
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                            <path d="M10.5 9.5V6.5L14.5 10.5L10.5 14.5V11.5H6.5V9.5H10.5ZM10.5 0.5C16.02 0.5 20.5 4.98 20.5 10.5C20.5 16.02 16.02 20.5 10.5 20.5C4.98 20.5 0.5 16.02 0.5 10.5C0.5 4.98 4.98 0.5 10.5 0.5ZM10.5 18.5C14.92 18.5 18.5 14.92 18.5 10.5C18.5 6.08 14.92 2.5 10.5 2.5C6.08 2.5 2.5 6.08 2.5 10.5C2.5 14.92 6.08 18.5 10.5 18.5Z" fill="#0F3E13"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>      
      
      `;
  }


// home page js end




// product details page js




