import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";
export const runtime = "nodejs";

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

    const { email, otp } = body;

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
        { message: "OTP must be a 6-digit number" },
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

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(emailKey);
      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (stored.otp !== otpStr) {
      return NextResponse.json(
        { message: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    otpStore.delete(emailKey);

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP VERIFY ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
