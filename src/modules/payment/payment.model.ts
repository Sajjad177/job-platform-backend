import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = model("Payment", paymentSchema);
