// ================= DATA =================
const productsData = [
    { id: 1, name: "Latte", price: 500, image: "photo/product -2.jpg", category: "coffee", description: "Smooth espresso with steamed milk", tags: ["hot", "milk", "popular"] },
    { id: 2, name: "Mocha", price: 550, image: "photo/product 1.png", category: "coffee", description: "Rich chocolate coffee delight", tags: ["hot", "chocolate", "sweet"] },
    { id: 3, name: "Americano", price: 400, image: "photo/product 3.png", category: "coffee", description: "Strong black coffee", tags: ["hot", "black", "strong"] },
    { id: 4, name: "Cappuccino", price: 450, image: "photo/product new 1.png", category: "coffee", description: "Espresso with frothy milk", tags: ["hot", "frothy", "classic"] },
    { id: 5, name: "Espresso", price: 350, image: "photo/product-4.jpg", category: "coffee", description: "Pure concentrated coffee", tags: ["hot", "strong", "pure"] },
    { id: 6, name: "Iced Coffee", price: 450, image: "photo/produt new.png", category: "coffee", description: "Chilled coffee with ice", tags: ["cold", "refreshing", "summer"] }
];

const menuData = [
    { id: 1, name: "Espresso", description: "Strong & rich coffee shot", price: 350, image: "photo/menu-1.jpg", category: "hot", tags: ["espresso", "strong", "black"] },
    { id: 2, name: "Cappuccino", description: "Espresso with milk foam", price: 450, image: "photo/menu-2.jpg", category: "hot", tags: ["cappuccino", "frothy", "milky"] },
    { id: 3, name: "Latte", description: "Milk & smooth espresso", price: 500, image: "photo/menu-3.jpg", category: "hot", tags: ["latte", "smooth", "creamy"] },
    { id: 4, name: "Mocha", description: "Chocolate flavored coffee", price: 550, image: "photo/menu-5.jpg", category: "hot", tags: ["mocha", "chocolate", "sweet"] },
    { id: 5, name: "Iced Latte", description: "Chilled latte with ice", price: 550, image: "photo/menu-6.jpg", category: "cold", tags: ["iced", "latte", "cold"] },
    { id: 6, name: "Caramel Macchiato", description: "Sweet caramel delight", price: 600, image: "photo/blog-3.jpg", category: "hot", tags: ["caramel", "sweet", "macchiato"] },
    { id: 7, name: "Croissant", description: "Freshly baked butter croissant", price: 300, image: "photo/gallery-1.jpg", category: "pastry", tags: ["croissant", "pastry", "breakfast"] },
    { id: 8, name: "Chocolate Cake", description: "Rich chocolate cake slice", price: 450, image: "photo/gallery-2.jpg", category: "pastry", tags: ["cake", "chocolate", "dessert"] }
];

const testimonialsData = [
    { id: 1, name: "Kamal", text: "Loved the French roast. Perfectly balanced and rich. Will order again!", image: "photo/pic 1.jpg" },
    { id: 2, name: "Amila Shehan", text: "Best coffee in town! The atmosphere and service are amazing.", image: "photo/pic 2.jpg" },
    { id: 3, name: "Amila Udana", text: "Their iced coffee is perfect for Sri Lankan weather. Highly recommended!", image: "photo/pic 3.jpg" },
    { id: 4, name: "Sawani Dulmini", text: "The staff is friendly and the coffee is always fresh. My favorite spot!", image: "photo/user-1.jpg" },
    { id: 5, name: "Ishara Niroshan", text: "Perfect place to work and enjoy great coffee. WiFi is fast too!", image: "photo/user-2.jpg" },
    { id: 6, name: "Anjalika Kethmini", text: "The mocha here is to die for! Can't get enough of it.", image: "photo/user-4.jpg" },
    { id: 7, name: "Chamudi Hansika", text: "Consistently great quality. Been coming here for years!", image: "photo/pic -3.jpg" }
];

const galleryData = [
    { id: 1, image: "photo/gallery-6.jpg", category: "shop", title: "Coffee Shop Interior" },
    { id: 2, image: "photo/gallery-1.jpg", category: "coffee", title: "Latte Art" },
    { id: 3, image: "photo/gallery-2.jpg", category: "pastry", title: "Fresh Pastries" },
    { id: 4, image: "photo/gallery-3.jpg", category: "customers", title: "Happy Customers" },
    { id: 5, image: "photo/gallery-4.jpg", category: "coffee", title: "Coffee Beans" },
    { id: 6, image: "photo/gallery-5.jpg", category: "shop", title: "Cozy Corner" }
];

