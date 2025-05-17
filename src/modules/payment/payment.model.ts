import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: "Application",
    default: null,
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
