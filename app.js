// 🌿 การเดินทางของคริสต์และเมย์ - App Logic

// ========== PLACES DATA ==========
let placesData = [];

async function loadPlaces() {
    try {
        const response = await fetch('data/places.json');
        placesData = await response.json();
        renderPlaces();
    } catch (error) {
        console.error('โหลดข้อมูลสถานที่ไม่สำเร็จ:', error);
    }
}

function renderPlaces() {
    const container = document.getElementById('places-grid');
    if (!container) return;

    container.innerHTML = placesData.map(place => `
        <div class="place-card" data-day="${place.day}">
            <div class="place-image">
                <img src="${place.image}" alt="${place.name}" loading="lazy">
                <span class="place-day-badge">Day ${place.day}</span>
            </div>
            <div class="place-content">
                <h3 class="place-name">${place.name}</h3>
                <p class="place-name-th">${place.name_th}</p>
                <p class="place-desc">${place.description}</p>

                <div class="photo-spots">
                    <h4>📸 Photo Spots</h4>
                    ${place.photo_spots.map(spot => `
                        <div class="photo-spot">
                            <img src="${spot.image}" alt="${spot.name}">
                            <div class="spot-info">
                                <span class="spot-name">${spot.name}</span>
                                <span class="spot-tip">${spot.description}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="checkin-tip">
                    💡 ${place.checkin_tip}
                </div>
            </div>
        </div>
    `).join('');
}

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
    document.querySelectorAll('.day-card, .budget-item, .stat, .place-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    loadPlaces();
    updateCountdown();
    setInterval(updateCountdown, 60000);

    setTimeout(initScrollAnimations, 100);

    console.log('💕 การเดินทางของคริสต์และเมย์');
});
