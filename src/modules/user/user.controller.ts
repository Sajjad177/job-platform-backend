import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResonse from "../../utils/sendResponse";
import { userService } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await userService.registerUserIntoDB(req.body);
  const { accessToken } = result;

  sendResonse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User created successfully",
    data: {
      accessToken,
    },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserFromDB();
  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

export const userController = { registerUser, getAllUser };
