import { Types } from "mongoose";

export type TPayment = {
  user: Types.ObjectId;
  jobId: Types.ObjectId;
  amount: number;
  transactionId: string;
  paidAt?: Date;
};
