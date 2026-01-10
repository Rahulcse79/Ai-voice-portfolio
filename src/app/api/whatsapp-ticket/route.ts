import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

function generateTicketId() {
  const now = new Date();
  return `WA-${now.getTime()}`;
}

type Ticket = {
  ticketId: string;
  createdAt: string;
  name: string;
  product: "Refrigerator" | "TV" | "Washing Machine";
  issue: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const product = body.product as Ticket["product"];
    const issue = String(body.issue || "").trim();

    if (!name || !product || !issue) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const ticket: Ticket = {
      ticketId: generateTicketId(),
      createdAt: new Date().toISOString(),
      name,
      product,
      issue,
    };

    const filePath = path.join(
      process.cwd(),
      "public",
      "catalog",
      "home-appliances.tickets.json"
    );

    let tickets: Ticket[] = [];

    try {
      const raw = await fs.readFile(filePath, "utf8");
      tickets = JSON.parse(raw);
      if (!Array.isArray(tickets)) tickets = [];
    } catch {
      tickets = [];
    }

    tickets.unshift(ticket);

    await fs.writeFile(filePath, JSON.stringify(tickets, null, 2), "utf8");

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
