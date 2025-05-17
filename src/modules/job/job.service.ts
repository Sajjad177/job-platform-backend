import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TJob } from "./job.interface";
import { Company } from "../company/company.model";
import { Job } from "./job.model";

const createJobInDB = async (payload: TJob, userId: string) => {
  const isExist = await User.findById(userId);
  if (!isExist) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const checkUser = await User.findOne({ isDeleted: true });
  if (checkUser) {
    throw new AppError("User already deleted", StatusCodes.CONFLICT);
  }

  if (isExist.role !== "employee") {
    throw new AppError("Only employees can create jobs", StatusCodes.CONFLICT);
  }

  const company = await Company.findById({ _id: payload.company });
  if (!company) {
    throw new AppError("Company not found", StatusCodes.NOT_FOUND);
  }

  const checkCompany = await Company.findOne({ isDeleted: true });
  if (checkCompany) {
    throw new AppError("Company already deleted", StatusCodes.CONFLICT);
  }

  const employId = userId.toString();

  const isEmployeeOfCompany = company.employees.includes(employId as any);
  if (!isEmployeeOfCompany) {
    throw new AppError(
      "You are not employee of this company",
      StatusCodes.CONFLICT
    );
  }

  const result = await Job.create({
    ...payload,
    postedBy: userId,
  });
  return result;
};

const getAllJobs = async () => {
  const result = await Job.find({ status: "active" })
    .populate("company")
    .populate({
      path: "postedBy",
      select: "-password",
    });
  return result;
};

const getOwnPostedJobs = async (userId: string) => {
  const result = await Job.find({ postedBy: userId }).populate("company");
  return result;
};

const updateJobInDB = async (jobId: string, payload: TJob, userId: string) => {
  const isExist = await Job.findById(jobId);
  if (!isExist) {
    throw new AppError("Job not found", StatusCodes.NOT_FOUND);
  }

  const checkJob = await Job.findOne({ isDeleted: true });
  if (checkJob) {
    throw new AppError("Job already deleted", StatusCodes.CONFLICT);
  }

  const employeeId = isExist.postedBy.toString();
//   const companyId = isExist.company.toString();

  if (employeeId !== userId) {
    throw new AppError(
      `You are not employee of this company`,
      StatusCodes.CONFLICT
    );
  }

  const result = await Job.findByIdAndUpdate(jobId, payload, {
    new: true,
  }).populate("company postedBy");
  return result;
};

export const jobService = {
  createJobInDB,
  getAllJobs,
  getOwnPostedJobs,
  updateJobInDB,
};
