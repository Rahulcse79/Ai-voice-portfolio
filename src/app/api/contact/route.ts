import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name, email, mobile, subject, message } = body;

    if (!name || !email || !mobile || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(String(email))) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(String(mobile))) {
      return NextResponse.json(
        { success: false, message: "Invalid mobile number." },
        { status: 400 }
      );
    }

    const adminTo = process.env.CONTACT_TO || process.env.SMTP_FROM;

    if (!adminTo) {
      return NextResponse.json(
        {
          success: false,
          message: "Server email configuration missing.",
        },
        { status: 500 }
      );
    }

    const safe = (v: string) =>
      String(v)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Portfolio Contact</h2>
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

    const text = `
New Portfolio Contact

Name: ${name}
Email: ${email}
Mobile: ${mobile}
Subject: ${subject}

Message:
${message}
    `.trim();

    await sendMail({
      to: adminTo,
      cc: email,
      subject: `Portfolio Contact: ${subject}`,
      text,
      html,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
