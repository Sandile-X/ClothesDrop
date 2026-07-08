// Renders the shop grid: category filters, search, sort.

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  const filtersContainer = document.getElementById('shop-filters');
  const searchInput = document.getElementById('shop-search');
  const sortSelect = document.getElementById('shop-sort');
  const countEl = document.getElementById('shop-count');

  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('category') || 'All';

  getCategories().forEach((cat) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.type = 'button';
    btn.dataset.category = cat;
    btn.textContent = cat;
    if (cat === activeCategory) btn.classList.add('active');
    filtersContainer.appendChild(btn);
  });

  if (activeCategory === 'All') {
    filtersContainer.querySelector('.filter-btn[data-category="All"]').classList.add('active');
  } else {
    filtersContainer.querySelector('.filter-btn[data-category="All"]').classList.remove('active');
  }

  filtersContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filtersContainer.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    render();
  });

  searchInput.addEventListener('input', render);
  sortSelect.addEventListener('change', render);

  function render() {
    let items = PRODUCTS.slice();

    if (activeCategory !== 'All') {
      items = items.filter((p) => p.category === activeCategory);
    }

    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      items = items.filter(
        (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      );
    }

    switch (sortSelect.value) {
      case 'price-asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    grid.innerHTML = '';
    if (items.length === 0) {
      grid.innerHTML = '<p class="no-results">No products match your search.</p>';
    } else {
      items.forEach((p) => grid.appendChild(createProductCard(p)));
    }

    countEl.textContent = `${items.length} product${items.length === 1 ? '' : 's'}`;
  }

  render();
});
