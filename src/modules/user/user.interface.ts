import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface TUser {
  _id: Types.ObjectId;
  name: TUserName;
  email: string;
  password: string;
  role: "admin" | "employee" | "job_seeker";
  isDeleted?: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
