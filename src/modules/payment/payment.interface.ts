import { Types } from "mongoose";

export type TPayment = {
  user: Types.ObjectId;
  application: Types.ObjectId;
  amount: number;
  transactionId: string;
  paidAt?: Date;
};
