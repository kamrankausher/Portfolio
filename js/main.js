// ===== Theme System =====
const THEME_KEY = 'kk-portfolio-theme';

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;

    if (!isDark) {
        document.body.classList.add('light-theme');
    }
    updateThemeIcon(!isDark);
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
}

function updateThemeIcon(isLight) {
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.innerHTML = isLight
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    }
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.toggle('active');
        toggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') &&
            !menu.contains(e.target) &&
            !toggle.contains(e.target)) {
            menu.classList.remove('active');
            toggle.innerHTML = '<i class="fas fa-bars">';
        }
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== Scroll Effects =====
function initScrollEffects() {
    const nav = document.querySelector('.main-nav');

    // Navbar shrink on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (nav) {
            nav.classList.toggle('scrolled', current > 60);
        }
        lastScroll = current;
    }, { passive: true });

    // Scroll reveal observer
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }
}

// ===== Page Transition =====
function initPageTransitions() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = '<div class="loader-ring"></div>';
    document.body.appendChild(overlay);

    // Intercept nav link clicks
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')  || href.startsWith('tel')) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 350);
        });
    });
}

// ===== 3D Tilt Interaction =====
function initTiltCards() {
    document.querySelectorAll('.tilt-3d, .link-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 6;
            const rotateX = ((centerY - y) / centerY) * 6;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== Counter Animation =====
function animateCounters() {
    document.querySelectorAll('.stat-number[data-target], .count-up[data-target]').forEach(counter => {
        const target = +counter.dataset.target;
        const suffix = counter.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            counter.textContent = Math.floor(target * ease) + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                requestAnimationFrame(update);
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });
        observer.observe(counter);
    });
}

// ===== Magnetic Button Effect =====
function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <p style="margin:0">${message}</p>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollEffects();
    initPageTransitions();
    initTiltCards();
    animateCounters();
    initMagneticButtons();

    // Theme toggle button
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
});