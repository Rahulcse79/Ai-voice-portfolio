import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { buildContactEmailTemplate } from "@/lib/templates/queryTemplate";
import { otpStore } from "@/lib/otpStore";

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

    const emailTemplate = buildContactEmailTemplate({
      name: name || "User",
      otp,
    });

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
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
