import mongoose, { Schema, Document } from "mongoose";

export interface TicketDocument extends Document {
  ticketId: string;
  name: string;
  product: "Refrigerator" | "TV" | "Washing Machine";
  issue: string;
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<TicketDocument>(
  {
    ticketId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    product: {
      type: String,
      required: true,
      enum: ["Refrigerator", "TV", "Washing Machine"],
    },
    issue: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ticket ||
  mongoose.model<TicketDocument>("ticket", TicketSchema);
