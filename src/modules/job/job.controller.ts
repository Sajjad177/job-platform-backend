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

export const jobController = {
  createJob,
  getAllJobs,
};
