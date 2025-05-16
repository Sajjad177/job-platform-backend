import { Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface IUser {
  name: TUserName;
  email: string;
  password: string;
  role: "admin" | "employee" | "job_seeker";
  company?: Types.ObjectId;
  isDeleted?: boolean;
}
