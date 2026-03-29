# 🇹🇼 Taiwan Trip Web App

เว็บแอพสำหรับทริป Taiwan 5 วัน 4 คืน

## Features

- ✅ แผนทริป 5 วัน
- ✅ เวลาเปิด-ปิดร้านแบบ real-time (ตามเวลาไทเป)
- ✅ บอกสถานะ ว่าร้าน "เปิด" หรือ "ปิด" ตอนนี้
- ✅ กรองตามประเภท (อาหาร, ช้อปปิ้ง, สถานที่)
- ✅ Responsive (ดูได้บนมือถือ)

---

## 📁 โครงสร้างไฟล์

```
taiwan-trip/
├── index.html       ← หน้าเว็บหลัก
├── style.css        ← ความสวยงาม
├── app.js           ← Logic และ real-time
├── data/
│   └── places.json  ← ข้อมูลร้าน + เวลา
└── README.md        ← ไฟล์นี้
```

---

## 🚀 Deploy ขึ้น Cloudflare Pages (ฟรี!)

### Step 1: สร้าง Git Repository

```bash
# สร้าง repo ใหม่บน GitHub (หรือ GitLab)
# แล้ว push code ขึ้นไป

git init
git add .
git commit -m "Taiwan Trip App"
git remote add origin https://github.com/YOUR_USERNAME/taiwan-trip.git
git push -u origin main
```

### Step 2: ลงทะเบียน Cloudflare Pages

1. ไปที่ [dash.cloudflare.com](https://dash.cloudflare.com)
2. คลิก **Pages** ในเมนูซ้าย
3. คลิก **Create a project**
4. เลือก **Connect to Git**
5. เชื่อมต่อ GitHub account
6. เลือก repository `taiwan-trip`

### Step 3: ตั้งค่า

| Setting | Value |
|---------|-------|
| Project name | `taiwan-trip` (หรือชื่ออื่น) |
| Production branch | `main` |
| Build command | (เว้นว่าง) |
| Build output directory | `/` |

7. คลิก **Save and Deploy**

### Step 4: เสร็จแล้ว! 🎉

Cloudflare จะให้ URL มา เช่น:
```
https://taiwan-trip.pages.dev
```

---

## 🔄 อัพเดทเว็บ

ทุกครั้งที่ push code ใหม่ไป GitHub Cloudflare จะ auto deploy!

```bash
git add .
git commit -m "Update places"
git push
```

---

## 🌐 Custom Domain (Optional)

ถ้ามี domain ของตัวเอง:

1. Cloudflare Pages → Settings → Custom domains
2. Add domain เช่น `taiwan.yourname.com`
3. รอ DNS propagation

---

## 📝 แก้ไขข้อมูลร้าน

แก้ไขไฟล์ `data/places.json`:

```json
{
  "name": "ชื่อร้าน (English)",
  "name_th": "ชื่อร้าน (ไทย)",
  "type": "food | restaurant | shopping | attraction | night_market",
  "area": "ชื่อพื้นที่",
  "hours": {
    "open": "09:00",
    "close": "22:00",
    "note": "หมายเหตุ"
  },
  "lat": 25.0424,
  "lng": 121.5085
}
```

---

## 🎓 เรียนรู้จากโปรเจกต์นี้

### HTML (`index.html`)
- โครงสร้างหน้าเว็บ
- การใช้ `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- การเชื่อม CSS และ JavaScript

### CSS (`style.css`)
- Flexbox layout
- Responsive design
- การใช้ class และ selector
- สี และ shadow

### JavaScript (`app.js`)
- `fetch()` - โหลดข้อมูล JSON
- `addEventListener()` - รับ event จาก user
- `setInterval()` - อัพเดทเวลาทุกวินาที
- Date และ TimeZone

### JSON (`data/places.json`)
- รูปแบบข้อมูลแบบ array of objects
- Key-value pairs

---

## ❓ คำถาม

**Q: ฟรีไหม?**
A: ใช่! Cloudflare Pages ฟรีสำหรับทุกคน

**Q: ต้องมี server ไหม?**
A: ไม่ต้อง! Cloudflare host ให้

**Q: อัพเดทยากไหม?**
A: แก้ไขไฟล์ → git push → เสร็จ!

---

Made with 🌿 by Moss
