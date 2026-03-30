// 🌿 การเดินทางของคริสต์และเมย์ - App Logic

// ========== YOUR NAME THEME - TWINKLING STARS ==========
// Create random twinkling stars
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;

    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }
}

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
                <img src="${place.image}" alt="${place.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/680x510?text=Image+Not+Available'">
                <span class="place-day-badge">Day ${place.day}</span>
                ${place.may_rating ? `<span class="may-rating-badge">${place.may_rating}</span>` : ''}
            </div>
            <div class="place-content">
                <h3 class="place-name">${place.name}</h3>
                <p class="place-name-th">${place.name_th}</p>
                <p class="place-desc">${place.description}</p>

                ${place.accessibility ? `
                <div class="accessibility-info">
                    <div class="access-item">
                        <span class="access-icon">🚇</span>
                        <span class="access-text">${place.accessibility.mrt}</span>
                    </div>
                    <div class="access-item">
                        <span class="access-icon">🚶</span>
                        <span class="access-text">${place.accessibility.walking}</span>
                    </div>
                    <div class="access-item">
                        <span class="access-icon">✅</span>
                        <span class="access-text">${place.accessibility.difficulty}</span>
                    </div>
                </div>
                ` : ''}

                ${place.google_maps ? `
                <div class="place-info">
                    <div class="info-item">
                        <span class="info-icon">📍</span>
                        <a href="${place.google_maps}" target="_blank" class="info-link">Google Maps</a>
                    </div>
                    ${place.opening_hours ? `
                    <div class="info-item">
                        <span class="info-icon">⏰</span>
                        <span class="info-text">${place.opening_hours}</span>
                    </div>
                    ` : ''}
                    ${place.price ? `
                    <div class="info-item">
                        <span class="info-icon">💰</span>
                        <span class="info-text">${place.price}</span>
                    </div>
                    ` : ''}
                </div>
                ` : ''}

                ${place.restaurants ? `
                <div class="place-restaurants">
                    <h4>🍴 Recommended</h4>
                    ${place.restaurants.map(r => `
                        <div class="restaurant-item">
                            <div class="restaurant-header">
                                <span class="restaurant-name">${r.name}</span>
                                ${r.highlight ? `<span class="restaurant-highlight">${r.highlight}</span>` : ''}
                            </div>
                            <div class="restaurant-details">
                                <span class="restaurant-type">${r.type}</span>
                                ${r.price ? `<span class="restaurant-price">${r.price}</span>` : ''}
                                ${r.hours ? `<span class="restaurant-hours">⏰ ${r.hours}</span>` : ''}
                            </div>
                            <div class="restaurant-links">
                                ${r.google_maps ? `<a href="${r.google_maps}" target="_blank" class="restaurant-link">📍 Maps</a>` : ''}
                                ${r.website ? `<a href="${r.website}" target="_blank" class="restaurant-link">🌐 เว็บไซต์</a>` : ''}
                                ${r.instagram ? `<a href="${r.instagram}" target="_blank" class="restaurant-link">📸 Instagram</a>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${place.photo_spots ? `
                <div class="photo-spots">
                    <h4>📸 Photo Spots</h4>
                    ${place.photo_spots.map(spot => `
                        <div class="photo-spot">
                            <div class="spot-info">
                                <span class="spot-name">${spot.name}</span>
                                <span class="spot-tip">${spot.description}</span>
                                ${spot.best_time ? `<span class="spot-time">🕐 ${spot.best_time}</span>` : ''}
                                ${spot.hours ? `<span class="spot-hours">⏰ ${spot.hours}</span>` : ''}
                                ${spot.tip ? `<span class="spot-extra">💡 ${spot.tip}</span>` : ''}
                                ${spot.difficulty ? `<span class="spot-difficulty">🚶 ${spot.difficulty}</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${place.checkin_tip ? `
                <div class="checkin-tip">
                    💡 ${place.checkin_tip}
                </div>
                ` : ''}
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

// ========== PACKING LIST CHECKBOXES ==========
function initPackingCheckboxes() {
    // Load saved checkboxes from localStorage
    const checkboxes = document.querySelectorAll('.packing-checkbox');

    checkboxes.forEach((checkbox, index) => {
        // Load saved state
        const savedState = localStorage.getItem(`packing-item-${index}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }

        // Add event listener
        checkbox.addEventListener('change', function() {
            // Save to localStorage
            localStorage.setItem(`packing-item-${index}`, this.checked);

            // Show feedback
            if (this.checked) {
                showPackingFeedback('✅ เช็คแล้ว!');
            } else {
                showPackingFeedback('⬜ ยกเลิกเช็ค');
            }
        });
    });
}

function showPackingFeedback(message) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(feedback);

    // Remove after 2 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

// Add animations to CSS
const packingStyle = document.createElement('style');
packingStyle.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(packingStyle);

// ========== INTERACTIVE WISHES ==========
function showWish(wishText) {
    const wishDisplay = document.getElementById('wish-display');
    if (!wishDisplay) return;

    wishDisplay.innerHTML = `<p>✨ ${wishText} ✨</p>`;
    wishDisplay.style.animation = 'none';
    wishDisplay.offsetHeight; // Trigger reflow
    wishDisplay.style.animation = 'fadeInUp 0.5s ease';

    // Add sparkle effect
    createSparkles(wishDisplay);
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        sparkle.style.zIndex = '9999';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add sparkle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    createStars(); // Your Name Theme - Twinkling Stars
    initPackingCheckboxes(); // Packing List Checkboxes
    loadPlaces();
    updateCountdown();
    setInterval(updateCountdown, 60000);

    setTimeout(initScrollAnimations, 100);

    console.log('💕 การเดินทางของคริสต์และเมย์ - Your Name Theme');
    console.log('🌟 จดจำไปตลอดชีวิต!');
    console.log('📋 Packing List Ready!');
});
