/**
 * DCROSS Refaat Handover Tracker & KT Dashboard
 * Google Apps Script Backend (Code.gs)
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1OgRtmYCe2lTTz5nD3Pu9aG5VxmS2_jr4ywYzx_XUBog/edit
 * 2. Click Extensions > Apps Script.
 * 3. Delete any code in Code.gs and paste this code.
 * 4. Create an HTML file named 'Index.html' and paste the Index.html code into it.
 * 5. Deploy as a Web App (Deploy > New deployment > Web app > Execute as Me, Who has access: Anyone).
 */

// If your script is bound to the spreadsheet, leave this as null.
// If it's a standalone script, enter the Spreadsheet ID here.
const SPREADSHEET_ID = "1OgRtmYCe2lTTz5nD3Pu9aG5VxmS2_jr4ywYzx_XUBog";
const SHEET_NAME = ""; // Leave blank to use the active or first sheet

/**
 * Serves the HTML frontend when the web app URL is visited.
 */
function doGet(e) {
  const template = HtmlService.createTemplateFromFile("Index");
  return template.evaluate()
    .setTitle("DCROSS Handover KT Hub")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Helper to open the spreadsheet (either bound or by ID).
 */
function getSpreadsheet() {
  if (SPREADSHEET_ID) {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      Logger.log("Failed to open spreadsheet by ID: " + e.toString());
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Helper to get the correct sheet.
 */
function getSheet() {
  const ss = getSpreadsheet();
  if (!ss) {
    throw new Error("Unable to access spreadsheet. Please bind the script or provide a valid Spreadsheet ID.");
  }
  
  if (SHEET_NAME) {
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (sheet) return sheet;
  }
  return ss.getSheets()[0]; // Default to first sheet
}

/**
 * Finds column indices dynamically by scanning for header row.
 * Returns a mapping of column names to 0-based array indices.
 */
function getColumnMapping(values) {
  const mapping = {
    topicIdx: -1,
    statusIdx: -1,
    linkIdx: -1,
    notesIdx: -1,
    feedbackIdx: -1,
    dateIdx: -1,
    headerRowNum: -1
  };
  
  for (let r = 0; r < values.length; r++) {
    const row = values[r];
    for (let c = 0; r < 10 && c < row.length; c++) { // Search first 10 rows
      const val = String(row[c]).trim().toLowerCase();
      if (val === "topic") mapping.topicIdx = c;
      if (val === "status") mapping.statusIdx = c;
      if (val === "link") mapping.linkIdx = c;
      if (val === "notes") mapping.notesIdx = c;
      if (val === "feedback") mapping.feedbackIdx = c;
      if (val === "planned date" || val === "planned_date" || val === "date") mapping.dateIdx = c;
    }
    
    // If we found at least the Topic header, assume this is the header row
    if (mapping.topicIdx !== -1) {
      mapping.headerRowNum = r + 1; // 1-based row number
      break;
    }
  }
  
  return mapping;
}

/**
 * Reads all handover topics and statuses from the sheet.
 */
function getData() {
  try {
    const sheet = getSheet();
    const values = sheet.getDataRange().getValues();
    const mapping = getColumnMapping(values);
    
    if (mapping.headerRowNum === -1) {
      return {
        success: false,
        error: "Could not locate header row containing 'Topic'. Please check spreadsheet format."
      };
    }
    
    const data = [];
    const startRowIdx = mapping.headerRowNum; // Rows below header
    
    for (let r = startRowIdx; r < values.length; r++) {
      const row = values[r];
      // Skip empty rows or rows without a topic name
      const topicName = mapping.topicIdx !== -1 && row[mapping.topicIdx] ? String(row[mapping.topicIdx]).trim() : "";
      if (!topicName || topicName === "") continue;
      
      const statusVal = mapping.statusIdx !== -1 && row[mapping.statusIdx] ? String(row[mapping.statusIdx]).trim() : "Pending";
      const linkVal = mapping.linkIdx !== -1 && row[mapping.linkIdx] ? String(row[mapping.linkIdx]).trim() : "";
      const notesVal = mapping.notesIdx !== -1 && row[mapping.notesIdx] ? String(row[mapping.notesIdx]).trim() : "";
      const feedbackVal = mapping.feedbackIdx !== -1 && row[mapping.feedbackIdx] ? String(row[mapping.feedbackIdx]).trim() : "";
      
      // Parse planned date (handle Date object or raw string)
      let dateVal = "";
      if (mapping.dateIdx !== -1 && row[mapping.dateIdx]) {
        const rawDate = row[mapping.dateIdx];
        if (rawDate instanceof Date) {
          dateVal = Utilities.formatDate(rawDate, Session.getScriptTimeZone(), "yyyy-MM-dd");
        } else {
          dateVal = String(rawDate).trim();
        }
      }
      
      data.push({
        rowNum: r + 1, // Store actual 1-based spreadsheet row number
        topic: topicName,
        status: statusVal || "Pending",
        link: linkVal,
        notes: notesVal,
        feedback: feedbackVal,
        plannedDate: dateVal
      });
    }
    
    return {
      success: true,
      data: data,
      mapping: mapping
    };
  } catch (err) {
    return {
      success: false,
      error: err.toString()
    };
  }
}

/**
 * Updates a specific topic row in the Google Sheet (Restricted write fields: Status and Feedback).
 */
function updateTopic(rowNum, status, feedback) {
  try {
    const sheet = getSheet();
    const values = sheet.getDataRange().getValues();
    const mapping = getColumnMapping(values);
    
    if (mapping.headerRowNum === -1) {
      throw new Error("Could not map columns. Header row missing.");
    }
    
    const r = parseInt(rowNum, 10);
    if (isNaN(r) || r < 1 || r > values.length) {
      throw new Error("Invalid row number: " + rowNum);
    }
    
    // Strictly update Status and Feedback ONLY (Read-Only protections for structural cells)
    if (mapping.statusIdx !== -1) {
      sheet.getRange(r, mapping.statusIdx + 1).setValue(status);
    }
    if (mapping.feedbackIdx !== -1) {
      sheet.getRange(r, mapping.feedbackIdx + 1).setValue(feedback);
    }
    
    return {
      success: true,
      message: "Row " + r + " updated successfully on the spreadsheet."
    };
  } catch (err) {
    return {
      success: false,
      error: err.toString()
    };
  }
}
