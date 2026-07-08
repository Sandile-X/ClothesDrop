/* ===== Product catalog — sourced from Clothes Drop's live WhatsApp catalogue ===== */

const GRADIENTS = [
  'linear-gradient(135deg, #f1e2b0, #c9a227)',
  'linear-gradient(135deg, #2b2b2b, #a5811a)',
  'linear-gradient(135deg, #c9a227, #6b5514)',
  'linear-gradient(135deg, #faf8f3, #e9d9a8)',
  'linear-gradient(135deg, #1a1a1a, #4a3d14)',
  'linear-gradient(135deg, #e9d9a8, #a5811a)',
];

const CLOTHING_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const ONE_SIZE = ['One Size'];

const PRODUCTS = [
  // Hoodies
  { id: 'p1', name: 'Men Vintage Washed Hoodie', category: 'Hoodies', price: 340, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Vintage-washed comfort — stylish, good-quality drip without paying for the logo.' },
  { id: 'p2', name: 'Pullover Hoodie with Contrast Stitch', category: 'Hoodies', price: 530, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Contrast-stitched pullover — trendy, quality pieces sourced so you don’t have to stress.' },
  { id: 'p3', name: 'Women’s Solid Zip-Up Pullover', category: 'Hoodies', price: 400, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Everyday layer for women — style without stress, price without compromise.' },

  // Jackets
  { id: 'p4', name: 'Men’s Solid Colour Mini Jacket', category: 'Jackets', price: 275, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Clean solid colourway for daily wear — quality pieces without the international headache.' },
  { id: 'p5', name: 'Men’s Fashionable Daily Jacket', category: 'Jackets', price: 390, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'A daily jacket built for direct service, honest service, and fits that actually work for our lifestyle.' },
  { id: 'p6', name: 'Coffee Coloured Leather Jacket', category: 'Jackets', price: 420, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Winter pieces still available for the cold days left — leather layer, everyday drip.' },
  { id: 'p7', name: 'Jacket for Women, Grey', category: 'Jackets', price: 300, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'A grey layer for the cold days left — style without stress.' },
  { id: 'p8', name: 'Women’s Autumn Winter Jacket', category: 'Jackets', price: 680, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Ready for the season ahead — summer’s loading, but this one’s ready now.' },

  // Streetwear
  { id: 'p9', name: 'Men’s Black Street Wear', category: 'Streetwear', price: 290, icon: '\u{1F3BD}', sizes: CLOTHING_SIZES, description: 'Streetwear that works for our lifestyle — no logo tax, just good fits.' },

  // Pants
  { id: 'p10', name: 'Men’s Vintage Flame Pants', category: 'Pants', price: 600, icon: '\u{1F456}', sizes: CLOTHING_SIZES, description: 'Statement flame-print pants — trendy pieces without the branded price tag.' },

  // Sweatpants
  { id: 'p11', name: 'Grey Sweatpant for Curvy', category: 'Sweatpants', price: 300, icon: '\u{1F456}', sizes: CLOTHING_SIZES, description: 'Comfort fit for curvy queens — quality pieces, no international headache.' },
  { id: 'p12', name: 'Grey Sweatpant for Men', category: 'Sweatpants', price: 297, icon: '\u{1F456}', sizes: CLOTHING_SIZES, description: 'Everyday sweatpants — trendy, quality, no stress.' },

  // Accessories
  { id: 'p13', name: 'Flat Top Baseball Unisex Cap', category: 'Accessories', price: 140, icon: '\u{1F9E2}', sizes: ONE_SIZE, description: 'Finish the fit — unisex, one size, everyone eats.' },
];

function formatPrice(amount) {
  return 'R' + Number(amount).toLocaleString('en-ZA');
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getCategories() {
  return [...new Set(PRODUCTS.map((p) => p.category))];
}

function getGradient(index) {
  return GRADIENTS[index % GRADIENTS.length];
}

function getRelatedProducts(product, count = 4) {
  const sameCategory = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
  const pool = sameCategory.length >= count ? sameCategory : PRODUCTS.filter((p) => p.id !== product.id);
  return pool.slice(0, count);
}

/**
 * Builds a product card DOM node. Shared between the shop grid and
 * "related products" rows so markup/behaviour stays in one place.
 */
function createProductCard(product) {
  const index = PRODUCTS.findIndex((p) => p.id === product.id);

  const card = document.createElement('article');
  card.className = 'product-card';

  const media = document.createElement('a');
  media.href = `product.html?id=${product.id}`;
  media.className = 'product-media';
  media.style.background = getGradient(index);
  media.innerHTML = `<span class="product-icon">${product.icon}</span>`;

  const body = document.createElement('div');
  body.className = 'product-body';

  const category = document.createElement('span');
  category.className = 'product-category';
  category.textContent = product.category;

  const name = document.createElement('a');
  name.href = `product.html?id=${product.id}`;
  name.className = 'product-name';
  name.textContent = product.name;

  const price = document.createElement('span');
  price.className = 'product-price';
  price.textContent = formatPrice(product.price);

  const addBtn = document.createElement('button');
  addBtn.className = 'btn btn-outline product-add-btn';
  addBtn.type = 'button';
  addBtn.textContent = 'Add to Cart';
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.Cart.add(product.id, product.sizes[0], 1);
    window.showToast(`Added "${product.name}" to cart`);
  });

  body.appendChild(category);
  body.appendChild(name);
  body.appendChild(price);
  body.appendChild(addBtn);

  card.appendChild(media);
  card.appendChild(body);

  return card;
}
