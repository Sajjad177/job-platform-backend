import { model, Schema } from "mongoose";
import { TApplication } from "./application.interface";

const applicationSchema = new Schema<TApplication>({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: [true, "Job is required"],
  },
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Applicant is required"],
  },
  cv: {
    type: String,
  },
  resume: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  invoice: {
    id: String,
    user: String,
    amount: Number,
    time: Date,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Application = model<TApplication>(
  "Application",
  applicationSchema
);
