// Gallery Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-card');
    const galleryModal = document.getElementById('galleryModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    // Open modal when gallery item is clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            
            modalImage.src = imgSrc;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal
    function closeModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Initialize flip cards
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.flip-card-inner').style.transform = 'rotateY(0)';
        });
    });
    
    // Stagger animation for gallery items
    const staggerItems = document.querySelectorAll('.stagger-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    staggerItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
    
    // Add parallax effect to hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.about-hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
});