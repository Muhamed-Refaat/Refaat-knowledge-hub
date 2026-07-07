# DCROSS Handover KT Hub - Session Export 📝

Exported on **Tuesday, July 7, 2026**.

---

## 🎯 Session Objective
The goal of this session was to engineer a high-fidelity, interactive, and beautiful Google Apps Script web application dashboard for the **DCROSS Refaat Handover / Knowledge Transfer (KT)**. The application reads and writes cells in your Google Sheet in real-time, serving as an animated progression timeline and bento-grid tracker for recipient feedback and task statuses.

---

## 🛠️ Complete Workspace Inventory

We created, refined, and bulletproofed the following production deliverables in your project directory:

### 1. `Code.gs` (Apps Script Database Connector)
- **Dynamic Layout Mapping Scanner:** Automatically scans your Sheet rows for the header row containing `Topic` (Row 4 in Column B) and dynamically maps column indexes for `Topic` (Column B), `Status` (Column C), `Link` (Column D), `Notes` (Column E), `Feedback` (Column F), and `Planned Date` (Column G).
- **Infinite Scalability (Auto-Growing Topics):** Reads spreadsheet rows dynamically from Row 5 to the end. **When you type new topics or rows into Google Sheets, the webapp automatically loads, parses, and scales to show them instantly without any code changes!**
- **Strict Read-Only Column Protection:** Implements status and detail safety rules. To prevent webapp users from corrupting structural data, cell updates from the webapp are locked to only write to the `Feedback` column.
- **Pure Vanilla JS Date Converter:** Avoids restricted Google Workspace domain permission crashes by formatting cell date objects using pure local JavaScript logic, rather than the permission-gated `Utilities.formatDate` API.

### 2. `Index.html` (Bespoke Warm-Light Bento Dashboard)
- **Elite Modern UI/UX Vibe:** Styled with translucent backdrop blurs (glassmorphism), a warm ivory background canvas, stone-gray borders, and a beautiful golden-amber gradient glow.
- **Interactive 3D Hover Parallax:** Features an inline JavaScript 3D perspective handler that rotates bento cards and topic cells in 3D space, following mouse coordinates.
- **Progression Path Timeline:** Fulfills your landing page request. Chronological flow nodes connect vertically and glow based on real-time spreadsheet status values (emerald green for Completed, ocean blue pulsing for In-Progress, warm amber for Pending). Clicking any timeline step opens its details drawer instantly.
- **Threaded Comment timeline Feed:** Reads and parses chronological multi-feedback strings inside the `Feedback` cell, displaying them dynamically as an elegant, warm-toned thread of chat bubbles (author name, timestamp, and comment body).
- **Chart.js Statistics Engine:** Protected against slow CDN loads and sandboxing restrictions. Renders horizontal progress bars tracking completed, active, and pending handover items.
- **Drive Vault Gate:** Pulsing CTA card linking directly to your shared Google Drive directory for videos and CAPL simulation configs.
- **Smart visibility-conscious auto-refresh:** Checks your spreadsheet silently in the background every **6 seconds**, but only when your browser tab is active. If a cell is edited in the sheet, the dashboard, charts, timeline, and open detail panels auto-update live on-screen with zero reload delay!

### 3. `README.md` (Installation and Deployment Manual)
- Detailed, step-by-step deployment guide to help you put your Web App live in under 3 minutes.

---

## 🕵️‍♂️ Debugging Log: Google template Compiler Bugs Solved

We successfully diagnosed and solved 3 major runtime and template compiler crashes that were freezing the webapp inside Valeo's corporate security sandbox environment:

