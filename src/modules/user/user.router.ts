import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "./user.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchema.registerValidationSchema),
  userController.registerUser
);

router.post(
  "/create-employee",
  auth(USER_ROLE.ADMIN),
  validateRequest(userValidationSchema.createEmployee),
  userController.createEmployee
);

router.get("/", auth(USER_ROLE.ADMIN), userController.getAllUser);
router.get("/:userId", auth(USER_ROLE.ADMIN), userController.getSingleUser);

router.patch(
  "/:userId",
  validateRequest(userValidationSchema.updateUserRoleValidationSchema),
  auth(USER_ROLE.ADMIN),
  userController.updateUserRole
);

router.patch(
  "/soft-delete/:userId",
  auth(USER_ROLE.ADMIN),
  userController.softDeletedUser
);

export const userRouter = router;
