import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const invoice = await Invoice.create(data);

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
