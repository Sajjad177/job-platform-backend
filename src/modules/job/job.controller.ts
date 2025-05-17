import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResonse from "../../utils/sendResponse";
import { jobService } from "./job.service";

const createJob = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await jobService.createJobInDB(req.body, userId);

  sendResonse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Job created successfully",
    data: result,
  });
});

const getAllJobs = catchAsync(async (req, res) => {
  const result = await jobService.getAllJobs();

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Job fetched successfully",
    data: result,
  });
});

const getOwnPostedJobs = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await jobService.getOwnPostedJobs(userId);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Job get successfully",
    data: result,
  });
});

const updateJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.user;
  const result = await jobService.updateJobInDB(jobId, req.body, userId);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Job updated successfully",
    data: result,
  });
});

const deleteJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.user;
  const { isDeleted } = req.body;
  await jobService.deleteJobFromDB(jobId, userId, isDeleted);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Job deleted successfully",
  });
});

export const jobController = {
  createJob,
  getAllJobs,
  getOwnPostedJobs,
  updateJob,
  deleteJob,
};
