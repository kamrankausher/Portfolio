/* ===== Contact Page JavaScript ===== */
document.addEventListener('DOMContentLoaded', () => {

    // --- 3D Tilt Effect for Info Cards ---
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

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
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
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    staggerItems.forEach(item => observer.observe(item));

    // --- Form Validation & Submission ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        // Input focus animations
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                shakeButton(submitBtn);
                return;
            }

            if (!isValidEmail(email)) {
                shakeButton(submitBtn);
                highlightError(document.getElementById('email'));
                return;
            }

            // Show loading
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            const btnLoading = submitBtn.querySelector('.btn-loading');

            btnText.style.display = 'none';
            btnIcon.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;

            // Simulate submission
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';

                // Confetti particles
                createConfetti();
            }, 1800);
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function shakeButton(btn) {
        btn.style.animation = 'shake 0.5s ease';
        setTimeout(() => { btn.style.animation = ''; }, 500);
    }

    function highlightError(input) {
        input.style.borderColor = '#ff4444';
        input.style.boxShadow = '0 0 15px rgba(255, 68, 68, 0.2)';
        setTimeout(() => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }, 2000);
    }

    // --- Confetti Effect ---
    function createConfetti() {
        const colors = ['#FFD700', '#8A2BE2', '#00D4FF', '#FF6B6B', '#4CAF50'];
        const successEl = document.getElementById('formSuccess');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: 50%;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                pointer-events: none;
                z-index: 100;
                animation: confettiDrop ${Math.random() * 2 + 1}s ease-out forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            successEl.appendChild(confetti);
        }

        // Remove particles after animation
        setTimeout(() => {
            const particles = successEl.querySelectorAll('div[style*="confettiDrop"]');
            particles.forEach(p => p.remove());
        }, 4000);
    }

    // Dynamic styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
        }
        @keyframes confettiDrop {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { 
                transform: translate(${() => ''}var(--tx, 0px), var(--ty, 100px)) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Set random transform values for confetti
    document.documentElement.style.setProperty('--tx', '0px');
    document.documentElement.style.setProperty('--ty', '100px');

    // Overridden confetti animation via inline
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiDrop {
            0% {
                transform: translate(0, 0) rotate(0deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 + 50}px) rotate(${Math.random() * 720}deg) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // --- Floating particles in hero ---
    const hero = document.querySelector('.contact-hero');
    if (hero) {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 8 + 6}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            hero.appendChild(particle);
        }

        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0); opacity: 0.3; }
                50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * -40}px); opacity: 0.6; }
            }
        `;
        document.head.appendChild(particleStyle);
    }

    console.log('✅ Contact page initialized');
});
