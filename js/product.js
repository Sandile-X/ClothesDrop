// Renders a single product's detail view based on the ?id= query param.

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get('id'));
  const root = document.getElementById('product-detail-root');
  const relatedSection = document.getElementById('related-section');
  const relatedGrid = document.getElementById('related-grid');
  const breadcrumbName = document.getElementById('breadcrumb-name');

  if (!product) {
    root.innerHTML = `
      <div class="cart-empty-state">
        <h2>Product not found</h2>
        <p>This item may have sold out or the link is outdated.</p>
        <a href="shop.html" class="btn btn-gold">Back to Shop</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} | Clothes Drop`;
  breadcrumbName.textContent = product.name;

  const index = PRODUCTS.findIndex((p) => p.id === product.id);
  let selectedSize = product.sizes[0];
  let qty = 1;

  root.innerHTML = `
    <div class="product-detail-inner">
      <div class="product-detail-media" style="background:${getGradient(index)}">
        <span class="product-icon">${product.icon}</span>
      </div>
      <div class="product-detail-info">
        <p class="product-detail-category">${product.category}</p>
        <h1>${product.name}</h1>
        <p class="product-detail-price">${formatPrice(product.price)}</p>
        <p class="product-detail-desc">${product.description}</p>

        <div class="option-group">
          <span class="option-label">Size</span>
          <div class="size-options" id="size-options">
            ${product.sizes
              .map(
                (size, i) =>
                  `<button type="button" class="size-btn${i === 0 ? ' active' : ''}" data-size="${size}">${size}</button>`
              )
              .join('')}
          </div>
        </div>

        <div class="option-group">
          <span class="option-label">Quantity</span>
          <div class="qty-stepper">
            <button type="button" id="qty-minus" aria-label="Decrease quantity">&minus;</button>
            <span id="qty-value">1</span>
            <button type="button" id="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div class="product-detail-actions">
          <button type="button" class="btn btn-gold" id="add-to-cart-btn">Add to Cart</button>
          <button type="button" class="btn btn-outline" id="buy-now-btn">Buy Now via WhatsApp</button>
        </div>

        <div class="product-detail-meta">
          Direct service, honest service &mdash; message any time.<br />
          50% deposit secures your order, balance on delivery.<br />
          Free delivery on orders R500+. Based in Mthatha.
        </div>
      </div>
    </div>
  `;

  const sizeOptions = document.getElementById('size-options');
  sizeOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('.size-btn');
    if (!btn) return;
    sizeOptions.querySelectorAll('.size-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSize = btn.dataset.size;
  });

  const qtyValue = document.getElementById('qty-value');
  document.getElementById('qty-minus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    qty = Math.min(20, qty + 1);
    qtyValue.textContent = qty;
  });

  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    window.Cart.add(product.id, selectedSize, qty);
    window.showToast(`Added "${product.name}" to cart`);
  });

  document.getElementById('buy-now-btn').addEventListener('click', () => {
    window.Cart.add(product.id, selectedSize, qty);
    window.location.href = 'cart.html';
  });

  // Related products
  const related = getRelatedProducts(product, 4);
  if (related.length) {
    related.forEach((p) => relatedGrid.appendChild(createProductCard(p)));
    relatedSection.style.display = '';
  }
});
