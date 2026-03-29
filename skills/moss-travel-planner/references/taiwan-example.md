# Taiwan Example

ดูไฟล์ตัวอย่างที่สร้างไว้แล้วที่:

```
taiwan-trip/
├── index.html        ← หน้าเว็บ
├── style.css         ← สไตล์
├── app.js            ← Logic
├── data/
│   └── places.json   ← 15 สถานที่
└── README.md         ← Deploy guide
```

## Features Implemented

- ✅ 5 วัน 4 คืน itinerary
- ✅ 15 สถานที่พร้อมรูป
- ✅ Real-time open/close status
- ✅ จุดถ่ายรูปแนะนำ
- ✅ Filter ตามประเภท
- ✅ Modal แสดง photo spots
- ✅ Responsive design
- ✅ Deploy guide (Cloudflare Pages)

## Key Code Patterns

### Timezone Handling
```javascript
const CONFIG = {
    timezone: "Asia/Taipei"
};

const localTime = new Date(
    now.toLocaleString('en-US', {
        timeZone: CONFIG.timezone
    })
);
```

### Status Badge
```javascript
function getPlaceStatus(place) {
    // Check if open based on hours
    const isOpen = currentMinutes >= openMinutes
        && currentMinutes <= closeMinutes;
    return { isOpen };
}
```

### Photo Spots Modal
```javascript
function showPhotoSpotsModal(place) {
    // Render photo spots with images
    // Display in modal overlay
}
```

## Deployment

1. Push to GitHub
2. Cloudflare Pages → Connect
3. Build output: `/`
4. URL: `https://project.pages.dev`
