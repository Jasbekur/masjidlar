# 🕌 Masjidlar.uz — Mosque Volunteer & Charity Platform

A website for all mosques in Uzbekistan where volunteers can find tasks and mosques can publish charity campaigns.

## 🚀 How to Publish Your Website (FREE)

### Option 1: Vercel (Recommended — Easiest)

**Step 1: Create a GitHub account**
1. Go to https://github.com
2. Click "Sign Up" and create a free account
3. Verify your email

**Step 2: Upload your project to GitHub**
1. After logging into GitHub, click the **"+"** button (top-right) → **"New repository"**
2. Name it: `masjidlar-uz`
3. Keep it **Public**
4. Click **"Create repository"**
5. On the next page, click **"uploading an existing file"**
6. Drag and drop ALL the files from the unzipped `masjidlar-uz` folder
   - Make sure to include: `package.json`, `vite.config.js`, `index.html`, `.gitignore`, and the `src` folder
7. Click **"Commit changes"**

**Step 3: Deploy on Vercel**
1. Go to https://vercel.com
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Once logged in, click **"Add New..."** → **"Project"**
4. You'll see your `masjidlar-uz` repository — click **"Import"**
5. Leave all settings as default (Vercel auto-detects Vite)
6. Click **"Deploy"**
7. Wait 1-2 minutes... Done! 🎉

Your site will be live at: `https://masjidlar-uz.vercel.app`

**Step 4: Custom domain (optional)**
1. Buy a domain like `masjidlar.uz` from any domain registrar
2. In Vercel dashboard → your project → "Settings" → "Domains"
3. Add your domain and follow the DNS instructions

---

### Option 2: Netlify (Also Easy)

1. Go to https://netlify.com and sign up with GitHub
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy site"

---

## 💻 Run Locally (to test before publishing)

If you want to see the website on your computer first:

1. Install Node.js from https://nodejs.org (download the LTS version)
2. Open Terminal (Mac) or Command Prompt (Windows)
3. Navigate to the project folder:
   ```
   cd path/to/masjidlar-uz
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Start the development server:
   ```
   npm run dev
   ```
6. Open your browser and go to: http://localhost:5173

---

## 🔑 Admin Panel

- Click "Admin Panel" button in the top-right of the website
- Default PIN: `1234`
- To change the PIN, edit `src/App.jsx` and search for `1234`, replace with your PIN

## 📝 Notes

- This is a frontend-only app — data resets when the page refreshes
- For permanent data storage, you'll need a backend (like Firebase or Supabase)
- Ask Claude to help you add a database if needed!
