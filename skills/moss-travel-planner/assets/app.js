// 🌿 Travel Planner - Template JavaScript

// ============================================================
// CONFIGURATION - Edit these for your destination
// ============================================================

const CONFIG = {
    destination: "Destination Name",
    timezone: "Asia/Bangkok", // Change to your destination's timezone
    flag: "🏳️", // Emoji flag
    year: 2026,
    duration: "X วัน Y คืน",
    who: "ผู้เดินทาง",
    dates: "วันที่ - วันที่ เดือน ปี"
};

// Itinerary data (edit for each day)
const itinerary = {
    1: {
        title: "Day 1: Arrival",
        subtitle: "มาถึง พักผ่อน",
        activities: [
            "✈️ เช็คอินโรงแรม",
            "🚶 เดินเล่น",
            "🍜 กินเย็น"
        ],
        places: ["Place 1", "Place 2"]
    },
    2: {
        title: "Day 2: Explore",
        subtitle: "สำรวจเมือง",
        activities: [
            "📷 ถ่ายรูป",
            "🛒 ช้อปปิ้ง"
        ],
        places: ["Place 3", "Place 4"]
    }
    // Add more days as needed
};

// Global variables
let placesData = [];
let currentFilter = 'all';

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    await loadPlaces();
    renderDayNav();
    showDay(1);
    updateTime();
    setInterval(updateTime, 1000);
    setInterval(updatePlaceStatuses, 60000);
    setupModalEvents();
});

// ============================================================
// DATA LOADING
// ============================================================

async function loadPlaces() {
    try {
        const response = await fetch('data/places.json');
        placesData = await response.json();
        renderFilterButtons();
        renderPlaces(placesData);
    } catch (error) {
        console.error('Failed to load places:', error);
        document.getElementById('places-grid').innerHTML =
            '<p style="text-align:center;padding:50px;color:#888;">กำลังโหลดข้อมูล...</p>';
    }
}

// ============================================================
// DAY NAVIGATION
// ============================================================

function renderDayNav() {
    const nav = document.getElementById('day-nav');
    const days = Object.keys(itinerary);

    nav.innerHTML = days.map(day => `
        <button class="day-tab ${day == 1 ? 'active' : ''}" data-day="${day}">
            <span class="day-num">${String(day).padStart(2, '0')}</span>
            <span class="day-label">Day ${day}</span>
        </button>
    `).join('');

    // Add click events
    nav.querySelectorAll('.day-tab').forEach(tab => {
        tab.addEventListener('click', () => showDay(tab.dataset.day));
    });
}

