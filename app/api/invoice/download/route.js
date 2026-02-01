import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";
import { pdf } from "@react-pdf/renderer";
import InvoicePDFDocument from "@/components/InvoicePDFDocument";

export async function POST(req) {
  try {
    await connectDB();
    const { invoiceId } = await req.json();

    const invoice = await Invoice.findById(invoiceId).lean();

    if (!invoice) {
      return NextResponse.json(
        { success: false, message: "Invoice not found" },
        { status: 404 }
      );
    }

    const pdfDoc = <InvoicePDFDocument invoice={invoice} />;
    const pdfBuffer = await pdf(pdfDoc).toBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Invoice-${invoice.invoiceNo}.pdf`,
      },
    });
  } catch (error) {
    console.error("PDF Error:", error);
    return NextResponse.json(
      { success: false, message: "PDF generation failed" },
      { status: 500 }
    );
  }
}
