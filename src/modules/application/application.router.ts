import express from "express";
import { applicationController } from "./application.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { parseBody } from "../../middleware/parserBody";
import upload from "../../config/multer.config";
import validateRequest from "../../middleware/validateRequest";
import { applicationValidationSchema } from "./application.validation";

const router = express.Router();

router.post(
  "/apply",
  upload.single("file"),
  parseBody,
  auth(USER_ROLE.JOB_SEEKER),
  validateRequest(applicationValidationSchema.applyApplicationValidation),
  applicationController.applyApplication
);

router.get(
  "/",
  auth(USER_ROLE.ADMIN),
  applicationController.getAllApplications
);

router.get(
  "/my-applications",
  auth(USER_ROLE.JOB_SEEKER),
  applicationController.getMyOwnApplications
);

router.put(
  "/:applicationId",
  auth(USER_ROLE.EMPLOYEE),
  validateRequest(
    applicationValidationSchema.updateApplicationStatusValidation
  ),
  applicationController.updateApplicationStatus
);

export const applicationRouter = router;
