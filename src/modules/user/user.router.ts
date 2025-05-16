import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchema.registerValidationSchema),
  userController.registerUser
);

router.get("/", userController.getAllUser);

export const userRouter = router;
