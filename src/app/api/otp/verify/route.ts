import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";

// Verify OTP endpoint
export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const emailKey = String(email).trim().toLowerCase();
    const otpStr = String(otp).trim();

    if (!/^\d{6}$/.test(otpStr)) {
      return NextResponse.json(
        { message: "OTP must be 6 digits" },
        { status: 400 }
      );
    }

    const stored = otpStore.get(emailKey);

    if (!stored) {
      return NextResponse.json(
        { message: "OTP not found or expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (Date.now() >= stored.expiresAt) {
      otpStore.delete(emailKey);
      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (stored.otp !== otpStr) {
      return NextResponse.json(
        { message: "Invalid OTP. Please check and try again." },
        { status: 400 }
      );
    }

    otpStore.delete(emailKey);

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
