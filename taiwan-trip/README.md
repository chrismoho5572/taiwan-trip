# 🇹🇼 Taiwan Trip - Interactive Travel Website

เว็บแอพท่องเที่ยวไต้หวัน 5 วัน 4 คืน พร้อม real-time status และจุดถ่ายรูปแนะนำ!

![Taiwan Trip Preview](https://images.unsplash.com/photo-1530321341288-9d0dfb970801?w=1200)

---

## ✨ Features

| Feature | Status |
|---------|--------|
| 📅 แผนทริป 5 วัน พร้อมกิจกรรม | ✅ |
| 📍 15 สถานที่ พร้อมรูปภาพ | ✅ |
| ⏰ Real-time เวลาเปิด-ปิด (ตามเวลาไทเป) | ✅ |
| 🟢 สถานะ เปิด/ปิด อัพเดท auto | ✅ |
| 📷 จุดถ่ายรูปแนะนำ + Reference | ✅ |
| 🔍 กรองตามประเภท | ✅ |
| 📱 Responsive (มือถือ friendly) | ✅ |
| 🎨 UI สวยแบบเว็บท่องเที่ยวจริง | ✅ |

---

## 📱 Screenshots

### Hero Section
```
┌─────────────────────────────────┐
│      🇹🇼                         │
│   Taiwan Trip 2026              │
│   5 วัน 4 คืน                    │
│   📅 10-15 เมษายน 2026          │
│   🌤️ 22°C | อา. 29 มี.ค. 14:30  │
└─────────────────────────────────┘
```

### Place Cards
```
┌─────────────────────────┐
│  [Image with Status]    │
│  🟢 เปิด                 │
├─────────────────────────┤
│  Ay-Chung Noodles       │
│  เส้นหมี่แห้วอาจง        │
│  ⏰ 09:00-23:00         │
│  📷 ดูจุดถ่ายรูปแนะนำ    │
└─────────────────────────┘
```

### Photo Spots Modal
```
┌─────────────────────────────────┐
│  📷 Jiufen Old Street          │
│  ถนนเก่าจิ่วเฟิ่น             │
├─────────────────────────────────┤
│  [Photo Spot Image]             │
│  📷 ซอยโคมไฟแดง                │
│  จุดถ่ายรูปสุดคลาสสิก...       │
└─────────────────────────────────┘
```

---

## 🚀 Deploy ขึ้น Cloudflare Pages

### Step 1: สร้าง GitHub Repository

```bash
# ในเครื่องคุณ
cd taiwan-trip
git init
git add .
git commit -m "Initial commit - Taiwan Trip App"
git remote add origin https://github.com/YOUR_USERNAME/taiwan-trip.git
git push -u origin main
```

### Step 2: ลงทะเบียน Cloudflare Pages

1. ไปที่ **[dash.cloudflare.com](https://dash.cloudflare.com)**
2. คลิก **Pages** (เมนูซ้าย)
3. คลิก **Create a project**
4. เลือก **Connect to Git**
5. Authorize GitHub
6. เลือก repository `taiwan-trip`

### Step 3: ตั้งค่า Build

| Setting | Value |
|---------|-------|
| Project name | `taiwan-trip` |
| Production branch | `main` |
| Build command | *(เว้นว่าง)* |
| Build output directory | `/` |
| Root directory | `/` *(ไม่ต้องเปลี่ยน)* |

### Step 4: Deploy!

คลิก **Save and Deploy** → รอ 1-2 นาที

### Step 5: URL ของคุณ

```
https://taiwan-trip.pages.dev
```

หรือตั้ง custom domain เช่น `taiwan.yourname.com`

---

## 📁 โครงสร้างไฟล์

```
taiwan-trip/
├── index.html          ← หน้าเว็บหลัก
├── style.css           ← CSS สวยๆ
├── app.js              ← Logic (real-time, modal, filter)
├── data/
│   └── places.json     ← 15 สถานที่ + photo spots
└── README.md           ← ไฟล์นี้
```

---

## 🎨 ปรับแต่ง

### เพิ่มสถานที่ใหม่

แก้ไข `data/places.json`:

```json
{
  "name": "ชื่อสถานที่ (English)",
  "name_th": "ชื่อไทย",
  "type": "attraction | food | restaurant | shopping | night_market",
  "area": "ชื่อย่าน",
  "hours": {
    "open": "09:00",
    "close": "22:00"
  },
  "image": "https://images.unsplash.com/...",
  "description": "คำอธิบายสั้นๆ",
  "photo_spots": [
    {
      "name": "ชื่อจุดถ่ายรูป",
      "description": "คำแนะนำ",
      "image": "https://images.unsplash.com/..."
    }
  ]
}
```

### เปลี่ยนวันที่ทริป

แก้ไข `index.html`:
```html
<p class="dates">📅 10-15 เมษายน 2026</p>
```

และ `app.js` ใน object `itinerary`

---

## 📷 รูปภาพ

ใช้ Unsplash URLs (ฟรี ไม่ต้องลงทะเบียน):

```
https://images.unsplash.com/photo-XXXXX?w=800
```

เปลี่ยน `XXXXX` เป็น photo ID จาก unsplash.com

---

## 🎓 สิ่งที่ได้เรียนรู้จากโปรเจกต์นี้

### HTML
- Semantic tags (`<header>`, `<main>`, `<section>`, `<nav>`)
- Modal structure
- Responsive meta tags

### CSS
- Flexbox & Grid layouts
- Gradients & overlays
- Animations (`@keyframes`)
- Responsive breakpoints
- CSS variables (optional)

### JavaScript
- `fetch()` - โหลด JSON
- `Date` & Timezone handling
- `setInterval()` - real-time updates
- Modal events (open/close)
- Filter functionality
- Event delegation

### JSON
- Array of objects structure
- Nested data (photo_spots)

---

## ❓ FAQ

**Q: ฟรีไหม?**
A: ใช่! Cloudflare Pages ฟรีสำหรับทุกคน

**Q: ต้องมี server ไหม?**
A: ไม่ต้อง! เป็น static website รันได้ทุกที่

**Q: อัพเดทยากไหม?**
A: แก้ไขไฟล์ → git push → เสร็จ! Cloudflare auto-deploy

**Q: ใช้กับมือถือได้ไหม?**
A: ได้! Responsive design 100%

**Q: เพิ่มสถานที่ได้ไหม?**
A: ได้! แก้ไข `data/places.json`

---

## 📝 TODO / อยากเพิ่มต่อ

- [ ] Google Maps integration
- [ ] Weather API (real-time)
- [ ] Budget tracker
- [ ] Checklist ก่อนไป
- [ ] Share button
- [ ] PWA (installable app)

---

## 🌿 Made with ❤️ by Moss

โปรเจกต์นี้เป็นส่วนหนึ่งของการเรียนรู้ **Coding + AI** ของนายท่าน

---

**อัพเดทล่าสุด:** 29 มีนาคม 2026
