import { model, Schema } from "mongoose";
import { TJob } from "./job.interface";

const jobSchema = new Schema<TJob>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  requirements: {
    type: [String],
    required: [true, "Requirements are required"],
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Company is required"],
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  status: {
    type: String,
    enum: ["active", "inactive", "deleted"],
    default: "active",
  },
});

export const Job = model<TJob>("Job", jobSchema);
