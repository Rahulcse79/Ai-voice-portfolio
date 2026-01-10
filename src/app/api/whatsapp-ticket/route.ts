import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ticket from "@/models/ticket";

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
