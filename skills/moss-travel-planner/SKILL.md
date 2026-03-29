---
name: moss-travel-planner
description: Create comprehensive travel itineraries with real-time status, photo spots, and deployable web apps. Use when user wants to plan a trip, create a travel itinerary, build a travel website, or needs information about places to visit with opening hours and photo recommendations. Works for any destination worldwide.
---

# Moss Travel Planner 🌿

Plan trips like a pro with:
- Day-by-day itinerary
- Places with opening hours (real-time status)
- Photo spots with reference images
- Deployable web app (Cloudflare Pages, free!)

## Quick Start

### 1. Gather Information

Ask the user:
- **Destination?** (city/country)
- **Duration?** (X days Y nights)
- **Budget?** (total or per day)
- **Who's going?** (solo, couple, family, group)
- **Interests?** (food, shopping, nature, culture, photography)
- **Dates?** (to check weather/seasonality)

### 2. Research & Plan

For each place, collect:
- **Name** (English + Thai if applicable)
- **Type**: attraction, food, restaurant, shopping, night_market
- **Area/District**
- **Opening hours** (use 24h format: "09:00", "22:00")
- **Cover image** (Unsplash URL)
- **Description** (1-2 sentences)
- **Photo spots** (name + description + reference image)
- **GPS coordinates** (optional)

### 3. Structure the Itinerary

```
Day 1: [Theme/Location]
- Morning: activities
- Afternoon: activities
- Evening: activities
- Places: [list of place names]
```

Balance each day:
- Mix indoor/outdoor activities
- Consider travel time between locations
- Include food breaks
- End with night markets/relaxing spots

### 4. Generate Files

Create in workspace:

```
[destination]-trip/
├── index.html        # Main web page
├── style.css         # Styling
├── app.js            # Logic (real-time status, filters, modals)
├── data/
│   └── places.json   # All place data
└── README.md         # Deploy instructions
```

## Data Format

### places.json

```json
[
  {
    "name": "Place Name",
    "name_th": "ชื่อสถานที่ภาษาไทย",
    "type": "attraction | food | restaurant | shopping | night_market",
    "area": "District Name",
    "hours": {
      "open": "09:00",
      "close": "22:00"
    },
    "image": "https://images.unsplash.com/photo-XXX?w=800",
    "description": "Short description",
    "photo_spots": [
      {
        "name": "Photo spot name",
        "description": "Tips for taking photos here",
        "image": "https://images.unsplash.com/photo-XXX?w=600"
      }
    ],
    "lat": 25.0340,
    "lng": 121.5645
  }
]
```

## Image Sources

Use Unsplash for free, high-quality images:
```
https://images.unsplash.com/photo-[ID]?w=800  # cover
https://images.unsplash.com/photo-[ID]?w=600  # photo spots
```

Search at unsplash.com, copy photo ID from URL.

## Real-Time Features

The web app automatically:
- Shows Taipei time (or destination timezone)
- Displays open/closed status based on current time
- Updates every minute
- Counts down to opening/closing time

## UI Components

### Hero Section
- Destination flag emoji
- Trip title + dates
- Current time + weather badge

### Day Navigation
- Tabs for each day
- Click to see day's activities

### Place Cards
- Cover image with status badge (🟢 open / 🔴 closed)
- Type badge (📷, 🍜, 🛒, etc.)
- Name + local name
- Hours + area
- Description
- "View Photo Spots" button

### Photo Spots Modal
- Opens on button click
- Shows each spot with reference image
- Tips for taking photos

### Filter Section
- Filter by type: All, Attraction, Food, Restaurant, Shopping, Night Market

## Deployment

### Cloudflare Pages (Free)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USER/REPO.git
   git push -u origin main
   ```

2. Connect to Cloudflare:
   - Go to dash.cloudflare.com
   - Pages → Create project → Connect to Git
   - Select repository

3. Configure:
   - Build command: (leave empty)
   - Build output: `/`
   - Deploy

4. URL provided: `https://project-name.pages.dev`

## Tips

### For Food Places
- Mention signature dishes
- Note if reservation needed
- Include typical wait times

### For Photo Spots
- Best time to shoot (golden hour, etc.)
- Camera/lens recommendations
- Angles that work well

### For Night Markets
- Typical opening hours (usually 17:00-01:00)
- Must-try foods
- Bargaining tips if applicable

### Budget Breakdown
```
| Item | Cost (THB) |
|------|-----------|
| Accommodation | X |
| Food | X |
| Transport | X |
| Activities | X |
| Shopping | X |
| Emergency | X |
| Total | X |
```

## Weather Integration

Include current weather in hero section:
- Fetch from wttr.in API
- Show temperature + conditions
- Note: actual implementation requires API call

## Customization

User can:
- Add more places to places.json
- Modify itinerary in app.js
- Change colors in style.css
- Add more days

## Output Checklist

Before presenting to user:
- [ ] All places have images
- [ ] Opening hours are accurate
- [ ] Photo spots have descriptions
- [ ] Budget breakdown included
- [ ] README has deploy instructions
- [ ] Files committed to git

---

Remember: The goal is to create a beautiful, functional travel planner that the user can actually use and share!
