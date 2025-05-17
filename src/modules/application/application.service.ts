import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { Payment } from "../payment/payment.model";
import { Application } from "./application.model";
import { TApplication } from "./application.interface";

const applyApplicationToJob = async (
  userId: string,
  payload: TApplication,
  file: any
) => {
  const isApplied = await Application.findOne({
    jobId: payload.jobId,
    applicantId: userId,
  });
  if (isApplied) {
    throw new AppError(
      "You have already applied for this job",
      StatusCodes.CONFLICT
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const checkPaid = await Payment.findOne({
    user: userId,
    jobId: payload.jobId,
  });
  if (!checkPaid) {
    throw new AppError("You have to paid first", StatusCodes.CONFLICT);
  }

  if (!file) {
    throw new AppError("You have to upload CV or Resume", StatusCodes.CONFLICT);
  }

  const application = await Application.create({
    jobId: payload.jobId,
    applicantId: userId,
    document: file?.path,
    paymentStatus: "paid",
    status: "pending",
    invoice: {
      id: checkPaid._id,
      user: checkPaid.user,
      amount: checkPaid.amount,
      time: checkPaid.paidAt,
    },
  });

  return application;
};

export const applicationService = {
  applyApplicationToJob,
};
