import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResonse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const result = await authService.loginIntoDB(req.body);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User login successfully",
    data: result,
  });
});

export const authController = { login };
