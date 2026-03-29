// 🌿 Taiwan Trip App - Enhanced Version

// ข้อมูลแผนทริปแต่ละวัน
const itinerary = {
    1: {
        title: "Day 1: Taipei Arrival",
        subtitle: "มาถึงไทเป ช้อป กิน พักผ่อน",
        activities: [
            "✈️ เช็คอินโรงแรม (แนะนำ Ximending)",
            "🚶 เดินเล่น Ximending ถ่ายรูป",
            "🍜 กินเที่ยงที่ Ay-Chung Flour Rice Noodles",
            "🛒 ช้อปปิ้งของ",
            "🌙 เย็นไป Ningxia Night Market"
        ],
        places: ["Ximending Pedestrian Area", "Ay-Chung Flour Rice Noodles", "Ningxia Night Market"]
    },
    2: {
        title: "Day 2: Jiufen + Shifen",
        subtitle: "หมู่บ้านเก่า + ปล่อยโคมไฟ",
        activities: [
            "🚂 รถไฟไป Ruifang (ต่อรถไป Jiufen)",
            "📷 ถ่ายรูปถนนเก่า Jiufen + โคมไฟ",
            "🍵 กินชาที่ A-Mei Tea House",
            "🏮 บ่ายไป Shifen ปล่อยโคมไฟ",
            "📸 ถ่ายรูปน้ำตก Shifen Waterfall"
        ],
        places: ["Jiufen Old Street", "Shifen Waterfall", "Shifen Sky Lantern"]
    },
    3: {
        title: "Day 3: Taipei City",
        subtitle: "เที่ยวในเมือง + ชมวิว",
        activities: [
            "🏛️ เช้า Chiang Kai-Shek Memorial Hall",
            "🏙️ สาย Taipei 101 Observatory",
            "🥟 เที่ยง Din Tai Fung (จองคิว!)",
            "⛰️ บ่าย Elephant Mountain ถ่ายรูปเย็น",
            "🌙 เย็น Shilin Night Market"
        ],
        places: ["Chiang Kai-Shek Memorial Hall", "Taipei 101 Observatory", "Din Tai Fung Taipei 101", "Elephant Mountain", "Shilin Night Market"]
    },
    4: {
        title: "Day 4: Day Trip",
        subtitle: "เลือก 1 จาก 3",
        activities: [
            "🪨 Option A: Yehliu Geopark (หินประหลาด)",
            "🚠 Option B: Maokong Gondola + ดื่มชา",
            "♨️ Option C: Beitou Hot Spring (ออนเซ็น)",
            "📸 ทั้งหมดถ่ายรูปสวย!"
        ],
        places: ["Yehliu Geopark", "Maokong Gondola", "Beitou Thermal Valley"]
    },
    5: {
        title: "Day 5: Shopping + Home",
        subtitle: "ซื้อของฝาก + กลับบ้าน",
        activities: [
            "🛒 เช้าช้อปปิ้งของฝาก",
            "🧁 ซื้อ Pineapple Cake ที่ Chia Te",
            "📦 แพ็คกระเป๋า",
            "✈️ ไปสนามบิน"
        ],
        places: ["Chia Te Bakery", "Ximending Pedestrian Area"]
    }
};

// Global variables
let placesData = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadPlaces();
    showDay(1);
    updateTime();
    setInterval(updateTime, 1000);
    setInterval(updatePlaceStatuses, 60000);
    setupModalEvents();
});

// Load places data
async function loadPlaces() {
    try {
        const response = await fetch('data/places.json');
        placesData = await response.json();
        renderPlaces(placesData);
    } catch (error) {
        console.error('โหลดข้อมูลไม่สำเร็จ:', error);
        document.getElementById('places-grid').innerHTML =
            '<div class="loading">กำลังโหลดข้อมูล</div>';
    }
}

// Show day content
function showDay(day) {
    const data = itinerary[day];
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

// Render places
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

    // Add click events for photo spots buttons
    document.querySelectorAll('.photo-spots-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const placeName = btn.dataset.place;
            const place = placesData.find(p => p.name === placeName);
            if (place) showPhotoSpotsModal(place);
        });
    });
}

