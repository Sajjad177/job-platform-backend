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

const getAllUserFromDB = async () => {
  const result = await User.find({}).select("-password");
  return result;
};

export const userService = { registerUserIntoDB, getAllUserFromDB };
