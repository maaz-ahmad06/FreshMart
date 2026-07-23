// ==========================================================================
// ONLINE GROCERY STORE - JAVASCRIPTLOGIC
// ==========================================================================

// --- PRODUCT DATA ---
const PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Fresh Red Apples',
    category: 'fruits-veg',
    price: 4.99,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 120,
    unit: 'kg',
    badge: 'Fresh',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-2',
    title: 'Organic Whole Milk',
    category: 'dairy',
    price: 3.49,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 88,
    unit: 'bottle',
    badge: 'Organic',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-3',
    title: 'Sourdough Sliced Bread',
    category: 'bakery',
    price: 4.29,
    oldPrice: 5.29,
    rating: 4.7,
    reviewsCount: 65,
    unit: 'loaf',
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-4',
    title: 'Fresh Atlantic Salmon Fillet',
    category: 'meat',
    price: 14.99,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 142,
    unit: '500g',
    badge: 'Fresh',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-5',
    title: 'Organic Sweet Bananas',
    category: 'fruits-veg',
    price: 2.29,
    oldPrice: null,
    rating: 4.6,
    reviewsCount: 210,
    unit: 'kg',
    badge: null,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-6',
    title: 'Fresh Strawberries Clamshell',
    category: 'fruits-veg',
    price: 5.99,
    oldPrice: 7.49,
    rating: 4.8,
    reviewsCount: 94,
    unit: 'pack',
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-7',
    title: 'Cold Pressed Orange Juice',
    category: 'beverages',
    price: 3.99,
    oldPrice: null,
    rating: 4.5,
    reviewsCount: 76,
    unit: 'L',
    badge: null,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-8',
    title: 'Crunchy Salted Tortilla Chips',
    category: 'snacks',
    price: 2.99,
    oldPrice: null,
    rating: 4.4,
    reviewsCount: 52,
    unit: 'pack',
    badge: null,
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527b0f76?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-9',
    title: 'Premium Angus Ribeye Steak',
    category: 'meat',
    price: 18.49,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 83,
    unit: '500g',
    badge: 'Organic',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-10',
    title: 'Authentic Greek Yogurt Tub',
    category: 'dairy',
    price: 3.89,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 110,
    unit: '500g',
    badge: 'Fresh',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-11',
    title: 'Double Chocolate Chip Cookies',
    category: 'bakery',
    price: 4.50,
    oldPrice: null,
    rating: 4.7,
    reviewsCount: 44,
    unit: 'pack',
    badge: null,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-12',
    title: 'Artisanal Craft Ginger Beer',
    category: 'beverages',
    price: 6.49,
    oldPrice: 7.99,
    rating: 4.6,
    reviewsCount: 39,
    unit: '4-pack',
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80'
  }
];

// --- APP STATE ---
let cart = [];
let currentCategoryFilter = 'all';
let searchKeyword = '';
let sortBy = 'default';
let activePromo = null;

// --- INITIALIZE PAGE ---
document.addEventListener('DOMContentLoaded', () => {
  // 1. Loader screen (closes after 2.5 seconds)
  const loader = document.getElementById('loader-wrapper');
  setTimeout(() => {
    if (loader) {
      loader.classList.add('fade-out');
      // Completely remove after animation finished
      setTimeout(() => {
        loader.style.display = 'none';
      }, 600);
    }
  }, 2500);

  // 2. Load and render default view items
  renderProducts();

  // 3. Set up event listeners
  setupEventListeners();

  // 4. Start Countdown
  startCountdownTimer();

  // 5. Setup Carousel
  initCarousel();

  // 6. Scroll Reveal Observer
  initScrollReveal();
});

