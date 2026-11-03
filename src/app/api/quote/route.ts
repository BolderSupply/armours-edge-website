import { getServiceBySlug } from "@/lib/services";
import { buildQuoteEmailHtml } from "@/lib/quoteEmail";
import { site } from "@/lib/site";

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  town?: unknown;
  service?: unknown;
  details?: unknown;
  company?: unknown;
};

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "The request was not valid. Please try again." }, { status: 400 });
  }

  // Honeypot: pretend success so bots move on.
  if (clean(payload.company, 200)) return Response.json({ ok: true });

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const phone = clean(payload.phone, 40);
  const town = clean(payload.town, 120);
  const details = clean(payload.details, 4000);
  const service = getServiceBySlug(clean(payload.service, 80))?.title ?? "Not sure yet";

  if (!name || !email || !town || !details) {
    return Response.json({ error: "Please fill in your name, email, town and project details." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email address doesn't look right. Please check it and try again." }, { status: 400 });
  }

  // Option 1: Google Sheet + email through a Google Apps Script web app (see README).
  const sheetUrl = process.env.QUOTE_SHEET_URL;
  if (sheetUrl) {
    try {
      const res = await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          secret: process.env.QUOTE_SHEET_SECRET ?? "",
          name,
          email,
          phone,
          town,
          service,
          details,
          subject: `Quote request: ${service} in ${town}`,
          // "cid:logo" makes the email use the logo attached inside it, so Gmail shows it without asking.
          html: buildQuoteEmailHtml({ name, email, phone, town, service, details }, "cid:logo"),
          logoUrl: `${site.url}/email-logo.png`,
        }),
        redirect: "follow",
      });
      const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !result?.ok) {
        console.error("[quote] The Google Sheet script rejected the request:", res.status, result?.error);
        return Response.json(
          { error: `We couldn't send your request just now. Please email ${site.email} directly.` },
          { status: 502 },
        );
      }
      return Response.json({ ok: true });
    } catch (error) {
      console.error("[quote] Could not reach the Google Sheet script:", error);
      return Response.json(
        { error: `We couldn't send your request just now. Please email ${site.email} directly.` },
        { status: 502 },
      );
    }
  }

  // Option 2: email through Resend.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || site.email;
  const from = process.env.QUOTE_FROM_EMAIL || "Armours Edge Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[quote] Neither QUOTE_SHEET_URL nor RESEND_API_KEY is set, so the quote request was not sent.");
    return Response.json(
      { error: `The quote form isn't connected to email yet. Please email ${site.email} directly.` },
      { status: 503 },
    );
  }

  const text = [
    `New quote request from the website`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not given"}`,
    `Town: ${town}`,
    `Service: ${service}`,
    ``,
    `Project details:`,
    details,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Quote request: ${service} in ${town}`,
      text,
      html: buildQuoteEmailHtml({ name, email, phone, town, service, details }),
    }),
  });

  if (!res.ok) {
    console.error("[quote] Resend rejected the email:", res.status, await res.text().catch(() => ""));
    return Response.json(
      { error: `We couldn't send your request just now. Please email ${site.email} directly.` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
