/* ===== Certificates Page — Premium JavaScript ===== */
document.addEventListener('DOMContentLoaded', () => {

    // ─── 3D Tilt Effect for Cert Cards ───
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            const inner = card.querySelector('.cert-card-inner');
            if (inner) {
                inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.cert-card-inner');
            if (inner) inner.style.transform = '';
        });
    });

    // ─── Stagger Animation on Scroll ───
    const staggerItems = document.querySelectorAll('.stagger-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    let animIndex = 0;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, animIndex * 100);
                animIndex++;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    staggerItems.forEach(item => observer.observe(item));

    // ─── Category Filter ───
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            certCards.forEach(card => {
                const categories = card.dataset.category || '';
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('filter-hidden');
                    // Re-trigger animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('filter-hidden');
                }
            });
        });
    });

    // ─── Lightbox Modal ───
    const lightbox = document.getElementById('certLightbox');
    const lightboxImg = document.getElementById('certLightboxImg');
    const lightboxCaption = document.getElementById('certLightboxCaption');
    const lightboxClose = document.getElementById('certLightboxClose');
    const backdrop = lightbox ? lightbox.querySelector('.cert-lightbox-backdrop') : null;

    // Open lightbox on image click
    const imageWrappers = document.querySelectorAll('.cert-image-wrapper');
    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const img = wrapper.querySelector('img');
            const card = wrapper.closest('.cert-card');
            const title = card ? card.querySelector('.cert-card-body h3') : null;

            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                if (lightboxCaption && title) {
                    lightboxCaption.textContent = title.textContent;
                }
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (lightboxImg) lightboxImg.src = '';
            }, 400);
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ─── Hero Counter Animation ───
    const counters = document.querySelectorAll('.cert-stat-number.count-up');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    }

    // ─── Journey Line Animation ───
    const journeyLine = document.querySelector('.journey-line');
    if (journeyLine) {
        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    journeyLine.style.animation = 'lineGrow 1.5s ease forwards';
                    lineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        lineObserver.observe(journeyLine);
    }

    // Add dynamic CSS for line animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes lineGrow {
            from { height: 0; }
            to { height: 100%; }
        }
        .journey-line {
            height: 0;
        }
    `;
    document.head.appendChild(style);

    // ─── Floating Particle Effect in Hero ───
    const hero = document.querySelector('.cert-hero');
    if (hero) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1.5;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 215, 0, ${Math.random() * 0.35 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 8}s ease-in-out infinite;
                animation-delay: ${Math.random() * 6}s;
                pointer-events: none;
                z-index: 0;
            `;
            hero.appendChild(particle);
        }

        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
                25% { transform: translate(25px, -35px) scale(1.3); opacity: 0.5; }
                50% { transform: translate(-15px, -60px) scale(0.8); opacity: 0.35; }
                75% { transform: translate(20px, -25px) scale(1.15); opacity: 0.45; }
            }
        `;
        document.head.appendChild(particleStyle);
    }

    console.log('✅ Certificates page initialized (Premium)');
});
