import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResonse from "../../utils/sendResponse";
import { applicationService } from "./application.service";

const applyApplication = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await applicationService.applyApplicationToJob(
    userId,
    req.body,
    req.file as any
  );

  sendResonse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Application submitted successfully",
    data: result,
  });
});

const getAllApplications = catchAsync(async (req, res) => {
  const company = req.query.company as string | undefined;
  const status = req.query.status as string | undefined;

  const result = await applicationService.getAllApplicationsFromDB({
    company,
    status,
  });

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Application fetched successfully",
    data: result,
  });
});

const getMyOwnApplications = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await applicationService.getMyOwnApplications(userId);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Application fetched successfully",
    data: result,
  });
});

const updateApplicationStatus = catchAsync(async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;
  const { userId } = req.user;
  const result = await applicationService.updateApplicationStatus(
    applicationId,
    status,
    userId
  );

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Application status updated successfully",
    data: result,
  });
});

export const applicationController = {
  applyApplication,
  getMyOwnApplications,
  getAllApplications,
  updateApplicationStatus,
};
