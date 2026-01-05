import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

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

    const adminTo = process.env.CONTACT_TO ?? process.env.SMTP_FROM;

    if (!adminTo) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Server is not configured to receive contact emails (CONTACT_TO/SMTP_FROM missing).",
        },
        { status: 500 }
      );
    }

    const safe = (v: string) =>
      String(v ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Mobile:</strong> ${safe(mobile)}</p>
        <p><strong>Subject:</strong> ${safe(subject)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; background: #f9fafb; padding: 12px; border-radius: 6px;">${safe(
          message
        )}</pre>
      </div>
    `;

    const text = `New Contact Message\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nSubject: ${subject}\n\nMessage:\n${message}\n`;

    await sendMail({
      to: adminTo,
      subject: `Portfolio Contact: ${subject}`,
      text,
      html,
      cc: email,
    });

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