// Create place card HTML
function createPlaceCard(place) {
    const status = getPlaceStatus(place);
    const typeLabels = {
        attraction: '📷 สถานที่',
        food: '🍜 อาหาร',
        restaurant: '🍽️ ร้านอาหาร',
        shopping: '🛒 ช้อปปิ้ง',
        night_market: '🌙 ตลาดกลางคืน'
    };

    return `
        <div class="place-card" data-type="${place.type}">
            <div class="place-image">
                <img src="${place.image}" alt="${place.name}" loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'">
                <span class="type-badge">${typeLabels[place.type] || '📍'}</span>
                <div class="status-overlay">
                    <span class="status-badge ${status.isOpen ? 'open' : 'closed'}">
                        ${status.isOpen ? '🟢 เปิด' : '🔴 ปิด'}
                    </span>
                </div>
            </div>
            <div class="place-info">
                <h3>${place.name}</h3>
                <p class="name-th">${place.name_th}</p>
                <div class="place-meta">
                    <span>⏰ ${place.hours.open} - ${place.hours.close}</span>
                    <span>📍 ${place.area}</span>
                </div>
                <p class="place-description">${place.description}</p>
                <button class="photo-spots-btn" data-place="${place.name}">
                    📷 ดูจุดถ่ายรูปแนะนำ
                </button>
            </div>
        </div>
    `;
}

// Get place status
function getPlaceStatus(place) {
    const now = new Date();
    const taipeiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));

    const [openH, openM] = place.hours.open.split(':').map(Number);
    const [closeH, closeM] = place.hours.close.split(':').map(Number);

    const currentMinutes = taipeiTime.getHours() * 60 + taipeiTime.getMinutes();
    const openMinutes = openH * 60 + openM;
    let closeMinutes = closeH * 60 + closeM;

    if (closeMinutes < openMinutes) {
        closeMinutes += 24 * 60;
    }

    const isOpen = currentMinutes >= openMinutes && currentMinutes <= closeMinutes;

    return { isOpen };
}

// Update place statuses
function updatePlaceStatuses() {
    placesData.forEach(place => {
        const card = document.querySelector(`.place-card[data-type="${place.type}"]`);
        if (!card) return;

        const status = getPlaceStatus(place);
        const badge = card.querySelector('.status-badge');

        if (badge) {
            badge.className = `status-badge ${status.isOpen ? 'open' : 'closed'}`;
            badge.textContent = status.isOpen ? '🟢 เปิด' : '🔴 ปิด';
        }
    });
}

// Show photo spots modal
function showPhotoSpotsModal(place) {
    const modal = document.getElementById('modal');
    const modalBody = modal.querySelector('.modal-body');

    const spotsHTML = place.photo_spots && place.photo_spots.length > 0
        ? place.photo_spots.map(spot => `
            <div class="photo-spot-card">
                <div class="photo-spot-image">
                    <img src="${spot.image}" alt="${spot.name}" loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'">
                </div>
                <div class="photo-spot-info">
                    <h4>${spot.name}</h4>
                    <p>${spot.description}</p>
                </div>
            </div>
        `).join('')
        : '<p style="text-align:center;color:#888;">ยังไม่มีข้อมูลจุดถ่ายรูป</p>';

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>📷 ${place.name}</h2>
            <p>${place.name_th}</p>
        </div>
        <div class="photo-spots-grid">
            ${spotsHTML}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Setup modal events
function setupModalEvents() {
    const modal = document.getElementById('modal');

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Update time display
function updateTime() {
    const now = new Date();
    const taipeiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));

    const timeStr = taipeiTime.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const dateStr = taipeiTime.toLocaleDateString('th-TH', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });

    const timeEl = document.getElementById('current-time');
    if (timeEl) {
        timeEl.textContent = `${dateStr} ${timeStr}`;
    }
}

// Event listeners for tabs
document.querySelectorAll('.day-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        showDay(tab.dataset.day);
    });
});

// Event listeners for filters
document.querySelectorAll('.filter-btn').forEach(btn => {
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
