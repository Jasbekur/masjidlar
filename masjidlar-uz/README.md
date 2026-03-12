# 🕌 Masjidlar.uz — Mosque Volunteer & Charity Platform

Uzbekiston masjidlari uchun volontyorlik va xayriya platformasi.
Volontyorlar ro'yxatdan o'tganda — Telegram orqali xabar keladi!

---

## 🚀 Saytni Nashr Qilish (BEPUL)

### 1-Qadam: GitHub'da hisob oching
1. https://github.com ga boring
2. "Sign Up" bosing, bepul hisob yarating
3. Email'ingizni tasdiqlang

### 2-Qadam: Loyihani GitHub'ga yuklang
1. GitHub'ga kirgandan so'ng, yuqori o'ng burchakdagi **"+"** → **"New repository"**
2. Nom: `masjidlar-uz`
3. **Public** tanlang
4. **"Create repository"** bosing
5. Keyingi sahifada **"uploading an existing file"** bosing
6. Zip fayldan chiqqan barcha fayllarni tortib tashlang
   - `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `src/` papka, `api/` papka
7. **"Commit changes"** bosing

### 3-Qadam: Vercel'da deploy qilish
1. https://vercel.com ga boring
2. **"Sign Up"** → **"Continue with GitHub"** tanlang
3. Kirgandan so'ng: **"Add New..."** → **"Project"**
4. `masjidlar-uz` reponi topib **"Import"** bosing
5. Hamma sozlamalarni default qoldiring
6. **"Deploy"** bosing
7. 1-2 daqiqa kuting... Tayyor! 🎉

Saytingiz manzili: `https://masjidlar-uz.vercel.app`

---

## 📱 TELEGRAM BOT SOZLASH (MUHIM!)

Bu qism volontyorlar ma'lumotlarini Telegram'ga yuborish uchun kerak.

### A. Telegram Bot yaratish (bir marta)

1. **Telegram**'ni oching
2. Qidiruvda **@BotFather** ni toping va oching
3. `/newbot` yozing
4. Botga nom bering: `Masjidlar Volunteer Bot`
5. Username bering: `masjidlar_volunteer_bot` (yoki boshqa bo'sh nom)
6. BotFather sizga **Token** beradi. Masalan:
   ```
   7123456789:AAHfiqksKZ8WmR5gXTqFvB1234567890
   ```
7. Bu tokenni **saqlang** — keyin Vercel'ga kiritamiz

### B. Admin Telegram Chat ID olish

1. Telegram'da **@userinfobot** ni oching
2. `/start` bosing
3. Sizga **Chat ID** raqamingizni beradi (masalan: `123456789`)
4. Bu raqamni saqlang

### C. Har bir masjid uchun Telegram guruh yaratish

Har bir masjid o'z xabarlarini olishi uchun:

1. Telegram'da **yangi guruh** yarating
   - Nom: "Minor Masjidi - Volontyorlar" (masalan)
2. Botingizni guruhga qo'shing:
   - Guruh → "Add Member" → botingiz nomini qidiring
3. Botni **admin** qiling:
   - Guruh sozlamalari → Administrators → Botni qo'shing
4. Guruhga biror xabar yozing (masalan: "salom")
5. Brauzerda bu manzilni oching (YOUR_TOKEN o'rniga tokeningizni qo'ying):
   ```
   https://api.telegram.org/bot7123456789:AAHfiqksKZ8.../getUpdates
   ```
6. Javobda `"chat":{"id":-100xxxxxxxxxx}` ko'rasiz
7. Shu raqamni ko'chirib oling (masalan: `-1001234567890`)
8. Saytda Admin Panel → 📱 Telegram → tegishli masjidga kiriting

### D. Vercel'ga Token va Admin ID kiritish

1. Vercel dashboard → sizning loyihangiz → **Settings** → **Environment Variables**
2. Ikki o'zgaruvchi qo'shing:

   | Nom | Qiymat |
   |-----|--------|
   | `TELEGRAM_BOT_TOKEN` | `7123456789:AAHfiqksKZ8...` (BotFather bergan token) |
   | `TELEGRAM_ADMIN_CHAT_ID` | `123456789` (sizning shaxsiy chat ID) |

3. **Save** bosing
4. Loyihani qayta deploy qiling: **Deployments** → oxirgi deploy → **"..."** → **"Redeploy"**

### Tayyor! ✅

Endi volontyor ro'yxatdan o'tganda:
- ✅ **Sizga** (admin) Telegram'ga xabar keladi
- ✅ **Masjid guruhiga** ham xabar keladi (agar chat ID kiritilgan bo'lsa)
- ✅ Xabarda volontyorning ismi, telefoni, vazifa nomi va vaqti bo'ladi

---

## 🔑 Admin Panel

- Saytda yuqori o'ng burchakda **"🔑 Admin Panel"** bosing
- Standart PIN: **1234**
- PIN'ni o'zgartirish: `src/App.jsx` faylida `1234` ni qidiring va yangisiga almashtiring

### Admin Panel bo'limlari:
- 🕌 **Masjid Qo'shish** — yangi masjid va manzilini kiriting
- 📋 **Vazifa Qo'shish** — volontyorlik vazifasi yarating
- 💚 **Xayriya** — ehson kampaniyasi oching
- 📱 **Telegram** — har bir masjidning Telegram Chat ID'sini sozlang
- ⚙️ **Boshqarish** — masjid, vazifa, xayriyani o'chiring

---

## ⚠️ Muhim Eslatma

Hozircha bu sayt **frontend-only** — ya'ni sahifani yangilaganingizda admin paneldan qo'shgan ma'lumotlar yo'qoladi. Faqat **Telegram xabarlari** saqlanadi chunki ular allaqachon yuborilgan.

Ma'lumotlarni doimiy saqlash uchun **database** (Firebase yoki Supabase) ulash kerak. Buni keyingi qadamda qo'shishimiz mumkin — Claude'dan so'rang!

---

## 📁 Loyiha Tuzilishi

```
masjidlar-uz/
├── api/
│   └── telegram.js      ← Telegram serverless function
├── src/
│   ├── App.jsx           ← Asosiy sayt kodi
│   └── main.jsx          ← React entry point
├── index.html            ← HTML sahifa
├── package.json          ← Dependencies
├── vite.config.js        ← Vite sozlamalari
└── .gitignore
```
