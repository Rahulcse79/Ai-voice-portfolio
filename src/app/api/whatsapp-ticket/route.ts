import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ticket from "@/models/ticket";
import { sendMail } from "@/lib/mail";
import { buildWhatsAppTicketEmailTemplate } from "@/lib/templates/ticketTemplate";

function generateTicketId() {
  const now = new Date();
  return `WA-${now.getTime()}`;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const name = String(body.name || "").trim();
    const product = body.product as "Refrigerator" | "TV" | "Washing Machine";
    const issue = String(body.issue || "").trim();

    if (!name || !product || !issue) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const ticket = new Ticket({
      ticketId: generateTicketId(),
      name,
      product,
      issue,
    });

    await ticket.save();

    // Notify admin via email (doesn't block ticket creation if email fails)
    const adminTo = process.env.CONTACT_TO || process.env.SMTP_FROM;
    if (!adminTo) {
      console.warn(
        "TICKET EMAIL WARNING: CONTACT_TO/SMTP_FROM missing; skipping admin notification"
      );
    } else {
      try {
        const { subject: mailSubject, text, html } =
          buildWhatsAppTicketEmailTemplate({
            ticketId: ticket.ticketId,
            name: ticket.name,
            product: ticket.product,
            issue: ticket.issue,
            createdAt: ticket.createdAt
              ? new Date(ticket.createdAt).toISOString()
              : new Date().toISOString(),
          });

        await sendMail({
          to: adminTo,
          subject: mailSubject,
          text,
          html,
        });
      } catch (mailErr) {
        console.error("TICKET EMAIL ERROR:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      ticketId: ticket.ticketId,
    });
  } catch (error) {
    console.error("TICKET API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const tickets = await Ticket.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error("TICKET API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
