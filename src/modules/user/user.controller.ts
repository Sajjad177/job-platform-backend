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

const createEmployee = catchAsync(async (req, res) => {
  const result = await userService.createEmployeeInDB(req.body);

  sendResonse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Employee created successfully",
    data: result,
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

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userService.getSingleUserFromDB(userId);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user data fetched successfully",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const result = await userService.updateUserRole(userId, role);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User role updated successfully",
    data: result,
  });
});

const softDeletedUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await userService.softDeletedUserFromDB(userId);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User deleted successfully",
  });
});

export const userController = {
  registerUser,
  createEmployee,
  getAllUser,
  getSingleUser,
  updateUserRole,
  softDeletedUser,
};
