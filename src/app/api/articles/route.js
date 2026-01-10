import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";

export async function GET() {
  try {
    await connectDB();

    const articles = await Article.find({}).sort({ date: -1 }).lean();

    return NextResponse.json(
      {
        success: true,
        count: articles.length,
        data: articles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch articles error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch articles",
      },
      { status: 500 }
    );
  }
}
