import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { buildVerifyEmailTemplate } from "@/lib/templates/authTemplate";
import { otpStore } from "@/lib/otpStore";
export const runtime = "nodejs";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { email, name } = body;

    if (!email || !/^\S+@\S+\.\S+$/.test(String(email).trim())) {
      return NextResponse.json(
        { message: "Valid email is required" },
        { status: 400 }
      );
    }

    const emailKey = String(email).trim().toLowerCase();
    const otp = generateOTP();

    otpStore.set(emailKey, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    const emailTemplate = buildVerifyEmailTemplate({
      name: name || "User",
      otp,
    });

    const requiredSmtpVars = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
    ] as const;
    const missing = requiredSmtpVars.filter((k) => !process.env[k]);
    if (missing.length > 0) {
      console.error(
        "OTP SEND ERROR: Missing SMTP env vars:",
        missing.join(", ")
      );
      return NextResponse.json(
        {
          message: "Server email is not configured",
          missing,
        },
        { status: 500 }
      );
    }

    await sendMail({
      to: emailKey,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
    });

    return NextResponse.json(
      { message: "OTP sent successfully to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP SEND ERROR:", error);
    return NextResponse.json(
      {
        message: "Failed to send OTP",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      { message: "view successful", status: 1 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: (error as Error).message,
        status: -1,
      },
      { status: 500 }
    );
  }
}
