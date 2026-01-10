import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ticket from "@/models/ticket";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface TicketData {
  ticketId: string;
  name: string;
  product: string;
  issue: string;
  createdAt: Date;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function generateExcel(tickets: TicketData[]): string {
  // Generate CSV format (Excel compatible)
  const headers = ["Ticket ID", "Customer Name", "Product", "Issue", "Created Date & Time"];
  const rows = tickets.map((t) => [
    t.ticketId,
    `"${t.name.replace(/"/g, '""')}"`,
    t.product,
    `"${t.issue.replace(/"/g, '""')}"`,
    formatDate(t.createdAt),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  return csvContent;
}

async function generatePDFBytes(tickets: TicketData[], dateFilter?: string): Promise<Uint8Array> {
  const currentDateTime = new Date().toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateInfo = dateFilter
    ? `Date filter: ${new Date(dateFilter).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })}`
    : "Date filter: All";

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  const marginX = 40;
  let y = height - 50;

  // Header
  page.drawText("Support Tickets Report", {
    x: marginX,
    y,
    size: 18,
    font: fontBold,
    color: rgb(0.06, 0.72, 0.53),
  });
  y -= 22;

  page.drawText(`Generated: ${currentDateTime}`, {
    x: marginX,
    y,
    size: 10,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 14;
  page.drawText(`${dateInfo} | Total tickets: ${tickets.length}`, {
    x: marginX,
    y,
    size: 10,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 18;

  // Table header
  const headerY = y;
  const colX = {
    no: marginX,
    ticketId: marginX + 30,
    name: marginX + 140,
    product: marginX + 260,
    date: marginX + 380,
    issue: marginX + 470,
  };

  const drawLine = (yy: number) => {
    page.drawLine({
      start: { x: marginX, y: yy },
      end: { x: width - marginX, y: yy },
      thickness: 1,
      color: rgb(0.9, 0.9, 0.9),
    });
  };

  drawLine(y);
  y -= 14;
  page.drawText("#", { x: colX.no, y, size: 10, font: fontBold });
  page.drawText("Ticket ID", { x: colX.ticketId, y, size: 10, font: fontBold });
  page.drawText("Name", { x: colX.name, y, size: 10, font: fontBold });
  page.drawText("Product", { x: colX.product, y, size: 10, font: fontBold });
  page.drawText("Date", { x: colX.date, y, size: 10, font: fontBold });
  page.drawText("Issue", { x: colX.issue, y, size: 10, font: fontBold });
  y -= 6;
  drawLine(y);
  y -= 16;

  // Rows (single page, truncate; can be extended to multi-page later)
  const maxRows = Math.floor((y - 60) / 14);
  const rows = tickets.slice(0, Math.max(0, maxRows));

  const clipText = (text: string, maxLen: number) => {
    const t = (text ?? "").toString();
    return t.length > maxLen ? t.slice(0, maxLen - 1) + "…" : t;
  };

  rows.forEach((t, i) => {
    const rowY = y - i * 14;
    page.drawText(String(i + 1), { x: colX.no, y: rowY, size: 9, font });
    page.drawText(clipText(t.ticketId, 14), { x: colX.ticketId, y: rowY, size: 9, font });
    page.drawText(clipText(t.name, 16), { x: colX.name, y: rowY, size: 9, font });
    page.drawText(clipText(t.product, 12), { x: colX.product, y: rowY, size: 9, font });
    page.drawText(clipText(formatDate(t.createdAt), 18), { x: colX.date, y: rowY, size: 9, font });
    page.drawText(clipText(t.issue, 14), { x: colX.issue, y: rowY, size: 9, font });
  });

  const remaining = tickets.length - rows.length;
  if (remaining > 0) {
    page.drawText(`(Showing ${rows.length} of ${tickets.length}. ${remaining} more not shown)`, {
      x: marginX,
      y: 40,
      size: 9,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });
  }

  const bytes = await pdfDoc.save();
  // pdf-lib returns Uint8Array; normalize to plain Uint8Array
  return new Uint8Array(bytes);
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "excel";
    const dateParam = searchParams.get("date"); // Format: YYYY-MM-DD

    // Build query filter
    let query = {};
    if (dateParam) {
      const selectedDate = new Date(dateParam);
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      query = {
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      };
    }

    const tickets = await Ticket.find(query).sort({ createdAt: -1 }).lean();

    if (tickets.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: dateParam 
            ? `No tickets found for ${new Date(dateParam).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`
            : "No tickets found in the database",
          noRecords: true
        }, 
        { status: 404 }
      );
    }

    if (format === "excel") {
      const csvContent = generateExcel(tickets as unknown as TicketData[]);
      const filename = `tickets-report-${Date.now()}.csv`;

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    } else if (format === "pdf") {
      const pdfData = await generatePDFBytes(
        tickets as unknown as TicketData[],
        dateParam || undefined
      );
      const filename = `tickets-report-${dateParam || "all"}-${Date.now()}.pdf`;

      const res = new Response(pdfData as any, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Length": String(pdfData.length),
        },
      });

      return res;
    }

    return NextResponse.json({ success: false, message: "Invalid format" }, { status: 400 });
  } catch (error) {
    console.error("REPORT API ERROR:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
