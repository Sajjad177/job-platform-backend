import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "../../utils/tokenGenerate";
import config from "../../config";

const registerUserIntoDB = async (payload: IUser) => {
  const isExist = await User.findOne({ email: payload.email });
  if (isExist) {
    throw new AppError("User already exist", StatusCodes.CONFLICT);
  }

  const isDeleted = await User.findOne({ isDeleted: true });
  if (isDeleted) {
    throw new AppError("User already deleted", StatusCodes.CONFLICT);
  }

  const user = await User.create(payload);

  const JwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    JwtPayload,
    config.jwt.jwtAccessTokenSecret as string,
    config.jwt.jwtAccessTokenExpiresIn as string
  );

  return {
    accessToken,
  };
};

const createEmployeeInDB = async (payload: IUser) => {
  const isExist = await User.findOne({ email: payload.email });
  if (isExist) {
    throw new AppError("Employee already exist", StatusCodes.CONFLICT);
  }

  const user = await User.create({
    ...payload,
    role: "employee",
  });
  return user;
};

const getAllUserFromDB = async () => {
  const result = await User.find({ isDeleted: false }).select("-password");
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const isDeleted = await User.findOne({ isDeleted: true });
  if (isDeleted) {
    throw new AppError("User already deleted", StatusCodes.CONFLICT);
  }

  const result = await User.findById(userId).select("-password");
  return result;
};

const updateUserRole = async (userId: string, role: string) => {
  const isExist = await User.findById(userId);
  if (!isExist) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const isDeleted = await User.findOne({ isDeleted: true });
  if (isDeleted) {
    throw new AppError("User already deleted", StatusCodes.CONFLICT);
  }

  const result = await User.findByIdAndUpdate(userId, { role }, { new: true });
  return result;
};

const softDeletedUserFromDB = async (userId: string) => {
  const isExist = await User.findById(userId);
  if (!isExist) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const userService = {
  registerUserIntoDB,
  createEmployeeInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserRole,
  softDeletedUserFromDB,
};
