export type TicketEmailPayload = {
  ticketId: string;
  name: string;
  product: string;
  issue: string;
  createdAt?: string;
};

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildWhatsAppTicketEmailTemplate(payload: TicketEmailPayload) {
  const createdAt = payload.createdAt ?? new Date().toISOString();

  const subject = `New WhatsApp Ticket: ${payload.ticketId}`;

  const text = `
New WhatsApp Ticket

Ticket ID: ${payload.ticketId}
Name: ${payload.name}
Product: ${payload.product}
Created At: ${createdAt}

Issue:
${payload.issue}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New WhatsApp Ticket</title>
  </head>
  <body style="margin:0; padding:0; background:#f9fafb; font-family:Arial, sans-serif;">
    <div style="max-width:640px; margin:40px auto; background:#ffffff; padding:24px; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,0.05);">
      <h2 style="margin:0 0 12px; color:#111827;">New WhatsApp Ticket</h2>
      <p style="margin:0 0 20px; color:#6b7280; font-size:14px;">A new support ticket was created from the WhatsApp flow.</p>

      <div style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
        <div style="padding:16px; background:#f8fafc; border-bottom:1px solid #e5e7eb;">
          <div style="font-size:12px; color:#6b7280;">Ticket ID</div>
          <div style="font-size:18px; font-weight:700; color:#111827; letter-spacing:0.2px;">${escapeHtml(
            payload.ticketId
          )}</div>
        </div>

        <div style="padding:16px;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0; color:#6b7280; width:140px;">Name</td>
              <td style="padding:8px 0; color:#111827; font-weight:600;">${escapeHtml(
                payload.name
              )}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#6b7280;">Product</td>
              <td style="padding:8px 0; color:#111827; font-weight:600;">${escapeHtml(
                payload.product
              )}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#6b7280;">Created At</td>
              <td style="padding:8px 0; color:#111827;">${escapeHtml(createdAt)}</td>
            </tr>
          </table>

          <div style="margin-top:12px;">
            <div style="font-size:12px; color:#6b7280; margin-bottom:6px;">Issue</div>
            <pre style="white-space:pre-wrap; margin:0; background:#f9fafb; padding:12px; border-radius:8px; border:1px solid #eef2f7; color:#111827;">${escapeHtml(
              payload.issue
            )}</pre>
          </div>
        </div>
      </div>

      <p style="margin:18px 0 0; color:#6b7280; font-size:12px;">This is an automated message from your website.</p>
    </div>
  </body>
</html>
  `.trim();

  return { subject, text, html };
}
