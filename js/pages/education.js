/* ===== Education Page — Premium Interactions V2 ===== */
document.addEventListener('DOMContentLoaded', () => {
    initHeroParticles();
    initCounterAnimations();
    initTimelineScrollIn();
    initGPARings();
    initProgressBars();
    initCourseCardEffects();
    initRoadmapStagger();
    initParallaxShapes();
});

/* ── Canvas Particles ── */
function initHeroParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        const hero = canvas.parentElement;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const PARTICLE_COUNT = 40;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });

        // Draw connections
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = `rgba(255, 215, 0, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }
    draw();
}

/* ── Counter Animations ── */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const start = performance.now();

    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(target * ease);
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

/* ── Timeline Scroll-In ── */
function initTimelineScrollIn() {
    const items = document.querySelectorAll('.tl-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger each item
                const idx = Array.from(items).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    items.forEach(item => observer.observe(item));
}

/* ── SVG GPA Rings ── */
function initGPARings() {
    const rings = document.querySelectorAll('.gpa-ring');
    if (!rings.length) return;

    // Inject SVG gradient defs
    const svgNS = 'http://www.w3.org/2000/svg';
    rings.forEach(ring => {
        const svg = ring.querySelector('svg');
        const defs = document.createElementNS(svgNS, 'defs');
        const grad = document.createElementNS(svgNS, 'linearGradient');
        grad.setAttribute('id', 'gpaGrad_' + Math.random().toString(36).substring(7));
        grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
        grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '0%');

        const stop1 = document.createElementNS(svgNS, 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#FFD700');
        const stop2 = document.createElementNS(svgNS, 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#8A2BE2');

        grad.appendChild(stop1);
        grad.appendChild(stop2);
        defs.appendChild(grad);
        svg.insertBefore(defs, svg.firstChild);

        // Set the fill circle's stroke to use this gradient
        const fillCircle = ring.querySelector('.gpa-fill');
        fillCircle.style.stroke = `url(#${grad.getAttribute('id')})`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ring = entry.target;
                const value = parseInt(ring.getAttribute('data-value'), 10);
                const circumference = 2 * Math.PI * 42; // r=42
                const offset = circumference - (circumference * value / 100);
                const fillCircle = ring.querySelector('.gpa-fill');
                fillCircle.style.strokeDasharray = circumference;
                fillCircle.style.strokeDashoffset = offset;
                observer.unobserve(ring);
            }
        });
    }, { threshold: 0.5 });

    rings.forEach(r => observer.observe(r));
}

/* ── Progress Bars ── */
function initProgressBars() {
    const fills = document.querySelectorAll('.progress-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    entry.target.style.width = width + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(f => observer.observe(f));
}

/* ── Course Card Effects ── */
function initCourseCardEffects() {
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        // 3D tilt on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 4;
            const rotateX = ((centerY - y) / centerY) * 4;
            card.style.transform = `translateY(-10px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Stagger scroll-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, idx * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(card);
    });
}

/* ── Roadmap Stagger ── */
function initRoadmapStagger() {
    const cards = document.querySelectorAll('.roadmap-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, idx * 180);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
        observer.observe(card);
    });
}

/* ── Parallax Shapes ── */
function initParallaxShapes() {
    const shapes = document.querySelectorAll('.shape');
    if (!shapes.length) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.04;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });
}