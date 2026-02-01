import PDFDocument from "pdfkit";

export function generateInvoicePDF(invoice) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 40 });

      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      // Font (optional)
      doc.fontSize(18).text("TAX INVOICE", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Invoice No: ${invoice.invoiceNo}`);
      doc.text(
        `Date: ${new Date(invoice.date).toLocaleDateString("en-IN")}`
      );

      doc.moveDown();
      doc.text(`Receiver: ${invoice.receiver.name}`);
      doc.text(invoice.receiver.address);

      doc.moveDown();
      doc.text("Items:");

      invoice.items.forEach((item, i) => {
        doc.text(
          `${i + 1}. ${item.particular} | Qty: ${item.qty} | Rate: ₹${item.rate}`
        );
      });

      doc.moveDown();
      doc.text(`Total: ₹${invoice.totals.totalAmount}`, {
        align: "right",
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
