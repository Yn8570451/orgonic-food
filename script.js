// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 85; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlight
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll event listener
    window.addEventListener('scroll', highlightActiveNav);
    
    // Header background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#fff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.menu-card, .gallery-item, .testimonial-card, .team-member');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Form handling
    const orderForm = document.querySelector('.order form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            // Get all form inputs
            const inputs = this.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                formValues[input.placeholder] = input.value;
            });
            
            // Simple validation
            let isValid = true;
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('سفارش شما با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.', 'success');
                
                // Reset form
                this.reset();
                
                // Simulate form submission
                console.log('Form submitted:', formValues);
            } else {
                showNotification('لطفاً تمام فیلدهای مورد نیاز را پر کنید.', 'error');
            }
        });
    }
    
    // Notification system
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            margin-right: 10px;
            cursor: pointer;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Menu card order buttons
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.menu-card');
            const foodName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            // Auto-fill order form
            const orderSection = document.querySelector('#order');
            const foodNameInput = orderSection.querySelector('input[placeholder="نام غذا"]');
            
            if (foodNameInput) {
                foodNameInput.value = foodName;
            }
            
            // Scroll to order section
            const offsetTop = orderSection.offsetTop - 85;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            showNotification(`${foodName} به فرم سفارش اضافه شد!`, 'success');
        });
    });
    
    // Gallery item order buttons
    const galleryButtons = document.querySelectorAll('.gallery-btn');
    galleryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.gallery-item');
            const foodName = item.querySelector('h3').textContent;
            
            // Auto-fill order form
            const orderSection = document.querySelector('#order');
            const foodNameInput = orderSection.querySelector('input[placeholder="نام غذا"]');
            
            if (foodNameInput) {
                foodNameInput.value = foodName;
            }
            
            // Scroll to order section
            const offsetTop = orderSection.offsetTop - 85;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            showNotification(`${foodName} به فرم سفارش اضافه شد!`, 'success');
        });
    });
    
    // Hero CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const orderSection = document.querySelector('#order');
            const offsetTop = orderSection.offsetTop - 85;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    }
    
    // Add loading animation delay for staggered effect
    function staggerAnimation() {
        const menuCards = document.querySelectorAll('.menu-card');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        menuCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
        
        testimonialCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    staggerAnimation();
    
    // Counter animation for stats (if you want to add stats)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }
    
    // Search functionality (basic)
    const searchIcon = document.querySelector('.nav-icons .fa-search');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            const searchTerm = prompt('جستجو در منوها:');
            if (searchTerm) {
                searchInMenu(searchTerm);
            }
        });
    }
    
    function searchInMenu(term) {
        const menuCards = document.querySelectorAll('.menu-card');
        const menuSection = document.querySelector('#menu');
        let found = false;
        
        menuCards.forEach(card => {
            const foodName = card.querySelector('h3').textContent.toLowerCase();
            if (foodName.includes(term.toLowerCase())) {
                card.style.display = 'block';
                card.style.border = '3px solid #f4a261';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (found) {
            // Scroll to menu section
            const offsetTop = menuSection.offsetTop - 85;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            showNotification(`${term} پیدا شد!`, 'success');
        } else {
            showNotification(`متأسفانه ${term} پیدا نشد.`, 'error');
            // Reset display
            menuCards.forEach(card => {
                card.style.display = 'block';
                card.style.border = '1px solid #f0f0f0';
            });
        }
    }
    
    // Favorites functionality
    const heartIcon = document.querySelector('.nav-icons .fa-heart');
    if (heartIcon) {
        heartIcon.addEventListener('click', function() {
            showNotification('قابلیت علاقه‌مندی‌ها به زودی فعال خواهد شد!', 'success');
        });
    }
    
    // Shopping cart functionality
    const cartIcon = document.querySelector('.nav-icons .fa-shopping-cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            showNotification('سبد خرید به زودی فعال خواهد شد!', 'success');
        });
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Mobile menu toggle (if you want to add mobile menu)
    function createMobileMenu() {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const mobileToggle = document.createElement('button');
                mobileToggle.className = 'mobile-menu-toggle';
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.cssText = `
                    display: block;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #333;
                `;
                
                header.querySelector('.nav-wrapper').appendChild(mobileToggle);
                
                mobileToggle.addEventListener('click', function() {
                    nav.classList.toggle('mobile-active');
                });
            }
        }
    }
    
    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    // Initial call to set active nav on load
    highlightActiveNav();
    
    console.log('🍽️ Restaurant website loaded successfully!');
});

// Additional utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{11}$/;
    return re.test(phone);
}