import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, mobile, subject, message } = body;

    if (!name || !email || !mobile || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email." },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, message: "Invalid mobile number." },
        { status: 400 }
      );
    }

    

    return NextResponse.json({
      success: true,
      message: "Message submitted successfully.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}
