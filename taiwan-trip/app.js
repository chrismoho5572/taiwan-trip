// 🌿 Taiwan Trip App - JavaScript

// ข้อมูลแผนทริปแต่ละวัน
const itinerary = {
    1: {
        title: "Day 1: Taipei Arrival",
        activities: [
            "✈️ เช็คอินโรงแรม",
            "🚶 เดินเล่น Ximending",
            "🍜 กินเย็นที่ Ningxia Night Market"
        ],
        places: ["Ximending Pedestrian Area", "Ay-Chung Flour Rice Noodles", "Ningxia Night Market"]
    },
    2: {
        title: "Day 2: Jiufen + Shifen",
        activities: [
            "🚂 รถไฟไป Ruifang → Jiufen",
            "📷 ถ่ายรูปถนนเก่า Jiufen",
            "🏮 ปล่อยโคมไฟที่ Shifen"
        ],
        places: ["Jiufen Old Street", "Shifen Waterfall", "Shifen Sky Lantern"]
    },
    3: {
        title: "Day 3: Taipei City",
        activities: [
            "🏛️ Chiang Kai-Shek Memorial Hall",
            "🏙️ Taipei 101 + Din Tai Fung",
            "⛰️ Elephant Mountain ช่วงเย็น",
            "🌙 Shilin Night Market"
        ],
        places: ["Chiang Kai-Shek Memorial Hall", "Taipei 101 Observatory", "Din Tai Fung Taipei 101", "Elephant Mountain", "Shilin Night Market"]
    },
    4: {
        title: "Day 4: Day Trip",
        activities: [
            "🪨 เลือก: Yehliu Geopark",
            "🚠 หรือ: Maokong Gondola",
            "♨️ หรือ: Beitou Hot Spring"
        ],
        places: ["Yehliu Geopark", "Maokong Gondola", "Beitou Thermal Valley"]
    },
    5: {
        title: "Day 5: Shopping + Home",
        activities: [
            "🛒 ช้อปปิ้งของฝาก",
            "🧁 ซื้อ Pineapple Cake",
            "✈️ ไปสนามบิน"
        ],
        places: ["Chia Te Bakery", "Ximending Pedestrian Area"]
    }
};

// Global variable สำหรับเก็บข้อมูลสถานที่
let placesData = [];

// โหลดข้อมูลเมื่อหน้าเว็บพร้อม
document.addEventListener('DOMContentLoaded', async () => {
    await loadPlaces();
    showDay(1);
    updateTime();
    setInterval(updateTime, 1000);
    setInterval(updatePlaceStatuses, 60000); // อัพเดททุก 1 นาที
});

// โหลดข้อมูลสถานที่จาก JSON
async function loadPlaces() {
    try {
        const response = await fetch('data/places.json');
        placesData = await response.json();
        renderPlaces(placesData);
    } catch (error) {
        console.error('โหลดข้อมูลไม่สำเร็จ:', error);
    }
}

// แสดงแผนวันที่เลือก
function showDay(day) {
    const data = itinerary[day];
    const main = document.getElementById('content');

    main.innerHTML = `
        <div class="day-card">
            <h2>${data.title}</h2>
            <ul>
                ${data.activities.map(a => `<li>${a}</li>`).join('')}
            </ul>
        </div>
    `;

    // Update tab
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.day == day) {
            tab.classList.add('active');
        }
    });
}

// แสดงรายการสถานที่ทั้งหมด
function renderPlaces(places) {
    const container = document.getElementById('places-container');
    container.innerHTML = places.map(place => {
        const status = getPlaceStatus(place);
        return `
            <div class="place-card" data-type="${place.type}">
                <div class="place-info">
                    <h3>${place.name}</h3>
                    <p>${place.name_th} | ${place.area}</p>
                    <p class="status-time">⏰ ${place.hours.open} - ${place.hours.close}</p>
                </div>
                <div class="place-status">
                    <span class="status-badge ${status.isOpen ? 'open' : 'closed'}">
                        ${status.isOpen ? '🟢 เปิด' : '🔴 ปิด'}
                    </span>
                    <p class="status-time">${status.message}</p>
                </div>
            </div>
        `;
    }).join('');
}

// ตรวจสอบสถานะเปิด/ปิด
function getPlaceStatus(place) {
    const now = new Date();
    // แปลงเป็นเวลาไทเป (UTC+8)
    const taipeiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));

    const [openH, openM] = place.hours.open.split(':').map(Number);
    const [closeH, closeM] = place.hours.close.split(':').map(Number);

    const currentMinutes = taipeiTime.getHours() * 60 + taipeiTime.getMinutes();
    const openMinutes = openH * 60 + openM;
    let closeMinutes = closeH * 60 + closeM;

    // ถ้าปิดหลังเที่ยงคืน (เช่น 01:00)
    if (closeMinutes < openMinutes) {
        closeMinutes += 24 * 60;
    }

    const isOpen = currentMinutes >= openMinutes && currentMinutes <= closeMinutes;

    // คำนวณเวลาที่เหลือ
    let message = '';
    if (isOpen) {
        const minsUntilClose = closeMinutes - currentMinutes;
        const hours = Math.floor(minsUntilClose / 60);
        const mins = minsUntilClose % 60;
        message = hours > 0 ? `ปิดอีก ${hours} ชม. ${mins} น.` : `ปิดอีก ${mins} น.`;
    } else {
        const minsUntilOpen = openMinutes - currentMinutes;
        if (minsUntilOpen > 0) {
            const hours = Math.floor(minsUntilOpen / 60);
            const mins = minsUntilOpen % 60;
            message = hours > 0 ? `เปิดอีก ${hours} ชม. ${mins} น.` : `เปิดอีก ${mins} น.`;
        } else {
            // กรณีผ่านเที่ยงคืนไปแล้ว รอวันใหม่
            const minsUntilOpenTomorrow = (24 * 60) - currentMinutes + openMinutes;
            const hours = Math.floor(minsUntilOpenTomorrow / 60);
            message = `เปิดอีก ${hours} ชม.`;
        }
    }

    return { isOpen, message };
}

// อัพเดทสถานะทุกที่
function updatePlaceStatuses() {
    placesData.forEach(place => {
        const card = document.querySelector(`.place-card[data-type="${place.type}"]`);
        if (card) {
            const status = getPlaceStatus(place);
            const badge = card.querySelector('.status-badge');
            const timeText = card.querySelector('.place-status .status-time');

            badge.className = `status-badge ${status.isOpen ? 'open' : 'closed'}`;
            badge.textContent = status.isOpen ? '🟢 เปิด' : '🔴 ปิด';
            timeText.textContent = status.message;
        }
    });
}

// อัพเดทเวลา
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

    document.getElementById('current-time').textContent = `🇹🇼 ${dateStr} ${timeStr}`;
}

// Event listeners
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        showDay(tab.dataset.day);
    });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter places
        const type = btn.dataset.type;
        const filtered = type === 'all'
            ? placesData
            : placesData.filter(p => p.type === type);

        renderPlaces(filtered);
    });
});
