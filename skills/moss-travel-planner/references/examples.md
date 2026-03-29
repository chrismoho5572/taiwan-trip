# Examples & Templates

## Example Places Data

### Attraction
```json
{
  "name": "Taipei 101",
  "name_th": "ไทเป 101",
  "type": "attraction",
  "area": "Xinyi District",
  "hours": {
    "open": "10:00",
    "close": "21:00"
  },
  "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  "description": "ตึกที่สูงที่สุดในไทเป ชมวิวเมือง 360 องศา",
  "photo_spots": [
    {
      "name": "ฐานตึกมุมต่ำ",
      "description": "ยืนมองขึ้นไป ใช้ wide angle",
      "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
    }
  ],
  "lat": 25.0340,
  "lng": 121.5645
}
```

### Restaurant
```json
{
  "name": "Din Tai Fung",
  "name_th": "ติ่มซำต้นตำรับ",
  "type": "restaurant",
  "area": "Xinyi District",
  "hours": {
    "open": "11:00",
    "close": "21:30"
  },
  "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800",
  "description": "ร้านติ่มซำระดับมิชลิน ต้องจองคิว!",
  "photo_spots": [
    {
      "name": "เซ็ตอาหาร",
      "description": "ถ่าย top-down Xiao Long Bao",
      "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600"
    }
  ]
}
```

### Night Market
```json
{
  "name": "Shilin Night Market",
  "name_th": "ตลาดกลางคืนซือหลิน",
  "type": "night_market",
  "area": "Shilin District",
  "hours": {
    "open": "16:00",
    "close": "01:00"
  },
  "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
  "description": "ตลาดกลางคืนใหญ่ที่สุดในไทเป",
  "photo_spots": [
    {
      "name": "ซอยอาหาร",
      "description": "ถ่ายบรรยากาศ ใช้ high ISO",
      "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600"
    }
  ]
}
```

## Timezone List

Common timezones for CONFIG.timezone:

| Destination | Timezone |
|-------------|----------|
| Taiwan | `Asia/Taipei` |
| Japan | `Asia/Tokyo` |
| Korea | `Asia/Seoul` |
| Thailand | `Asia/Bangkok` |
| Vietnam | `Asia/Ho_Chi_Minh` |
| Singapore | `Asia/Singapore` |
| Hong Kong | `Asia/Hong_Kong` |
| Bali | `Asia/Makassar` |
| Europe | `Europe/London`, `Europe/Paris` |
| USA East | `America/New_York` |
| USA West | `America/Los_Angeles` |

## Flag Emojis

Common flags:

| Country | Emoji |
|---------|-------|
| Taiwan | 🇹🇼 |
| Japan | 🇯🇵 |
| Korea | 🇰🇷 |
| Thailand | 🇹🇭 |
| Vietnam | 🇻🇳 |
| Singapore | 🇸🇬 |
| Hong Kong | 🇭🇰 |
| Indonesia | 🇮🇩 |
| UK | 🇬🇧 |
| France | 🇫🇷 |
| USA | 🇺🇸 |

## Unsplash Search Tips

1. Go to unsplash.com
2. Search for destination name
3. Click on image you like
4. Copy the photo ID from URL:
   ```
   https://unsplash.com/photos/ABC123456
   → ID is: ABC123456
   ```
5. Use in URL:
   ```
   https://images.unsplash.com/photo-ABC123456?w=800
   ```

Size parameters:
- `w=800` - cover images
- `w=600` - photo spots
- `w=1200` - hero backgrounds
