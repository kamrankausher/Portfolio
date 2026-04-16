/* ===== Home Page — Premium Interactions ===== */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Hero Canvas Particle Network ──
    initHeroCanvas();

    // ── 2. Typing Effect ──
    initTypingEffect();

    // ── 3. Stagger Hero Elements ──
    staggerHeroElements();

    // ── 4. 3D Tilt on Featured Cards ──
    init3DTilt();

    // ── 5. Parallax Orbs ──
    initParallaxOrbs();
});


/* ═══════════════════════════════════════════
   1. Hero Canvas — Gold Particle Network
═══════════════════════════════════════════ */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, particles, mouse;

    function resize() {
        const hero = canvas.parentElement;
        width = canvas.width = hero.offsetWidth;
        height = canvas.height = hero.offsetHeight;
    }

    mouse = { x: -999, y: -999 };
    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // mouse repel
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (120 - dist) / 120 * 0.03;
                this.vx += dx * force;
                this.vy += dy * force;
            }
            // dampen
            this.vx *= 0.999;
            this.vy *= 0.999;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        const count = Math.min(Math.floor(width * height / 12000), 120);
        particles = Array.from({ length: count }, () => new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    const alpha = (1 - dist / 130) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }

    init();
    window.addEventListener('resize', init);
    animate();
}


/* ═══════════════════════════════════════════
   2. Typing Effect — Title Roles
═══════════════════════════════════════════ */
function initTypingEffect() {
    const el = document.getElementById('typedRole');
    if (!el) return;

    const roles = [
        'AI Systems.',
        'ML Pipelines.',
        'Data Solutions.',
        'Intelligent Agents.',
        'Smart Analytics.'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let delay = 100;

    function type() {
        const current = roles[roleIdx];

        if (isDeleting) {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            delay = 50;
        } else {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            delay = 100;
        }

        if (!isDeleting && charIdx === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    // delay start until hero title is visible
    setTimeout(type, 1200);
}


/* ═══════════════════════════════════════════
   3. Stagger Hero Elements In
═══════════════════════════════════════════ */
function staggerHeroElements() {
    const els = document.querySelectorAll('#heroTextCol > *');
    if (!els.length) return;

    els.forEach((el, i) => {
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 + i * 150);
    });
}


/* ═══════════════════════════════════════════
   4. 3D Tilt on Featured & Explore Cards
═══════════════════════════════════════════ */
function init3DTilt() {
    const cards = document.querySelectorAll('.featured-card, .explore-card, .resume-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotY = ((x - cx) / cx) * 5;
            const rotX = ((cy - y) / cy) * 5;
            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-12px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}


/* ═══════════════════════════════════════════
   5. Parallax Orbs on Scroll
═══════════════════════════════════════════ */
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    if (!orbs.length) return;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        orbs.forEach((orb, i) => {
            const speed = 0.03 + i * 0.015;
            orb.style.transform = `translateY(${y * speed}px)`;
        });
    }, { passive: true });
}
