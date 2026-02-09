import mongoose from "mongoose";
import Counter from "./Counter";

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      unique: true,
    },
    invoiceYear: Number,
    invoiceMonth: Number,
    invoiceSeq: Number,

    date: {
      type: Date,
      default: Date.now,
    },

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

/**
 * 🔥 Invoice Number Auto Generator
 * NO next() — async only
 */
InvoiceSchema.pre("save", async function () {
  if (this.invoiceSeq) return;

  const now = new Date();
  this.invoiceYear = now.getFullYear();
  this.invoiceMonth = now.getMonth() + 1;

  const counter = await Counter.findOneAndUpdate(
    {
      name: `invoice-${this.invoiceYear}-${this.invoiceMonth}`,
    },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.invoiceSeq = counter.seq;
  this.invoiceNo = `INV-${this.invoiceYear}${String(
    this.invoiceMonth
  ).padStart(2, "0")}-${counter.seq}`;
});

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);