// ================= STATE MANAGEMENT =================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentTheme = localStorage.getItem('theme') || 'light';
let activeMenuFilter = 'all';
let activeGalleryFilter = 'all';

// ================= DOM ELEMENTS =================
const themeToggle = document.getElementById('theme-toggle');
const searchIcon = document.getElementById('search-icon');
const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const paymentModal = document.getElementById('payment-modal');
const closePayment = document.querySelector('.close-payment');
const confirmPayment = document.getElementById('confirm-payment');
const paymentSummary = document.getElementById('payment-summary');
const paymentTotal = document.getElementById('payment-total');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');
const menuContainer = document.querySelector('.menu-container');
const galleryContainer = document.querySelector('.gallery-container');
const menuFilters = document.querySelectorAll('.filter-btn');
const galleryFilters = document.querySelectorAll('.gallery-filter');

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Load all sections
    loadProducts();
    loadMenu();
    loadTestimonials();
    loadGallery();
    
    // Initialize cart
    updateCart();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup search functionality
    setupSearch();
    
    // Setup menu filtering
    setupMenuFiltering();
    
    // Setup gallery filtering
    setupGalleryFiltering();
});

// ================= THEME MANAGEMENT =================
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle position based on theme
    const toggleBall = document.querySelector('.toggle-ball');
    if (currentTheme === 'dark') {
        toggleBall.style.transform = 'translateX(30px)';
        document.querySelector('.fa-moon').style.opacity = '1';
        document.querySelector('.fa-sun').style.opacity = '0';
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Update toggle animation
    const toggleBall = document.querySelector('.toggle-ball');
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');
    
    if (currentTheme === 'dark') {
        toggleBall.style.transform = 'translateX(30px)';
        moonIcon.style.opacity = '1';
        sunIcon.style.opacity = '0';
    } else {
        toggleBall.style.transform = 'translateX(0)';
        moonIcon.style.opacity = '0';
        sunIcon.style.opacity = '1';
    }
    
    // Show theme change notification
    showNotification(`Switched to ${currentTheme} mode`);
}

// ================= SEARCH FUNCTIONALITY =================
function setupSearch() {
    let searchTimeout;
    
    // Toggle search box
    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
            createSearchOverlay();
        } else {
            removeSearchOverlay();
            clearSearchResults();
        }
    });
    
    // Search input handling
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.trim().toLowerCase();
            if (searchTerm.length > 0) {
                performSearch(searchTerm);
            } else {
                clearSearchResults();
            }
        }, 300);
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm.length > 0) {
                performSearch(searchTerm);
            }
        }
    });
    
    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && e.target !== searchIcon) {
            searchBox.classList.remove('active');
            removeSearchOverlay();
            clearSearchResults();
        }
    });
}

function createSearchOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay active';
    overlay.id = 'search-overlay';
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', () => {
        searchBox.classList.remove('active');
        removeSearchOverlay();
        clearSearchResults();
    });
}

function removeSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function performSearch(searchTerm) {
    const allItems = [...productsData, ...menuData];
    const searchResultsData = allItems.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm);
        const descMatch = item.description?.toLowerCase().includes(searchTerm);
        const categoryMatch = item.category?.toLowerCase().includes(searchTerm);
        const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
        
        return nameMatch || descMatch || categoryMatch || tagMatch;
    });
    
    displaySearchResults(searchResultsData, searchTerm);
}

function displaySearchResults(results, searchTerm) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
                <p>No results found for "${searchTerm}"</p>
                <p style="font-size: 0.8rem; margin-top: 5px;">Try different keywords</p>
            </div>
        `;
        return;
    }
    
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="search-result-info">
                <div class="search-result-title">${item.name}</div>
                <div class="search-result-category">${item.category}</div>
            </div>
            <div class="search-result-price">Rs. ${item.price}</div>
        `;
        
        resultItem.addEventListener('click', () => {
            // Add to cart when clicked
            addToCart({
                ...item,
                type: menuData.some(m => m.id === item.id) ? 'menu' : 'product'
            });
            
            // Show notification
            showNotification(`${item.name} added to cart!`);
            
            // Close search
            searchBox.classList.remove('active');
            removeSearchOverlay();
            clearSearchResults();
            searchInput.value = '';
        });
        
        searchResults.appendChild(resultItem);
    });
}

