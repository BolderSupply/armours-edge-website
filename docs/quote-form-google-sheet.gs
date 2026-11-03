// Armours Edge quote form: saves each request to this Google Sheet and emails a copy.
// Paste into Extensions > Apps Script, then deploy as a Web app (see the steps in chat or README).

const SECRET = "PUT-A-LONG-RANDOM-PASSWORD-HERE"; // must match QUOTE_SHEET_SECRET in Vercel
const NOTIFY_EMAIL = "marketing@boldersupply.com"; // who receives each new request

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return reply({ ok: false, error: "unauthorized" });

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Received", "Name", "Email", "Phone", "Town", "Service", "Project details"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), safe(d.name), safe(d.email), safe(d.phone), safe(d.town), safe(d.service), safe(d.details)]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: d.email,
      name: "Armours Edge Website",
      subject: d.subject || "Quote request: " + d.service + " in " + d.town,
      htmlBody: d.html || undefined,
      body: [
        "New quote request from the website",
        "",
        "Name: " + d.name,
        "Email: " + d.email,
        "Phone: " + (d.phone || "Not given"),
        "Town: " + d.town,
        "Service: " + d.service,
        "",
        "Project details:",
        d.details,
      ].join("\n"),
    });
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

// Stops a cell starting with = + - @ from being run as a formula.
function safe(v) {
  const s = String(v == null ? "" : v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