// --- RENDER PRODUCTS GRID ---
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  // Filter products based on search keyword and category
  let filtered = PRODUCTS.filter(prod => {
    const matchesCategory = currentCategoryFilter === 'all' || prod.category === currentCategoryFilter;
    const matchesSearch = prod.title.toLowerCase().includes(searchKeyword.toLowerCase()) || 
                          prod.category.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Display status banner for searches
  const banner = document.getElementById('search-status-banner');
  const kwDisplay = document.getElementById('search-keyword-display');
  const countDisplay = document.getElementById('search-count-display');
  
  if (searchKeyword && banner) {
    banner.classList.remove('hidden');
    kwDisplay.textContent = searchKeyword;
    countDisplay.textContent = filtered.length;
  } else if (banner) {
    banner.classList.add('hidden');
  }

  // Reset HTML grid view
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px;">
        <i class="fa-solid fa-magnifying-glass-minus" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 16px;"></i>
        <h3 style="margin-bottom: 8px;">No Groceries Found</h3>
        <p style="color: var(--text-muted);">We couldn't find anything matching your filters. Try resetting search.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    // Generate Rating stars markup
    let starsHtml = '';
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHtml += `<i class="fa-solid fa-star"></i>`;
      } else if (i === fullStars + 1 && hasHalf) {
        starsHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;
      } else {
        starsHtml += `<i class="fa-regular fa-star"></i>`;
      }
    }

    // Badge styling
    let badgeHtml = '';
    if (product.badge) {
      badgeHtml = `<span class="badge-tag ${product.badge.toLowerCase()}">${product.badge}</span>`;
    }

    // Sale price rendering
    let priceHtml = `<span class="curr-price">$${product.price.toFixed(2)}</span>`;
    if (product.oldPrice) {
      priceHtml = `
        <span class="curr-price">$${product.price.toFixed(2)}</span>
        <span class="old-price-val">$${product.oldPrice.toFixed(2)}</span>
      `;
    }

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-badges">
        ${badgeHtml}
      </div>
      <button class="wishlist-btn-card" onclick="toggleWishlist(this)" aria-label="Add to Wishlist">
        <i class="fa-solid fa-heart"></i>
      </button>
      <div class="product-img-container">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
      </div>
      <span class="product-info-cat">${product.category.replace('-', ' & ')}</span>
      <h3 class="product-title">${product.title}</h3>
      <div class="product-rating">
        ${starsHtml}
        <span>(${product.reviewsCount})</span>
      </div>
      <div class="product-footer">
        <div class="product-price">
          ${priceHtml}
          <span class="product-unit">/ ${product.unit}</span>
        </div>
        <button class="add-to-cart-card" onclick="addToCart('${product.id}')" aria-label="Add ${product.title} to bag">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// --- EVENT LISTENERS REGISTRATION ---
function setupEventListeners() {
  // Sticky navigation behavior on scroll
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    // Highlight menu links on scroll
    highlightNavOnScroll();
  });

  // Mobile Menu toggles
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close menus on nav links clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Manage active UI states
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (navMenu && menuToggle) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });

  // Mobile search dropdown toggle
  const searchTrigger = document.getElementById('search-trigger');
  const searchDropdown = document.getElementById('mobile-search-dropdown');
  if (searchTrigger && searchDropdown) {
    searchTrigger.addEventListener('click', () => {
      searchDropdown.classList.toggle('active');
    });
  }

  // Desktop Search inputs
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value;
      renderProducts();
    });
  }

  // Mobile navigation input searches
  const searchMobileInput = document.getElementById('search-input-mobile');
  if (searchMobileInput) {
    searchMobileInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value;
      renderProducts();
    });
  }

  // Dropdown search inputs
  const searchDropdownInput = document.getElementById('search-input-dropdown');
  if (searchDropdownInput) {
    searchDropdownInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value;
      renderProducts();
    });
  }

  // Clear search results banner action
  const resetBtn = document.getElementById('clear-search-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      searchKeyword = '';
      if (searchInput) searchInput.value = '';
      if (searchMobileInput) searchMobileInput.value = '';
      if (searchDropdownInput) searchDropdownInput.value = '';
      renderProducts();
    });
  }

  // Categories grid cards filtering
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category');
      setCategoryFilter(cat);
    });
  });

  // Filter Buttons filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      currentCategoryFilter = filter;
      renderProducts();
    });
  });

  // Sorting
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderProducts();
    });
  }

  // Cart drawer slide toggles
  const cartTrigger = document.getElementById('cart-trigger');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');

  const openDrawer = () => {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
  };

  const closeDrawer = () => {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
  };

  if (cartTrigger) cartTrigger.addEventListener('click', openDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeDrawer);

  // Close cart drawer clicking on start shopping action
  document.querySelectorAll('.close-cart-drawer-action').forEach(btn => {
    btn.addEventListener('click', closeDrawer);
  });
}

// --- CATEGORY FILTER UTILITY ---
function setCategoryFilter(category) {
  currentCategoryFilter = category;
  
  // Highlight active filter button in UI
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
}

