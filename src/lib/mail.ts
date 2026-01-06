import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

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
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM } =
    process.env;

  if (!SMTP_HOST) throw new Error("SMTP_HOST is missing");
  if (!SMTP_PORT) throw new Error("SMTP_PORT is missing");
  if (!SMTP_USER) throw new Error("SMTP_USER is missing");
  if (!SMTP_PASS) throw new Error("SMTP_PASS is missing");

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    from: SMTP_FROM ?? SMTP_USER,
  };
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const cfg = getMailConfigFromEnv();

  cachedTransporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: cfg.auth,
    tls: {
      rejectUnauthorized: false,
    },
  });

  return cachedTransporter;
}

export async function sendMail(
  params: SendMailParams
): Promise<SendMailResult> {
  const transporter = getTransporter();
  const cfg = getMailConfigFromEnv();

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
}
