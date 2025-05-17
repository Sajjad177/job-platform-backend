import { Types } from "mongoose";

export interface TApplication {
  jobId: Types.ObjectId;
  applicantId: Types.ObjectId;
  cv?: string;
  resume?: string;
  paymentStatus: "paid" | "unpaid";
  status: "pending" | "accepted" | "rejected";
  invoice?: {
    id: string;
    user: string;
    amount: number;
    time: Date;
  };
  appliedAt?: Date;
}
