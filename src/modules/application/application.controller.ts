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

export const applicationController = {
  applyApplication,
};
