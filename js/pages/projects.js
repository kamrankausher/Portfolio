/* ===== Projects Page JavaScript ===== */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Filter System ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach((card, index) => {
                const categories = card.dataset.category || '';
                const shouldShow = (filter === 'all') || categories.includes(filter);

                if (shouldShow) {
                    card.classList.remove('hidden');
                    card.classList.add('show');
                    card.style.animationDelay = `${index * 0.1}s`;
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('show');
                }
            });
        });
    });

    // --- 3D Tilt Effect ---
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            const inner = card.querySelector('.project-card-inner') || card;
            inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.project-card-inner') || card;
            inner.style.transform = '';
        });
    });

    // --- Stagger Animation on Scroll ---
    const staggerItems = document.querySelectorAll('.stagger-item');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    staggerItems.forEach(item => observer.observe(item));

    // --- Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                animateCount(target, count);
                countObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => countObserver.observe(num));

    function animateCount(element, target) {
        let current = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current >= 1000 
                ? (current / 1000).toFixed(0) + 'K+' 
                : current + '+';
        }, 16);
    }

    // --- Stagger Links Delay ---
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach((link, i) => {
        link.style.transitionDelay = `${0.1 + i * 0.15}s`;
    });

    console.log('✅ Projects page initialized');
});