// --- NAV MENU HIGHLIGHT ON SCROLL ---
function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 200; // Offset for header height

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPosition >= top && scrollPosition < top + height) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// --- WISHLIST TOGGLE ---
function toggleWishlist(element) {
  element.classList.toggle('active');
  const isWishlisted = element.classList.contains('active');
  
  // Dynamic update header wishlist badge
  const badge = document.querySelector('.wishlist-btn .badge');
  if (badge) {
    let count = parseInt(badge.textContent);
    count = isWishlisted ? count + 1 : count - 1;
    badge.textContent = Math.max(0, count);
  }

  showToast(isWishlisted ? 'Added to wishlist!' : 'Removed from wishlist', 'info');
}

// --- CART STATE MANAGEMENT ---
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Check if item already exists in cart
  const existing = cart.find(item => item.product.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      product: product,
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`"${product.title}" added to bag!`, 'success');
}

function updateCartQuantity(productId, delta) {
  const item = cart.find(i => i.product.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.product.id !== productId);
  }

  updateCartUI();
}

function removeCartItem(productId) {
  const item = cart.find(i => i.product.id === productId);
  if (!item) return;

  cart = cart.filter(i => i.product.id !== productId);
  updateCartUI();
  showToast(`"${item.product.title}" removed.`, 'warning');
}

function updateCartUI() {
  // Update header cart badge counts
  const badges = document.querySelectorAll('.cart-count');
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  badges.forEach(b => b.textContent = totalItems);

  // Toggle empty/full states inside drawer
  const emptyMsg = document.getElementById('empty-cart-message');
  const itemsList = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-drawer-footer');

  if (cart.length === 0) {
    if (emptyMsg) emptyMsg.classList.remove('hidden');
    if (itemsList) itemsList.classList.add('hidden');
    if (footer) footer.classList.add('hidden');
    return;
  }

  if (emptyMsg) emptyMsg.classList.add('hidden');
  if (itemsList) itemsList.classList.remove('hidden');
  if (footer) footer.classList.remove('hidden');

  // Render items list inside drawer
  itemsList.innerHTML = '';
  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.product.image}" alt="${item.product.title}">
      </div>
      <div class="cart-item-info">
        <h4>${item.product.title}</h4>
        <div class="cart-item-pricing">
          <span class="cart-item-price">$${(item.product.price * item.quantity).toFixed(2)}</span>
          <span class="cart-item-unit">$${item.product.price.toFixed(2)} / ${item.product.unit}</span>
        </div>
        <div class="cart-quantity-controls">
          <button class="qty-btn" onclick="updateCartQuantity('${item.product.id}', -1)" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity('${item.product.id}', 1)" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
      <button class="remove-item-btn" onclick="removeCartItem('${item.product.id}')" aria-label="Remove item">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    itemsList.appendChild(itemEl);
  });

  // Calculate pricing subtotals
  calculateCartTotals();
}

function calculateCartTotals() {
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const delivery = subtotal > 35 ? 0.00 : 3.99; // Free delivery over $35
  
  let discount = 0.00;
  if (activePromo === 'FRESH20') {
    discount = subtotal * 0.20; // 20% discount coupon
  }

  const grandTotal = Math.max(0, subtotal + delivery - discount);

  // Update UI Elements
  document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  
  const delEl = document.getElementById('cart-delivery');
  delEl.textContent = delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`;
  if (delivery === 0) {
    delEl.style.color = 'var(--success)';
    delEl.style.fontWeight = '700';
  } else {
    delEl.style.color = 'inherit';
    delEl.style.fontWeight = 'inherit';
  }

  const discRow = document.getElementById('discount-row');
  const discEl = document.getElementById('cart-discount');
  if (discount > 0) {
    discRow.classList.remove('hidden');
    discEl.textContent = `-$${discount.toFixed(2)}`;
  } else {
    discRow.classList.add('hidden');
  }

  document.getElementById('cart-grand-total').textContent = `$${grandTotal.toFixed(2)}`;
}

// --- APPLY PROMO CODE ---
function applyPromoCode() {
  const input = document.getElementById('promo-input');
  const msg = document.getElementById('promo-feedback');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();

  if (code === 'FRESH20') {
    activePromo = 'FRESH20';
    msg.textContent = 'Coupon Applied: 20% Off Successful!';
    msg.className = 'promo-feedback-msg success-msg';
    calculateCartTotals();
    showToast('Promo FRESH20 applied!', 'success');
  } else if (code === '') {
    msg.textContent = '';
    activePromo = null;
    calculateCartTotals();
  } else {
    msg.textContent = 'Invalid promo code. Try "FRESH20".';
    msg.className = 'promo-feedback-msg error-msg';
    activePromo = null;
    calculateCartTotals();
  }
}

// --- MOCK CHECKOUT MODAL ACTIONS ---
function openCheckoutModal() {
  const modalOverlay = document.getElementById('checkout-modal-overlay');
  if (!modalOverlay) return;

  // Set checkout summary items inside modal
  const grandTotalText = document.getElementById('cart-grand-total').textContent;
  
  document.getElementById('modal-total-paid').textContent = grandTotalText;
  document.getElementById('modal-order-id').textContent = `#FM-${Math.floor(100000 + Math.random() * 900000)}`;

  // Open overlay
  modalOverlay.classList.add('active');

  // Close cart drawer
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  if (cartDrawer) cartDrawer.classList.remove('active');
  if (cartOverlay) cartOverlay.classList.remove('active');
}

