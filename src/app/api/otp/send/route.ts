import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { buildContactEmailTemplate } from "@/lib/templates/queryTemplate";
import { otpStore } from "@/lib/otpStore";

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP endpoint
export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(String(email).trim())) {
      return NextResponse.json(
        { message: "Valid email is required" },
        { status: 400 }
      );
    }

    const emailKey = String(email).trim().toLowerCase();

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(emailKey, { otp, expiresAt });

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

    setTimeout(() => {
      const stored = otpStore.get(emailKey);
      if (stored && Date.now() >= stored.expiresAt) {
        otpStore.delete(emailKey);
      }
    }, 5 * 60 * 1000);

    return NextResponse.json(
      { message: "OTP sent successfully to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { message: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
