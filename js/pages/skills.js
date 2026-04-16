// Skills Page - Premium Interactive Animations
document.addEventListener('DOMContentLoaded', function () {

    // ── 1. Hero Counter Animations ──
    function animateCounters() {
        const counters = document.querySelectorAll('.count-up');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (isNaN(target) || counter.dataset.animated === 'true') return;

            const duration = 1800;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // ease-out cubic
                const ease = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(target * ease);
                if (progress < 1) requestAnimationFrame(update);
            }

            counter.dataset.animated = 'true';
            requestAnimationFrame(update);
        });
    }

    // Trigger counters when hero is visible
    const heroSection = document.querySelector('.skills-hero');
    if (heroSection) {
        const heroObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateCounters();
                    heroObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });
        heroObs.observe(heroSection);
    }

    // ── 2. Skill Bars Animated Fill ──
    const skillBars = document.querySelectorAll('.level-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const raw = bar.getAttribute('data-width') || '';
                // Support both "width: 95%" and plain "95" formats
                const match = raw.match(/(\d+)/);
                if (match) {
                    const percent = match[1];
                    setTimeout(() => {
                        bar.style.width = percent + '%';
                    }, 200);
                }
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -80px 0px' });

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        barObserver.observe(bar);
    });

    // ── 3. Scroll-Stagger Animations for Cards ──
    function createStaggerObserver(selector, baseDelay = 0.08) {
        const cards = document.querySelectorAll(selector);
        if (!cards.length) return;

        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.95)';
            card.style.transition = `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)`;
            card.style.transitionDelay = `${i * baseDelay}s`;
        });

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        cards.forEach(c => obs.observe(c));
    }

    createStaggerObserver('.category-card', 0.12);
    createStaggerObserver('.tool-card', 0.06);
    createStaggerObserver('.timeline-item', 0.15);

    // ── 4. 3D Tilt on Category Cards ──
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });

        // Category icon hover
        const icon = card.querySelector('.category-icon');
        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(8deg)';
                icon.style.background = 'linear-gradient(135deg, var(--gold-primary), var(--accent-purple))';
                icon.style.color = 'var(--bg-primary)';
                icon.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.4)';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = '';
                icon.style.background = '';
                icon.style.color = '';
                icon.style.boxShadow = '';
            }
        });
    });

    // ── 5. Tool Card Magnetic Hover + Glow ──
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = ((x - centerX) / centerX) * 8;
            const moveY = ((y - centerY) / centerY) * 8;
            card.style.transform = `translateY(-12px) scale(1.04) translate(${moveX}px, ${moveY}px)`;
            // Dynamic glow position
            card.style.setProperty('--glow-x', x + 'px');
            card.style.setProperty('--glow-y', y + 'px');
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });

        const icon = card.querySelector('.tool-icon');
        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.25) rotate(12deg)';
                icon.style.boxShadow = '0 0 25px currentColor';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = '';
                icon.style.boxShadow = '';
            }
        });
    });

    // ── 6. Timeline Interactions ──
    document.querySelectorAll('.timeline-item').forEach(item => {
        const year = item.querySelector('.timeline-year');
        const content = item.querySelector('.timeline-content');

        if (content && year) {
            content.addEventListener('mouseenter', () => {
                year.style.transform = 'scale(1.15) rotate(5deg)';
                year.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.2)';
                content.style.borderColor = 'var(--gold-primary)';
                content.style.boxShadow = '0 15px 50px rgba(0,0,0,0.3), inset 0 0 1px rgba(255,215,0,0.3)';
            });
            content.addEventListener('mouseleave', () => {
                year.style.transform = '';
                year.style.boxShadow = '';
                content.style.borderColor = '';
                content.style.boxShadow = '';
            });
        }
    });

    // ── 7. Animated Timeline Line ──
    const devTimeline = document.querySelector('.development-timeline');
    if (devTimeline) {
        devTimeline.style.setProperty('--line-height', '0%');
        const lineObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    setTimeout(() => {
                        devTimeline.style.setProperty('--line-height', '100%');
                    }, 300);
                    lineObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        lineObs.observe(devTimeline);
    }

    // ── 8. Floating Particles in Hero ──
    function createParticles() {
        const hero = document.querySelector('.skills-hero');
        if (!hero) return;
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 215, 0, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 2;
                animation: particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 4}s;
                box-shadow: 0 0 ${Math.random() * 6 + 2}px rgba(255, 215, 0, 0.4);
            `;
            hero.appendChild(particle);
        }
    }
    createParticles();

    // ── 9. Hero Parallax on Scroll ──
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(() => {
                const hero = document.querySelector('.skills-hero');
                const scrolled = window.pageYOffset;
                if (hero && scrolled < hero.clientHeight) {
                    const shapes = hero.querySelectorAll('.shape');
                    shapes.forEach((shape, i) => {
                        const speed = 0.15 + i * 0.08;
                        shape.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    const grid = hero.querySelector('.tech-grid');
                    if (grid) grid.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ── 10. Section Header Animations ──
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(0)';
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });
        obs.observe(header);
    });

    // ── 11. Skill Percentage Counter Animation ──
    document.querySelectorAll('.level-percent').forEach(el => {
        const parent = el.closest('.skill-item');
        if (!parent) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(el.textContent, 10);
                    if (isNaN(target)) return;
                    el.textContent = '0%';
                    const duration = 1500;
                    const start = performance.now();
                    function tick(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(target * ease) + '%';
                        if (progress < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        obs.observe(parent);
    });

    // ── 12. Stat Cards Hover Ripple ──
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            const glow = card.querySelector('.stat-glow');
            if (glow) {
                glow.style.opacity = '1';
                glow.style.transform = 'scale(2)';
            }
        });
        card.addEventListener('mouseleave', function () {
            const glow = card.querySelector('.stat-glow');
            if (glow) {
                glow.style.opacity = '0';
                glow.style.transform = 'scale(1)';
            }
        });
    });
});