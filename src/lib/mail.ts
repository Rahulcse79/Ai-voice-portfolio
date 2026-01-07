import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dns from "dns";

// Prefer IPv4 first to avoid occasional IPv6 routing issues to SMTP on some hosts.
// This affects DNS results ordering for the whole process.
try {
  (dns as any).setDefaultResultOrder?.("ipv4first");
} catch {
  // ignore
}

export type SendMailResult = {
  accepted?: string[];
  rejected?: string[];
  messageId?: string;
  response?: string;
};

export interface SendMailParams {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

function getMailConfigFromEnv() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_TLS_REJECT_UNAUTHORIZED,
  } = process.env;

  if (!SMTP_HOST) throw new Error("SMTP_HOST is missing");
  if (!SMTP_PORT) throw new Error("SMTP_PORT is missing");
  if (!SMTP_USER) throw new Error("SMTP_USER is missing");
  if (!SMTP_PASS) throw new Error("SMTP_PASS is missing");

  const port = Number(SMTP_PORT);
  const secure = SMTP_SECURE ? SMTP_SECURE === "true" : port === 465;
  const tlsRejectUnauthorized =
    SMTP_TLS_REJECT_UNAUTHORIZED !== undefined
      ? SMTP_TLS_REJECT_UNAUTHORIZED === "true"
      : true;

  return {
    host: SMTP_HOST,
    port,
    secure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    from: SMTP_FROM ?? SMTP_USER,
    tlsRejectUnauthorized,
  };
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const cfg = getMailConfigFromEnv();

  const transportOptions: SMTPTransport.Options = {
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: cfg.auth,
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 30_000,
    tls: {
      rejectUnauthorized: cfg.tlsRejectUnauthorized,
    },
  };

  cachedTransporter = nodemailer.createTransport(transportOptions);

  return cachedTransporter;
}

export async function sendMail(
  params: SendMailParams
): Promise<SendMailResult> {
  const transporter = getTransporter();
  const cfg = getMailConfigFromEnv();

  try {
    const info = await transporter.sendMail({
      from: cfg.from,
      to: params.to,
      cc: params.cc,
      bcc: params.bcc,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });

    return {
      accepted: info.accepted,
      rejected: info.rejected,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (err) {
    cachedTransporter = null;

    console.error("MAIL SEND ERROR:", {
      code: (err as any)?.code,
      command: (err as any)?.command,
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      tlsRejectUnauthorized: cfg.tlsRejectUnauthorized,
    });

    throw err;
  }
}
