import { model, Schema } from "mongoose";
import { TCompany } from "./company.interface";

const companySchema = new Schema<TCompany>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  website: {
    type: String,
    required: [true, "Website is required"],
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  industry: {
    type: String,
  },
});

export const Company = model<TCompany>("Company", companySchema);
