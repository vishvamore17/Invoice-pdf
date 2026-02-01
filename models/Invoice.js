import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceNo: String,
    date: Date,

    receiver: {
      name: String,
      address: String,
      mobile: String,
      gst: String,
    },

    consignee: {
      name: String,
      address: String,
      mobile: String,
      gst: String,
    },

    items: [
      {
        particular: String,
        hsn: String,
        qty: Number,
        unit: String,
        rate: Number,
        discount: Number,
        gst: Number,
      },
    ],

    totals: {
      taxableValue: Number,
      gstAmount: Number,
      totalAmount: Number,
    },

    remarks: String,
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js dev mode
export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);