function clearSearchResults() {
    searchResults.innerHTML = '';
}

// ================= CART FUNCTIONALITY =================
function addToCart(item) {
    const existingItem = cart.find(cartItem => 
        cartItem.id === item.id && cartItem.type === item.type
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${item.name} added to cart!`);
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart display
    renderCartItems();
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rs. ${total}`;
}

function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">Rs. ${item.price}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn decrease" data-id="${item.id}" data-type="${item.type}">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}" data-type="${item.type}">+</button>
                <button class="remove-item" data-id="${item.id}" data-type="${item.type}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to cart controls
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function decreaseQuantity(event) {
    const button = event.currentTarget;
    const id = parseInt(button.getAttribute('data-id'));
    const type = button.getAttribute('data-type');
    
    const item = cart.find(item => item.id === id && item.type === type);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
        showNotification(`Decreased ${item.name} quantity`);
    }
}

function increaseQuantity(event) {
    const button = event.currentTarget;
    const id = parseInt(button.getAttribute('data-id'));
    const type = button.getAttribute('data-type');
    
    const item = cart.find(item => item.id === id && item.type === type);
    if (item) {
        item.quantity += 1;
        updateCart();
        showNotification(`Increased ${item.name} quantity`);
    }
}

function removeFromCart(event) {
    const button = event.currentTarget;
    const id = parseInt(button.getAttribute('data-id'));
    const type = button.getAttribute('data-type');
    
    const item = cart.find(item => item.id === id && item.type === type);
    cart = cart.filter(item => !(item.id === id && item.type === type));
    updateCart();
    
    if (item) {
        showNotification(`${item.name} removed from cart`);
    }
}

// ================= MENU FILTERING =================
function setupMenuFiltering() {
    menuFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active filter
            menuFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter menu items
            activeMenuFilter = filter.getAttribute('data-filter');
            filterMenuItems();
        });
    });
}

function filterMenuItems() {
    const filteredItems = activeMenuFilter === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === activeMenuFilter);
    
    displayMenuItems(filteredItems);
}

function displayMenuItems(items) {
    menuContainer.innerHTML = '';
    
    items.forEach(item => {
        const menuCard = document.createElement('div');
        menuCard.className = 'menu-card';
        menuCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-price">
                    <span>Rs. ${item.price}</span>
                    <button class="btn add-to-cart" data-id="${item.id}" data-type="menu">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuCard);
    });
    
    // Add cart event listeners to new buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(button.getAttribute('data-id'));
            const type = button.getAttribute('data-type');
            const item = menuData.find(m => m.id === id);
            
            if (item) {
                addToCart({ ...item, type });
            }
        });
    });
}

// ================= GALLERY FILTERING =================
function setupGalleryFiltering() {
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active filter
            galleryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter gallery items
            activeGalleryFilter = filter.getAttribute('data-filter');
            filterGalleryItems();
        });
    });
}

function filterGalleryItems() {
    const filteredItems = activeGalleryFilter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === activeGalleryFilter);
    
    displayGalleryItems(filteredItems);
}

function displayGalleryItems(items) {
    galleryContainer.innerHTML = '';
    
    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-overlay">
                <span>${item.title}</span>
            </div>
        `;
        galleryContainer.appendChild(galleryItem);
    });
}

// ================= PAYMENT FUNCTIONALITY =================
function openPaymentModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    paymentSummary.innerHTML = '';
    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>Rs. ${item.price * item.quantity}</span>
        `;
        paymentSummary.appendChild(summaryItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    paymentTotal.textContent = `Rs. ${total}`;
    
    paymentModal.classList.add('active');
}

function confirmPaymentProcess() {
    // Simulate payment processing
    showNotification('Processing payment...', 'info');
    
    setTimeout(() => {
        showNotification('Payment Successful! Thank you for your order.', 'success');
        
        // Clear cart
        cart = [];
        updateCart();
        
        // Close modals
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        paymentModal.classList.remove('active');
        
        // Show success animation
        showSuccessAnimation();
    }, 2000);
}

// ================= NOTIFICATION SYSTEM =================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        font-size: 0.95rem;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Add animation keyframes
    if (!document.getElementById('notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ================= SUCCESS ANIMATION =================
function showSuccessAnimation() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-animation';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Order Confirmed!</h3>
            <p>Thank you for your purchase. We'll prepare your order immediately.</p>
        </div>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2001;
        animation: fadeIn 0.3s ease;
    `;
    
    const successContent = successDiv.querySelector('.success-content');
    successContent.style.cssText = `
        background: var(--card-bg);
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: scaleIn 0.5s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
    
    // Add animation keyframes
    if (!document.getElementById('success-animations')) {
        const style = document.createElement('style');
        style.id = 'success-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            .success-content i {
                font-size: 4rem;
                color: #4CAF50;
                margin-bottom: 20px;
            }
            .success-content h3 {
                color: var(--text);
                margin-bottom: 10px;
                font-size: 1.5rem;
            }
            .success-content p {
                color: var(--text-secondary);
                line-height: 1.6;
            }
        `;
        document.head.appendChild(style);
    }
}

// ================= LOAD DATA FUNCTIONS =================
function loadProducts() {
    const slider = document.getElementById('slider');
    slider.innerHTML = '';
    
    productsData.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">Rs. ${product.price}</p>
            <button class="btn add-to-cart" data-id="${product.id}" data-type="product">
                Add to Cart
            </button>
        `;
        slider.appendChild(productCard);
    });
    
    // Add cart event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(button.getAttribute('data-id'));
            const type = button.getAttribute('data-type');
            const item = productsData.find(p => p.id === id);
            
            if (item) {
                addToCart({ ...item, type });
            }
        });
    });
}

