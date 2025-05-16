import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import { createToken } from "../../utils/tokenGenerate";
import config from "../../config";

const loginIntoDB = async (payload: TAuth) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Password is incorrect", StatusCodes.UNAUTHORIZED);
  }

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

  return { accessToken };
};

export const authService = { loginIntoDB };
