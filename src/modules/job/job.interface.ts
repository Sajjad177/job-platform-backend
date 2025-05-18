import { Types } from "mongoose";

export interface TJob {
  title: string;
  description: string;
  requirements: string[];
  company: Types.ObjectId;
  postedBy: Types.ObjectId | string;
  isDeleted?: boolean;
}
