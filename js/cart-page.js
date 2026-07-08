// Renders the full cart page: itemized list, order summary, WhatsApp checkout form.

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('cart-page-root');
  renderCartPage();

  function renderCartPage() {
    const items = window.Cart.getItems();

    if (items.length === 0) {
      root.innerHTML = `
        <div class="cart-empty-state">
          <h2>Your cart is empty</h2>
          <p>Add a few fits and they'll show up here.</p>
          <a href="shop.html" class="btn btn-gold">Browse the Shop</a>
        </div>
      `;
      return;
    }

    const rowsHtml = items
      .map((it) => {
        const product = getProductById(it.id);
        if (!product) return '';
        const index = PRODUCTS.findIndex((p) => p.id === product.id);
        return `
          <div class="cart-page-row" data-id="${it.id}" data-size="${it.size}">
            <div class="cart-page-row-media" style="background:${getGradient(index)}">
              <span>${product.icon}</span>
            </div>
            <div class="cart-page-row-info">
              <div class="cart-page-row-name">${product.name}</div>
              <div class="cart-page-row-meta">Size: ${it.size}</div>
              <div class="qty-stepper">
                <button type="button" class="row-qty-minus" aria-label="Decrease quantity">&minus;</button>
                <span>${it.qty}</span>
                <button type="button" class="row-qty-plus" aria-label="Increase quantity">+</button>
              </div>
              <div class="cart-page-row-price">${formatPrice(product.price * it.qty)}</div>
            </div>
            <button class="cart-page-row-remove" aria-label="Remove ${product.name}">&times;</button>
          </div>
        `;
      })
      .join('');

    const subtotal = window.Cart.subtotal();
    const freeDelivery = window.Cart.qualifiesForFreeDelivery();
    const deposit = window.Cart.depositDue();
    const balance = window.Cart.balanceDue();

    root.innerHTML = `
      <div class="cart-page-inner">
        <div class="cart-page-items">${rowsHtml}</div>

        <div class="order-summary">
          <h3>Order Summary</h3>
          <div class="order-summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
          </div>
          <div class="order-summary-row">
            <span>Delivery</span>
            <span>${freeDelivery ? 'Free (R500+ order)' : 'Confirmed on WhatsApp'}</span>
          </div>
          <div class="order-summary-row total">
            <span>Total</span>
            <span>${formatPrice(subtotal)}</span>
          </div>
          <div class="order-summary-row">
            <span>50% Deposit Due Now</span>
            <span>${formatPrice(deposit)}</span>
          </div>
          <div class="order-summary-row">
            <span>Balance on Delivery</span>
            <span>${formatPrice(balance)}</span>
          </div>
          ${!freeDelivery ? `<p class="checkout-hint">Add ${formatPrice(500 - subtotal)} more to unlock free delivery.</p>` : ''}

          <form class="checkout-form" id="checkout-form" novalidate>
            <div>
              <label for="cf-name">Full Name</label>
              <input type="text" id="cf-name" name="name" required />
            </div>
            <div>
              <label for="cf-phone">Phone Number</label>
              <input type="tel" id="cf-phone" name="phone" required />
            </div>
            <div>
              <label for="cf-address">Delivery Address</label>
              <input type="text" id="cf-address" name="address" required />
            </div>
            <div>
              <label for="cf-notes">Notes (optional)</label>
              <textarea id="cf-notes" name="notes" placeholder="Anything else I should know?"></textarea>
            </div>
            <p class="form-error" id="checkout-error">Please fill in your name, phone and delivery address.</p>
            <button type="submit" class="btn btn-gold checkout-submit">Checkout via WhatsApp</button>
            <p class="checkout-hint">Pay 50% deposit to secure your order, balance on delivery — you'll be redirected to WhatsApp to confirm with Mihlali directly.</p>
          </form>
        </div>
      </div>
    `;

    root.querySelectorAll('.cart-page-row').forEach((row) => {
      const id = row.dataset.id;
      const size = row.dataset.size;

      row.querySelector('.row-qty-minus').addEventListener('click', () => {
        const item = window.Cart.getItems().find((it) => it.id === id && it.size === size);
        if (!item) return;
        window.Cart.setQty(id, size, item.qty - 1);
        renderCartPage();
      });

      row.querySelector('.row-qty-plus').addEventListener('click', () => {
        const item = window.Cart.getItems().find((it) => it.id === id && it.size === size);
        if (!item) return;
        window.Cart.setQty(id, size, Math.min(20, item.qty + 1));
        renderCartPage();
      });

      row.querySelector('.cart-page-row-remove').addEventListener('click', () => {
        window.Cart.removeItem(id, size);
        window.showToast('Item removed from cart');
        renderCartPage();
      });
    });

    const form = document.getElementById('checkout-form');
    const errorEl = document.getElementById('checkout-error');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const address = form.address.value.trim();
      const notes = form.notes.value.trim();

      if (!name || !phone || !address) {
        errorEl.classList.add('show');
        return;
      }
      errorEl.classList.remove('show');

      const url = window.Cart.checkoutUrl({ name, phone, address, notes });
      window.open(url, '_blank', 'noopener');
    });
  }
});
