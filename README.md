# DCROSS Handover KT Hub & Dashboard 🚀

A highly-visual, modern Bento-grid dashboard web application designed specifically for the **DCROSS Refaat Knowledge Transfer (KT) Handover**. 

This application connects dynamically to your Google Sheet, serving as a responsive, animated dashboard for tracking KT topics, verification statuses, and recipient feedback.

---

## 🎨 Design Features (AetherForge Elite-SaaS Vibe)
- **Fluid Light Theme:** Warm ivory and cream hues with golden/amber accents (`#D97706`).
- **Interactive 3D Hover Parallax:** Hovering on any Bento card or topic card tilts it dynamically using CSS 3D perspectives mapped to mouse coordinates.
- **Dynamic Handover Progression Path:** Connects topics in a glowing timeline that corresponds directly to progress and planned sequences. Clicking timeline steps highlights cards instantly.
- **Embedded Real-Time Analytics:** Uses `Chart.js` to render horizontal progress bars of completed, active, and pending handover items.
- **Drive Vault Integration:** Immersive, pulsing quick-launch cards linking directly to transition recordings, simulation scripts, and video materials on Google Drive.
- **Strict Read-Only Guardrails:** Prevents accidental overwrites of critical dates, topic names, and transition notes from the webapp. Only **Transition Status** and **Team Feedback Remarks** can be edited from the web interface, making it a safe, collaborative recipient feedback system.

---

## 📂 Codebase File Mapping

1. **`Code.gs`** - The Google Apps Script server-side database handler. Automatically maps columns by looking for headers (`Topic`, `Status`, `Link`, etc.) and restricts writes strictly to status and feedback cells.
2. **`Index.html`** - The unified frontend. Fully responsive, lightweight (no heavy framework lag), and packs both the GAS live syncer and auto-detecting mock engines.
3. **`local_preview.html`** - A standalone copy of the frontend hardlocked in local-staged mode. **Double-click this file to play with the animations, grids, charts, and feedback form right now in your browser!**

---

## ⚡ Deployment & Hosting Instructions

Deploying your dashboard live in your Google account takes under 3 minutes:

### Step 1: Open Your Google Sheets Editor
1. Visit your sheet: [Google Spreadsheet Link](https://docs.google.com/spreadsheets/d/1OgRtmYCe2lTTz5nD3Pu9aG5VxmS2_jr4ywYzx_XUBog/edit)
2. In the top menu, click **Extensions** > **Apps Script**.

### Step 2: Paste the Server Code (`Code.gs`)
1. In the Apps Script sidebar, click on **`Code.gs`**.
2. Erase any existing default code inside the file.
3. Open `Code.gs` from this project directory, copy its entire contents, and paste it into the editor.
4. If your sheet structure differs from the template, verify that you have a header row containing `Topic`, `Status`, `Link`, `Notes`, `Feedback`, and `Planned Date` (order does not matter!).

### Step 3: Create and Paste the Frontend Template (`Index.html`)
1. In the Apps Script sidebar, click the **`+` (plus sign)** icon next to *Files* and select **HTML**.
2. Name the file exactly **`Index`** (Apps Script will append `.html` automatically).
3. Delete all default code in the newly created `Index.html` file.
4. Copy the entire contents of `Index.html` from this project directory and paste it into the script editor.
5. Click the **Save** (floppy disk) icon at the top of the editor.

### Step 4: Deploy as a Web Application 🌐
1. In the top right corner of the Apps Script dashboard, click **Deploy** > **New deployment**.
2. Click the gear icon (**Select type**) and select **Web app**.
3. Configure the settings exactly as follows:
   - **Description:** `DCROSS Refaat Handover KT Dashboard`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone` (This is required so transition recipients can view and write feedback without needing custom workspace permissions!).
4. Click **Deploy**.
5. Google will prompt you to authorize permissions. Click **Authorize access**, choose your account, click **Advanced** > **Go to DCROSS Handover KT Hub (unsafe)**, and click **Allow**.
6. **Done!** Copy the generated **Web App URL** and share it with the team.

---

## 🧪 Instant Local Demonstration
Don't want to wait for deployment? 
Double-click **`local_preview.html`** located inside this workspace directory. It will open immediately in your web browser. You can click on topic cards, filter by "Done" or "Pending" tabs, search for custom terms, rotate elements in 3D, and modify statuses or add feedback to see the live analytics charts recalculate on-the-fly!
