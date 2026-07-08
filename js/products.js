/* ===== Product catalog (placeholder data — swap in real photos/copy later) ===== */

const GRADIENTS = [
  'linear-gradient(135deg, #f1e2b0, #c9a227)',
  'linear-gradient(135deg, #2b2b2b, #a5811a)',
  'linear-gradient(135deg, #c9a227, #6b5514)',
  'linear-gradient(135deg, #faf8f3, #e9d9a8)',
  'linear-gradient(135deg, #1a1a1a, #4a3d14)',
  'linear-gradient(135deg, #e9d9a8, #a5811a)',
];

const CLOTHING_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const SHOE_SIZES = ['6', '7', '8', '9', '10', '11'];
const ONE_SIZE = ['One Size'];

const PRODUCTS = [
  // Hoodies
  { id: 'p1', name: 'Classic Pullover Hoodie', category: 'Hoodies', price: 450, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Soft fleece hoodie with a relaxed fit — everyday drip without the logo tax.' },
  { id: 'p2', name: 'Oversized Zip Hoodie', category: 'Hoodies', price: 520, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Heavyweight zip-up built for layering, sized generous for that oversized look.' },
  { id: 'p3', name: 'Graphic Print Hoodie', category: 'Hoodies', price: 480, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Statement print hoodie — good quality, no branded price tag.' },
  { id: 'p4', name: 'Fleece-Lined Hoodie', category: 'Hoodies', price: 550, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Brushed fleece interior for the colder Mthatha mornings.' },

  // T-Shirts
  { id: 'p5', name: 'Essential Crew Tee', category: 'T-Shirts', price: 180, icon: '\u{1F455}', sizes: CLOTHING_SIZES, description: 'Breathable cotton tee, built for daily rotation.' },
  { id: 'p6', name: 'Ringer Tee', category: 'T-Shirts', price: 200, icon: '\u{1F455}', sizes: CLOTHING_SIZES, description: 'Contrast trim ringer tee — simple, stylish, everyday drip.' },
  { id: 'p7', name: 'Long Sleeve Tee', category: 'T-Shirts', price: 220, icon: '\u{1F455}', sizes: CLOTHING_SIZES, description: 'Layer-friendly long sleeve, good quality without paying for a logo.' },
  { id: 'p8', name: 'Oversized Boxy Tee', category: 'T-Shirts', price: 210, icon: '\u{1F455}', sizes: CLOTHING_SIZES, description: 'Boxy drop-shoulder fit for that relaxed streetwear look.' },
  { id: 'p9', name: 'Printed Statement Tee', category: 'T-Shirts', price: 230, icon: '\u{1F455}', sizes: CLOTHING_SIZES, description: 'Bold print tee that actually works for our lifestyle.' },

  // Tracksuits
  { id: 'p10', name: 'Two-Piece Tracksuit', category: 'Tracksuits', price: 650, icon: '\u{1F3BD}', sizes: CLOTHING_SIZES, description: 'Matching set for comfort on the move — style without stress.' },
  { id: 'p11', name: 'Slim Fit Joggers Set', category: 'Tracksuits', price: 600, icon: '\u{1F3BD}', sizes: CLOTHING_SIZES, description: 'Tapered fit set, dressed up or down with ease.' },
  { id: 'p12', name: 'Retro Stripe Tracksuit', category: 'Tracksuits', price: 680, icon: '\u{1F3BD}', sizes: CLOTHING_SIZES, description: 'Throwback stripe detailing on a modern relaxed cut.' },
  { id: 'p13', name: 'Fleece Jogger Set', category: 'Tracksuits', price: 580, icon: '\u{1F3BD}', sizes: CLOTHING_SIZES, description: 'All-day comfort fleece set for lounging or the taxi rank.' },

  // Jackets
  { id: 'p14', name: 'Denim Jacket', category: 'Jackets', price: 620, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Timeless denim layer, direct service, honest price.' },
  { id: 'p15', name: 'Bomber Jacket', category: 'Jackets', price: 590, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Ribbed collar bomber, good quality everyday drip.' },
  { id: 'p16', name: 'Windbreaker', category: 'Jackets', price: 480, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Lightweight shell for unpredictable Eastern Cape weather.' },
  { id: 'p17', name: 'Puffer Jacket', category: 'Jackets', price: 750, icon: '\u{1F9E5}', sizes: CLOTHING_SIZES, description: 'Quilted puffer for real warmth without the surprise markup.' },

  // Denim
  { id: 'p18', name: 'Straight Leg Jeans', category: 'Denim', price: 420, icon: '\u{1F456}', sizes: CLOTHING_SIZES, description: 'Everyday denim that actually fits your lifestyle.' },
  { id: 'p19', name: 'Slim Fit Jeans', category: 'Denim', price: 400, icon: '\u{1F456}', sizes: CLOTHING_SIZES, description: 'Clean tapered denim, good quality, honest price.' },
  { id: 'p20', name: 'Relaxed Fit Jeans', category: 'Denim', price: 430, icon: '\u{1F456}', sizes: CLOTHING_SIZES, description: 'Room to move, built for comfort all day.' },

  // Shorts
  { id: 'p21', name: 'Cargo Shorts', category: 'Shorts', price: 280, icon: '\u{1FA73}', sizes: CLOTHING_SIZES, description: 'Utility pockets, warm-weather staple, quality you can trust.' },
  { id: 'p22', name: 'Denim Shorts', category: 'Shorts', price: 260, icon: '\u{1FA73}', sizes: CLOTHING_SIZES, description: 'Classic cut-off style denim shorts for the summer rotation.' },
  { id: 'p23', name: 'Mesh Athletic Shorts', category: 'Shorts', price: 190, icon: '\u{1FA73}', sizes: CLOTHING_SIZES, description: 'Breathable mesh for training days or lazy Sundays.' },

  // Sneakers
  { id: 'p24', name: 'Classic Low-Top Sneakers', category: 'Sneakers', price: 680, icon: '\u{1F45F}', sizes: SHOE_SIZES, description: 'Everyday sneaker, sourced so you don’t have to search.' },
  { id: 'p25', name: 'Chunky Dad Sneakers', category: 'Sneakers', price: 780, icon: '\u{1F45F}', sizes: SHOE_SIZES, description: 'Bold chunky sole, good quality without paying for the logo.' },
  { id: 'p26', name: 'Canvas Slip-Ons', category: 'Sneakers', price: 450, icon: '\u{1F45F}', sizes: SHOE_SIZES, description: 'Easy on, easy off — comfort for daily errands.' },
  { id: 'p27', name: 'High-Top Sneakers', category: 'Sneakers', price: 720, icon: '\u{1F45F}', sizes: SHOE_SIZES, description: 'Ankle-cut sneaker with everyday durability.' },

  // Accessories
  { id: 'p28', name: 'Snapback Cap', category: 'Accessories', price: 150, icon: '\u{1F9E2}', sizes: ONE_SIZE, description: 'Finish the fit — small details, big drip.' },
  { id: 'p29', name: 'Bucket Hat', category: 'Accessories', price: 160, icon: '\u{1F452}', sizes: ONE_SIZE, description: 'Sun-ready bucket hat, stylish and practical.' },
  { id: 'p30', name: 'Crossbody Bag', category: 'Accessories', price: 320, icon: '\u{1F392}', sizes: ONE_SIZE, description: 'Compact crossbody for essentials on the go.' },
  { id: 'p31', name: 'Beanie', category: 'Accessories', price: 130, icon: '\u{1F9F6}', sizes: ONE_SIZE, description: 'Warm knit beanie for the cold months.' },
  { id: 'p32', name: 'Ankle Socks 3-Pack', category: 'Accessories', price: 120, icon: '\u{1F9E6}', sizes: ONE_SIZE, description: 'Everyday comfort, sold as a 3-pack.' },
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
