/* ========================================
   GALLERY - LIGHTBOX & FILTER
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== GALLERY FILTER =====
    const filterButtons = document.querySelectorAll('.gallery-filters button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // ===== LIGHTBOX =====
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <button class="lightbox-prev">&#10094;</button>
            <img src="" alt="" class="lightbox-img">
            <button class="lightbox-next">&#10095;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let visibleImages = [];
    
    function updateVisibleImages() {
        visibleImages = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );
    }
    
    function openLightbox(index) {
        updateVisibleImages();
        currentImageIndex = index;
        const img = visibleImages[index].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        const img = visibleImages[currentImageIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    }
    
    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        const img = visibleImages[currentImageIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    }
    
    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateVisibleImages();
            const visibleIndex = visibleImages.indexOf(item);
            openLightbox(visibleIndex);
        });
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
    
});
