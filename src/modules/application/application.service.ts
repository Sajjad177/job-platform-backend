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

const getAllApplicationsFromDB = async (filter: {
  company?: string;
  status?: string;
}) => {
  const matchStage: any = {};

  if (filter.status) {
    matchStage.status = filter.status;
  }

  const aggregatePipeline: any[] = [
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        as: "job",
      },
    },
    { $unwind: "$job" },

    {
      $lookup: {
        from: "companies",
        localField: "job.company",
        foreignField: "_id",
        as: "company",
      },
    },
    { $unwind: "$company" },
  ];

  if (filter.company) {
    matchStage["company.name"] = filter.company;
  }

  // Apply filters
  if (Object.keys(matchStage).length > 0) {
    aggregatePipeline.push({ $match: matchStage });
  }

  // Lookup applicant (user)
  aggregatePipeline.push({
    $lookup: {
      from: "users",
      localField: "applicantId",
      foreignField: "_id",
      as: "applicant",
    },
  });
  aggregatePipeline.push({ $unwind: "$applicant" });

  // Remove password
  aggregatePipeline.push({
    $project: {
      "applicant.password": 0,
    },
  });

  const result = await Application.aggregate(aggregatePipeline);
  return result;
};

const getMyOwnApplications = async (userId: string) => {
  const result = await Application.find({ applicantId: userId })
    .populate("jobId")
    .populate({ path: "applicantId", select: "-password" });

  return result;
};

const updateApplicationStatus = async (
  applicationId: string,
  status: string,
  userId: string
) => {
  const application = await Application.findById(applicationId).populate({
    path: "jobId",
    select: "postedBy",
  });
  if (!application) {
    throw new AppError("Application not found", StatusCodes.NOT_FOUND);
  }

  const job = application.jobId as any;
  const employeeId = job.postedBy.toString();

  if (employeeId !== userId) {
    throw new AppError(
      `You are not employee of this company`,
      StatusCodes.CONFLICT
    );
  }

  const result = await Application.findByIdAndUpdate(
    applicationId,
    { status },
    {
      new: true,
    }
  );
  return result;
};

export const applicationService = {
  applyApplicationToJob,
  getAllApplicationsFromDB,
  getMyOwnApplications,
  updateApplicationStatus,
};
