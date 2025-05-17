import { Types } from "mongoose";

export interface TCompany {
  name: string;
  description: string;
  website: string;
  employees: Types.ObjectId[];
  isDeleted?: boolean;
  industry?: string;
}
