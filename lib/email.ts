/**
 * Sends the enquiry to Julieta using Resend's HTTP API (no SDK needed).
 * Configure RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.
 * Swap this function out to use a different provider (Postmark, SMTP…).
 */
export type Enquiry = {
  requestType: "consultation" | "question";
  name: string;
  email: string;
  phone: string;
  service: string;
  room: string;
  city: string;
  timing: string;
  message: string;
  locale: string;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEnquiry(e: Enquiry): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  const subject =
    e.requestType === "consultation"
      ? `Consultation request — ${e.name}${e.city ? ` (${e.city})` : ""}`
      : `New question — ${e.name}`;

  const rows: [string, string][] = [
    ["Request", e.requestType === "consultation" ? "Consultation request" : "Question"],
    ["Name", e.name],
    ["Email", e.email],
    ["Phone", e.phone || "—"],
    ["Service", e.service || "—"],
    ["Room / project", e.room || "—"],
    ["City / postcode", e.city || "—"],
    ["Preferred timing", e.timing || "—"],
    ["Site language", e.locale.toUpperCase()],
  ];

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${e.message}`;
  const html = `
    <div style="font-family:Georgia,serif;color:#2a1f1a;max-width:560px">
      <h2 style="font-weight:normal;color:#5e1a1c">${esc(subject)}</h2>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#7a6a5e;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-top:1px solid #e3d4bf;padding-top:16px;margin-top:16px">${esc(e.message)}</p>
    </div>`;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without credentials: log instead of sending.
      console.info(`\n[contact] Email not configured — would send:\nSubject: ${subject}\n${text}\n`);
      return { ok: true };
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL are not set.");
    return { ok: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: e.email, subject, text, html }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] Failed to send", err);
    return { ok: false };
  }
}