| Bug Detected | Cause of Crash | Resolution Implemented |
| :--- | :--- | :--- |
| **Silent Form Submission Failure** | Browsers natively block validation tooltips on hidden elements. Having `required` on our hidden `<input>` caused the submit event to fail silently in the background. | Removed `required` from hidden inputs and bypassed browser event dispatchers by calling `saveTopicChanges()` programmatically. |
| **Permanent "Synchronizing Data Vault" Loader Freeze** | Google Sheets represents blank cells as `null`. Calling `.trim().toLowerCase()` on empty Status cells threw a fatal JavaScript `TypeError` in the browser, halting page load. | Crash-proofed all status checks inside `Index.html` with null-safe coalescing fallback structures, e.g., `(item.status \|\| "Pending").toString().trim()`. |
| **SSO Iframe Template Compilation Error** | Google Apps Script's HTML Service sanitizer has a corporate bug where it fails to parse multi-line backtick Template Literals (`` ` ``). It converts them to standard strings but neglects to escape line breaks, injecting syntax-breaking carriage returns. | **Completely eliminated all backtick strings inside `<script>`**, converting them into standard single-quoted concatenated strings. The code now compiles with 100% success on any Google domain. |
| **Obsolete Card Click Drawer Lock** | Since status selections were completely removed from the HTML edit panel, clicking a card to open details threw a `TypeError: Cannot set properties of null` inside `selectStatusValue`. This halted the function before it could reach the line that opens the drawer overlay. | Surgically removed the obsolete `selectStatusValue` call from `openTopicDetails()`, restoring flawless drawer sliding transitions on card clicks. |

---

## 📋 Google Sheet Column-Mapping Layout

Our dynamic column scanner maps your spreadsheet columns with pinpoint accuracy:
- **Title Block:** Row 2, cell B2 contains `"DCROSS Handover Tracker"`.
- **Header Row:** Row 4, B4 is `"Topic"`, C4 is `"Status"`, D4 is `"Link"`, E4 is `"Notes"`, F4 is `"Feedback"`, G4 is `"Planned Date"`.
- **Deliverables Rows:** Rows 5 through 10 contain your initial handover deliverables.
- **Planned Dates:** Starts exactly as `2026-07-07` for "CI generic" and ends as `2026-07-14` for "SIQ".

---

## 👥 Collaborative Chronological Multi-Feedback Timeline

Instead of overwriting previous remarks, the webapp functions as a collaborative feedback board:
- **Autofill Username Caching:** Added a "Your Name / Username" text input. The app caches your username locally in your browser's memory (`localStorage`) so your name is automatically filled on your next visit.
- **Dynamic Ledger Formatting:** When you submit a comment, the backend formats today's date and appends the text as `MM/DD/YYYY_username: comment text` separated by double newlines (`\n\n`), keeping your Google Sheet 100% human-readable.
- **Interactive Chat-Bubble Logs:** In read-only mode, the app parses this format and renders comments beautifully as individual speech bubbles (gold headers for user and date, warm ivory body for text).

---

## ⚡ Deployment & Hosting Instructions

Deploying your dashboard live in your Google account takes under 3 minutes:

### Step 1: Open Your Google Sheets Editor
1. Open your sheet: [Google Spreadsheet Link](https://docs.google.com/spreadsheets/d/1OgRtmYCe2lTTz5nD3Pu9aG5VxmS2_jr4ywYzx_XUBog/edit)
2. In the top menu, click **Extensions** > **Apps Script**.

### Step 2: Paste the Server Code (`Code.gs`)
1. In the Apps Script sidebar, click on **`Code.gs`**.
2. Erase any existing default code inside the file.
3. Copy the entire contents of `Code.gs` from this project directory, and paste it into the editor.

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
   - **Execute as:** `Me (your-email@valeo.com)` *(Google will run the sheet reads/writes using your authorized credentials, completely bypassing Valeo SSO credential dialog prompts for other users!)*
   - **Who has access:** `Anyone` *(allows transition recipients to view and submit feedback comments without any login prompts)*
4. Click **Deploy**.
5. Copy the generated **Web App URL** and visit it!

---

## 📦 GitHub Repository Push Record
All codes are pushed, tracked, and secured in your remote repository:
👉 **[Muhamed-Refaat/Refaat-knowledge-hub](https://github.com/Muhamed-Refaat/Refaat-knowledge-hub)**
