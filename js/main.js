/* ========================================
   MAIN JAVASCRIPT
   Navigation, Scroll Effects, Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();
    
    // ===== MOBILE HAMBURGER MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (hamburger && navbarMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const menuLinks = navbarMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navbarMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    }
    
    // ===== ACTIVE NAVIGATION LINK =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ===== SCROLL-TRIGGERED ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');
    animatedElements.forEach(el => animationObserver.observe(el));
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== WHATSAPP BUTTON =====
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://wa.me/919416697456', '_blank');
        });
    }
    
    // ===== HERO ANIMATION TRIGGER =====
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate');
        }, 100);
    }
    
    // ===== FORM VALIDATION HELPER =====
    window.validateEmail = function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    window.validatePhone = function(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/\s/g, ''));
    };
    
    window.showError = function(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
        input.style.borderColor = '#e74c3c';
    };
    
    window.clearError = function(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        input.style.borderColor = '';
    };
    
    window.clearAllErrors = function(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => clearError(input));
    };
    
});
