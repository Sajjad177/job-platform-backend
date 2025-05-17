import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { Payment } from "./payment.model";
import mongoose from "mongoose";

const initiatePayment = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const transactionId = new mongoose.Types.ObjectId();

  const payment = await Payment.create({
    user: userId,
    application: null,
    amount: 100,
    transactionId,
  });

  return payment;
};

export const paymentService = {
  initiatePayment,
};
