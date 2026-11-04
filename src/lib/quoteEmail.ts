import { site } from "@/lib/site";

export type QuoteEmailData = {
  name: string;
  email: string;
  phone: string;
  town: string;
  service: string;
  details: string;
};

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const FONT = "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif";

/** Branded HTML email for a new quote request. Uses tables and inline styles so it renders in Gmail and Outlook. */
export function buildQuoteEmailHtml(d: QuoteEmailData, logoSrc: string = `${site.url}/email-logo.png`): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #d4dcd4;width:120px;vertical-align:top;font:700 11px ${FONT};letter-spacing:1.6px;text-transform:uppercase;color:#54625a;">${label}</td>
      <td style="padding:14px 0;border-bottom:1px solid #d4dcd4;vertical-align:top;font:500 15px/1.4 ${FONT};color:#14201a;">${value}</td>
    </tr>`;

  const emailLink = `<a href="mailto:${esc(d.email)}" style="color:#1d5638;text-decoration:underline;">${esc(d.email)}</a>`;
  const phoneValue = d.phone
    ? `<a href="tel:${esc(d.phone.replace(/[^\d+]/g, ""))}" style="color:#14201a;text-decoration:none;">${esc(d.phone)}</a>`
    : "Not given";
  const subject = encodeURIComponent(`Your Armours Edge quote request`);
  const message = esc(d.details).replace(/\r?\n/g, "<br>");

  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f2f5f1;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f5f1;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;">
        <tr>
          <td align="center" style="background:#0e3022;padding:32px 24px 28px;">
            <img src="${logoSrc}" width="190" alt="Armours Edge Landscape Construction" style="display:block;width:190px;height:auto;border:0;margin:0 auto 22px;">
            <div style="font:800 12px ${FONT};letter-spacing:3px;text-transform:uppercase;color:#e3902c;">New quote request</div>
            <div style="font:800 24px/1.2 ${FONT};color:#ffffff;margin-top:8px;">${esc(d.service)}</div>
          </td>
        </tr>
        <tr><td style="background:#e3902c;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr>
          <td style="padding:12px 32px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${row("Name", esc(d.name))}
              ${row("Email", emailLink)}
              ${row("Phone", phoneValue)}
              ${row("Town", esc(d.town))}
              ${row("Service", esc(d.service))}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 8px;">
            <div style="font:700 11px ${FONT};letter-spacing:1.6px;text-transform:uppercase;color:#54625a;margin-bottom:10px;">Project details</div>
            <div style="background:#f2f5f1;border-left:4px solid #e3902c;padding:16px 18px;font:400 15px/1.6 ${FONT};color:#14201a;">${message}</div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:28px 32px 36px;">
            <a href="mailto:${esc(d.email)}?subject=${subject}" style="display:inline-block;background:#e3902c;color:#14201a;text-decoration:none;font:800 13px ${FONT};letter-spacing:1.6px;text-transform:uppercase;padding:15px 30px;">Reply to ${esc(d.name)}</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="background:#0e3022;padding:20px 24px;font:500 11px/1.6 ${FONT};letter-spacing:1.4px;text-transform:uppercase;color:#d3dccf;">
            Armours Edge Landscape Construction &middot; Elmira, Ontario<br>
            <span style="color:#e3902c;">${esc(site.phone)}</span>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
