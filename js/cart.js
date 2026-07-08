/* ===== Cart engine: localStorage-backed state shared across every page ===== */

(function () {
  const STORAGE_KEY = 'cd_cart_v1';
  const WHATSAPP_NUMBER = '27782120124';
  const FREE_DELIVERY_THRESHOLD = 500;

  function readItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function writeItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadge();
    renderDrawer();
  }

  function itemKey(id, size) {
    return `${id}__${size}`;
  }

  function add(id, size, qty) {
    const items = readItems();
    const existing = items.find((it) => itemKey(it.id, it.size) === itemKey(id, size));
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id, size, qty });
    }
    writeItems(items);
  }

  function setQty(id, size, qty) {
    let items = readItems();
    if (qty <= 0) {
      items = items.filter((it) => itemKey(it.id, it.size) !== itemKey(id, size));
    } else {
      const existing = items.find((it) => itemKey(it.id, it.size) === itemKey(id, size));
      if (existing) existing.qty = qty;
    }
    writeItems(items);
  }

  function removeItem(id, size) {
    const items = readItems().filter((it) => itemKey(it.id, it.size) !== itemKey(id, size));
    writeItems(items);
  }

  function clear() {
    writeItems([]);
  }

  function count() {
    return readItems().reduce((sum, it) => sum + it.qty, 0);
  }

  function subtotal() {
    return readItems().reduce((sum, it) => {
      const product = getProductById(it.id);
      return product ? sum + product.price * it.qty : sum;
    }, 0);
  }

  function qualifiesForFreeDelivery() {
    return subtotal() >= FREE_DELIVERY_THRESHOLD;
  }

  function depositDue() {
    return Math.round(subtotal() / 2);
  }

  function balanceDue() {
    return subtotal() - depositDue();
  }

  function updateBadge() {
    document.querySelectorAll('.cart-badge').forEach((el) => {
      const n = count();
      el.textContent = String(n);
      el.classList.toggle('cart-badge-visible', n > 0);
    });
  }

  function renderDrawer() {
    const container = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    if (!container || !subtotalEl) return;

    const items = readItems();
    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>';
    } else {
      items.forEach((it) => {
        const product = getProductById(it.id);
        if (!product) return;
        const row = document.createElement('div');
        row.className = 'cart-drawer-row';
        row.innerHTML = `
          <div class="cart-drawer-row-media" style="background:${getGradient(PRODUCTS.findIndex((p) => p.id === product.id))}">
            <span>${product.icon}</span>
          </div>
          <div class="cart-drawer-row-info">
            <span class="cart-drawer-row-name">${product.name}</span>
            <span class="cart-drawer-row-meta">Size: ${it.size} &times; ${it.qty}</span>
            <span class="cart-drawer-row-price">${formatPrice(product.price * it.qty)}</span>
          </div>
          <button class="cart-drawer-row-remove" aria-label="Remove ${product.name}">&times;</button>
        `;
        row.querySelector('.cart-drawer-row-remove').addEventListener('click', () => {
          removeItem(it.id, it.size);
        });
        container.appendChild(row);
      });
    }

    subtotalEl.textContent = formatPrice(subtotal());

    const hintEl = document.getElementById('cart-drawer-delivery-hint');
    if (hintEl) {
      if (items.length === 0) {
        hintEl.textContent = '';
      } else if (qualifiesForFreeDelivery()) {
        hintEl.textContent = '✓ Free delivery unlocked!';
      } else {
        hintEl.textContent = `Add ${formatPrice(FREE_DELIVERY_THRESHOLD - subtotal())} more for free delivery`;
      }
    }
  }

  function buildWhatsAppMessage(customer) {
    const items = readItems();
    const lines = [`Hi Clothes Drop! I'd like to place an order:`, ''];

    items.forEach((it) => {
      const product = getProductById(it.id);
      if (!product) return;
      lines.push(`• ${it.qty} x ${product.name} (Size: ${it.size}) - ${formatPrice(product.price * it.qty)}`);
    });

    lines.push('');
    lines.push(`Subtotal: ${formatPrice(subtotal())}`);
    lines.push(`Delivery: ${qualifiesForFreeDelivery() ? 'Free (R500+ order)' : 'To be confirmed'}`);
    lines.push(`50% Deposit Due Now: ${formatPrice(depositDue())}`);
    lines.push(`Balance on Delivery: ${formatPrice(balanceDue())}`);
    lines.push('');
    lines.push(`Name: ${customer.name}`);
    lines.push(`Phone: ${customer.phone}`);
    lines.push(`Delivery Address: ${customer.address}`);
    if (customer.notes) lines.push(`Notes: ${customer.notes}`);

    return lines.join('\n');
  }

  function checkoutUrl(customer) {
    const message = buildWhatsAppMessage(customer);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  window.Cart = {
    getItems: readItems,
    add,
    setQty,
    removeItem,
    clear,
    count,
    subtotal,
    qualifiesForFreeDelivery,
    depositDue,
    balanceDue,
    updateBadge,
    renderDrawer,
    checkoutUrl,
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateBadge();
    renderDrawer();
  });
})();
