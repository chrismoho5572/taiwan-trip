// 🌿 การเดินทางของคริสต์และเมย์ - App Logic

// ========== COUNTDOWN ==========
function updateCountdown() {
    const tripDate = new Date('2026-04-10T00:00:00');
    const now = new Date();
    const diff = tripDate - now;

    if (diff > 0) {
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const countdownEl = document.getElementById('countdown');

        if (countdownEl) {
            countdownEl.textContent = `🎉 อีก ${days} วัน!`;
        }
    } else {
        // ถ้าถึงวันแล้ว
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.textContent = `🎉 ถึงวันแล้ว!`;
        }
    }
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards
    document.querySelectorAll('.day-card, .budget-item, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute

    initScrollAnimations();

    console.log('💕 การเดินทางของคริสต์และเมย์');
});