function loadMenu() {
    filterMenuItems();
}

function loadTestimonials() {
    const container = document.getElementById('testimonial-container');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    container.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    testimonialsData.forEach((testimonial, index) => {
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        slide.innerHTML = `
            <div class="testimonial-content">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <h4 class="testimonial-name">${testimonial.name}</h4>
            </div>
        `;
        container.appendChild(slide);
        
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    setupTestimonialSlider();
}

function loadGallery() {
    filterGalleryItems();
}

// ================= TESTIMONIAL SLIDER =================
function setupTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].style.display = 'block';
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function goToTestimonial(index) {
        showSlide(index);
        resetInterval();
    }
    
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Initialize
    showSlide(0);
    startInterval();
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startInterval();
    });
}

// ================= PRODUCT SLIDER =================
function slideLeft() {
    const slider = document.getElementById('slider');
    slider.scrollLeft -= 300;
}

function slideRight() {
    const slider = document.getElementById('slider');
    slider.scrollLeft += 300;
}

// ================= MOBILE MENU =================
function setupMobileMenu() {
    mobileMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });
}

// ================= EVENT LISTENERS =================
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu
    setupMobileMenu();
    
    // Cart functionality
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    
    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    
    // Checkout and payment
    checkoutBtn.addEventListener('click', openPaymentModal);
    closePayment.addEventListener('click', () => {
        paymentModal.classList.remove('active');
    });
    
    confirmPayment.addEventListener('click', confirmPaymentProcess);
    
    // Payment method selection
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-details').forEach(section => {
                section.classList.remove('active');
            });
            
            const detailsId = this.value + '-details';
            const detailsSection = document.getElementById(detailsId);
            if (detailsSection) {
                detailsSection.classList.add('active');
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Newsletter subscription
    const subscribeBtn = document.getElementById('subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navbar.classList.remove('active');
            }
        });
    });
    
    // Add CSS for additional styles
    addCustomStyles();
}

// ================= HELPER FUNCTIONS =================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .description {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 10px;
            line-height: 1.4;
        }
        
        .gallery-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: white;
            padding: 20px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
        
        .product-card .description {
            min-height: 40px;
        }
    `;
    document.head.appendChild(style);
}

// ================= AUTO-SCROLL FOR PRODUCT SLIDER =================
function setupProductAutoScroll() {
    const slider = document.getElementById('slider');
    let isScrolling = true;
    let scrollSpeed = 1;
    
    function autoScroll() {
        if (!isScrolling || !slider) return;
        
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
            slider.scrollLeft = 0;
        } else {
            slider.scrollLeft += scrollSpeed;
        }
    }
    
    let scrollInterval = setInterval(autoScroll, 30);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        isScrolling = false;
    });
    
    slider.addEventListener('mouseleave', () => {
        isScrolling = true;
    });
}

// Initialize auto-scroll after page load
window.addEventListener('load', () => {
    setTimeout(setupProductAutoScroll, 3000);
});

// ================= WELCOME MESSAGE =================
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!localStorage.getItem('welcomeShown')) {
            showNotification('Welcome to Drew Coffee Shop! Enjoy your visit ☕');
            localStorage.setItem('welcomeShown', 'true');
        }
    }, 1000);
});