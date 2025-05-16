import { model, Schema } from "mongoose";
import { IUser, TUserName } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import validator from "validator";

// Name Schema
const userNameModel = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxLength: [20, "First name must be less than 20 characters"],
    minLength: [3, "First name must be at least 3 characters"],
    validate: function (value: string) {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      return firstNameStr === value;
    },
    message: "{VALUE} is not a valid first name",
  },
  middleName: {
    type: String,
    trim: true,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    maxLength: [20, "Last name must be less than 20 characters"],
    minLength: [3, "Last name must be at least 3 characters"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not a valid last name",
    },
  },
});

// User Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: userNameModel,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "employee", "job_seeker"],
      default: "job_seeker",
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  const user = this as any;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcryptSaltRounds)
    );
  }
  next();
});

// Post-save hook to remove password from response
userSchema.post("save", function (doc: IUser, next) {
  doc.password = "";
  next();
});

// Exporting the model
export const User = model<IUser>("User", userSchema);
