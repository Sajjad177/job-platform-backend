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

router.post(
  "/create-employee",
  validateRequest(userValidationSchema.createEmployee),
  userController.createEmployee
);

router.get("/", userController.getAllUser);
router.get("/:userId", userController.getSingleUser);
router.patch(
  "/:userId",
  validateRequest(userValidationSchema.updateUserRoleValidationSchema),
  userController.updateUserRole
);

router.patch("/soft-delete/:userId", userController.softDeletedUser);

export const userRouter = router;
