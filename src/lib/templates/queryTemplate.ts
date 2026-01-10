export type TemplatePayload = {
  name: string;
  otp: string;
};

function applyTemplate(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(/{(\w+)}/g, (_, key) => values[key] ?? `{${key}}`);
}

export const AuthSubjects = {
  VERIFY_EMAIL: "Verify Your Email Address – OTP Code",
} as const;

const textTemplates = {
  VERIFY_EMAIL: `
Hello {name},

Thank you for contacting me through my website.

To verify your email address, please use the following OTP:

{otp}

This OTP is valid for 5 minutes.
Please do not share this code with anyone.

If you did not request this verification, you can safely ignore this email.

Best regards,
website team
`,
};

const htmlTemplates = {
  VERIFY_EMAIL: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background:#f9fafb; font-family:Arial, sans-serif;">
    <div style="max-width:600px; margin:40px auto; background:#ffffff; padding:24px; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.05);">
      <h2 style="color:#111827;">Email Verification</h2>

      <p style="color:#374151;">Hello <strong>{name}</strong>,</p>

      <p style="color:#374151;">
        Thank you for contacting me through my website.
        To verify that this email address is valid, please use the OTP below:
      </p>

      <div style="margin:24px 0; text-align:center;">
        <span style="
          display:inline-block;
          font-size:28px;
          font-weight:700;
          letter-spacing:6px;
          color:#2563eb;
          background:#eff6ff;
          padding:12px 24px;
          border-radius:6px;
        ">
          {otp}
        </span>
      </div>

      <p style="color:#374151;">
        This OTP is valid for <strong>5 minutes</strong>.
        Please do not share this code with anyone.
      </p>

      <p style="color:#6b7280; font-size:14px;">
        If you did not request this verification, you can safely ignore this email.
      </p>

      <hr style="margin:24px 0; border:none; border-top:1px solid #e5e7eb;" />

      <p style="color:#374151;">
        Best regards,<br />
        <strong>website team</strong><br />
      </p>
    </div>
  </body>
</html>
`,
};

export function buildContactEmailTemplate(payload: TemplatePayload) {
  return {
    subject: AuthSubjects.VERIFY_EMAIL,
    text: applyTemplate(textTemplates.VERIFY_EMAIL, payload),
    html: applyTemplate(htmlTemplates.VERIFY_EMAIL, payload),
  };
}