function showDay(day) {
    const data = itinerary[day];
    if (!data) return;

    const container = document.getElementById('day-content');

    container.innerHTML = `
        <div class="day-card">
            <div class="day-header">
                <h2>${data.title}</h2>
                <p>${data.subtitle}</p>
            </div>
            <div class="day-activities">
                <h3>📋 กิจกรรมวันนี้</h3>
                <ul class="activity-list">
                    ${data.activities.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    // Update tabs
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.day == day);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// FILTER
// ============================================================

function renderFilterButtons() {
    const types = [...new Set(placesData.map(p => p.type))];
    const labels = {
        attraction: { icon: '📷', text: 'สถานที่' },
        food: { icon: '🍜', text: 'อาหาร' },
        restaurant: { icon: '🍽️', text: 'ร้านอาหาร' },
        shopping: { icon: '🛒', text: 'ช้อปปิ้ง' },
        night_market: { icon: '🌙', text: 'ตลาดกลางคืน' }
    };

    const container = document.getElementById('filter-buttons');

    let html = `
        <button class="filter-btn active" data-type="all">
            <span class="icon">📍</span>
            <span>ทั้งหมด</span>
        </button>
    `;

    types.forEach(type => {
        const label = labels[type] || { icon: '📍', text: type };
        html += `
            <button class="filter-btn" data-type="${type}">
                <span class="icon">${label.icon}</span>
                <span>${label.text}</span>
            </button>
        `;
    });

    container.innerHTML = html;

    // Add click events
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const type = btn.dataset.type;
            currentFilter = type;

            const filtered = type === 'all'
                ? placesData
                : placesData.filter(p => p.type === type);

            renderPlaces(filtered);
        });
    });
}

// ============================================================
// PLACES RENDERING
// ============================================================

function renderPlaces(places) {
    const container = document.getElementById('places-grid');

    if (!places || places.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#888;padding:50px;">ไม่พบสถานที่</p>';
        return;
    }

    container.innerHTML = `
        <div class="places-grid">
            ${places.map(place => createPlaceCard(place)).join('')}
        </div>
    `;

    // Add photo spots button events
    document.querySelectorAll('.photo-spots-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const placeName = btn.dataset.place;
            const place = placesData.find(p => p.name === placeName);
            if (place && place.photo_spots && place.photo_spots.length > 0) {
                showPhotoSpotsModal(place);
            } else {
                alert('ยังไม่มีข้อมูลจุดถ่ายรูปสำหรับสถานที่นี้');
            }
        });
    });
}

function createPlaceCard(place) {
    const status = getPlaceStatus(place);
    const labels = {
        attraction: '📷 สถานที่',
        food: '🍜 อาหาร',
        restaurant: '🍽️ ร้านอาหาร',
        shopping: '🛒 ช้อปปิ้ง',
        night_market: '🌙 ตลาดกลางคืน'
    };

    const hasPhotoSpots = place.photo_spots && place.photo_spots.length > 0;

    return `
        <div class="place-card" data-type="${place.type}">
            <div class="place-image">
                <img src="${place.image}" alt="${place.name}" loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800'">
                <span class="type-badge">${labels[place.type] || '📍'}</span>
                <div class="status-overlay">
                    <span class="status-badge ${status.isOpen ? 'open' : 'closed'}">
                        ${status.isOpen ? '🟢 เปิด' : '🔴 ปิด'}
                    </span>
                </div>
            </div>
            <div class="place-info">
                <h3>${place.name}</h3>
                <p class="name-th">${place.name_th || ''}</p>
                <div class="place-meta">
                    <span>⏰ ${place.hours.open} - ${place.hours.close}</span>
                    <span>📍 ${place.area}</span>
                </div>
                ${place.description ? `<p class="place-description">${place.description}</p>` : ''}
                ${hasPhotoSpots ? `
                    <button class="photo-spots-btn" data-place="${place.name}">
                        📷 ดูจุดถ่ายรูปแนะนำ
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}

// ============================================================
// STATUS CHECKING
// ============================================================

function getPlaceStatus(place) {
    const now = new Date();
    const localTime = new Date(now.toLocaleString('en-US', { timeZone: CONFIG.timezone }));

    const [openH, openM] = place.hours.open.split(':').map(Number);
    const [closeH, closeM] = place.hours.close.split(':').map(Number);

    const currentMinutes = localTime.getHours() * 60 + localTime.getMinutes();
    const openMinutes = openH * 60 + openM;
    let closeMinutes = closeH * 60 + closeM;

    // Handle overnight closing (e.g., 01:00)
    if (closeMinutes < openMinutes) {
        closeMinutes += 24 * 60;
    }

    const isOpen = currentMinutes >= openMinutes && currentMinutes <= closeMinutes;

    return { isOpen };
}

function updatePlaceStatuses() {
    placesData.forEach(place => {
        const cards = document.querySelectorAll(`.place-card[data-type="${place.type}"]`);
        cards.forEach(card => {
            const title = card.querySelector('h3');
            if (title && title.textContent === place.name) {
                const status = getPlaceStatus(place);
                const badge = card.querySelector('.status-badge');
                if (badge) {
                    badge.className = `status-badge ${status.isOpen ? 'open' : 'closed'}`;
                    badge.textContent = status.isOpen ? '🟢 เปิด' : '🔴 ปิด';
                }
            }
        });
    });
}

// ============================================================
// MODAL
// ============================================================

function setupModalEvents() {
    const modal = document.getElementById('modal');

    modal.querySelector('.modal-close').addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function showPhotoSpotsModal(place) {
    const modal = document.getElementById('modal');
    const modalBody = modal.querySelector('.modal-body');

    const spotsHTML = place.photo_spots.map(spot => `
        <div class="photo-spot-card">
            <div class="photo-spot-image">
                <img src="${spot.image}" alt="${spot.name}" loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600'">
            </div>
            <div class="photo-spot-info">
                <h4>${spot.name}</h4>
                <p>${spot.description}</p>
            </div>
        </div>
    `).join('');

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>📷 ${place.name}</h2>
            <p>${place.name_th || ''}</p>
        </div>
        <div class="photo-spots-grid">
            ${spotsHTML}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
// TIME UPDATE
// ============================================================

function updateTime() {
    const now = new Date();
    const localTime = new Date(now.toLocaleString('en-US', { timeZone: CONFIG.timezone }));

    const timeStr = localTime.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const dateStr = localTime.toLocaleDateString('th-TH', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });

    const timeEl = document.getElementById('current-time');
    if (timeEl) {
        timeEl.textContent = `${dateStr} ${timeStr}`;
    }
}
