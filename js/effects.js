// ===== Enhanced Particle System =====
function createParticles() {
    const existing = document.querySelector('.particles');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.className = 'particles';
    document.body.appendChild(container);

    const count = 35;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            bottom: -10px;
            animation-duration: ${Math.random() * 25 + 15}s;
            animation-delay: ${Math.random() * 10}s;
            opacity: ${Math.random() * 0.35 + 0.05};
        `;
        container.appendChild(p);
    }
}

// ===== 3D Sphere Interaction =====
function initTechSphere() {
    const sphere = document.querySelector('.tech-sphere');
    if (!sphere) return;

    sphere.addEventListener('mousemove', (e) => {
        const rect = sphere.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        sphere.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg) scale(1.05)`;
    });

    sphere.addEventListener('mouseleave', () => {
        sphere.style.transform = '';
    });
}

// ===== Cursor Glow (desktop only) =====
function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(138,43,226,0.06), transparent 70%);
        pointer-events: none;
        z-index: -1;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }, { passive: true });
}

// ===== Smooth Anchor Scrolling =====
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== Text Typing Effect =====
function initTypingEffect() {
    const el = document.querySelector('.typing-text');
    if (!el) return;

    const texts = JSON.parse(el.dataset.texts || '[]');
    if (!texts.length) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = texts[textIndex];
        el.textContent = current.substring(0, charIndex);

        if (!isDeleting && charIndex < current.length) {
            charIndex++;
            setTimeout(type, 70);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 40);
        } else if (!isDeleting) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    type();
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initTechSphere();
    initCursorGlow();
    initSmoothAnchors();
    initTypingEffect();
});