function closeCheckoutModal() {
  const modalOverlay = document.getElementById('checkout-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }

  // Clear Cart items on mock checkout success
  cart = [];
  activePromo = null;
  
  const promoInput = document.getElementById('promo-input');
  const promoMsg = document.getElementById('promo-feedback');
  if (promoInput) promoInput.value = '';
  if (promoMsg) promoMsg.textContent = '';

  updateCartUI();
}

function triggerPromoBuy() {
  // Simulates placing promotion item to cart
  const promoProduct = {
    id: 'deal-orange',
    title: 'Organic Blood Oranges',
    category: 'fruits-veg',
    price: 4.89,
    oldPrice: 6.99,
    rating: 4.9,
    reviewsCount: 15,
    unit: 'kg',
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=400&q=80'
  };

  // Add temporary deal product to registry if not already there
  const exists = PRODUCTS.find(p => p.id === promoProduct.id);
  if (!exists) {
    PRODUCTS.push(promoProduct);
  }

  addToCart(promoProduct.id);
}

// --- NEWSLETTER SUBSCRIPTION INTERACTION ---
function triggerNewsletterSub() {
  const input = document.getElementById('newsletter-email');
  if (!input) return;

  showToast(`Subscribed successfully with: ${input.value}`, 'success');
  input.value = '';
}

// --- COUNTDOWN TIMER ---
function startCountdownTimer() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Let's set countdown destination to 2 days from current time
  const destinationDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

  const updateClock = () => {
    const now = new Date().getTime();
    const diff = destinationDate - now;

    if (diff <= 0) {
      // Loop it again
      startCountdownTimer();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  };

  updateClock();
  setInterval(updateClock, 1000);
}

// --- TOAST NOTIFICATIONS UTILITY ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconClass = 'fa-solid fa-circle-check';
  if (type === 'info') iconClass = 'fa-solid fa-circle-info';
  if (type === 'warning') iconClass = 'fa-solid fa-circle-exclamation';

  toast.innerHTML = `
    <i class="${iconClass} toast-icon ${type}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Animate toast deletion
  setTimeout(() => {
    toast.classList.add('toast-remove');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// --- TESTIMONIALS CAROUSEL ---
function initCarousel() {
  const track = document.getElementById('reviews-track');
  const slides = document.querySelectorAll('.review-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');

  if (!track || slides.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

  let currentSlideIndex = 0;
  const slideCount = slides.length;

  // Generate dots dynamically
  dotsContainer.innerHTML = '';
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  }

  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  const goToSlide = (index) => {
    currentSlideIndex = index;
    // Bounds wrapping
    if (currentSlideIndex < 0) currentSlideIndex = slideCount - 1;
    if (currentSlideIndex >= slideCount) currentSlideIndex = 0;

    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    updateDots();
  };

  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlideIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlideIndex + 1);
  });

  // Automatic slide transitions (every 6 seconds)
  let autoTimer = setInterval(() => {
    goToSlide(currentSlideIndex + 1);
  }, 6000);

  // Reset timer on manual button clicks
  const resetAutoPlayTimer = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      goToSlide(currentSlideIndex + 1);
    }, 6000);
  };

  prevBtn.addEventListener('click', resetAutoPlayTimer);
  nextBtn.addEventListener('click', resetAutoPlayTimer);
  dotsContainer.addEventListener('click', resetAutoPlayTimer);
}

// --- SCROLL REVEAL IMPLEMENTATION ---
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after showing so we don't repeat the animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
