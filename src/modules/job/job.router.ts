import express from "express";
import { jobController } from "./job.controller";
import validateRequest from "../../middleware/validateRequest";
import { jobValidation } from "./job.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-job",
  auth(USER_ROLE.EMPLOYEE),
  validateRequest(jobValidation.createJobValidation),
  jobController.createJob
);

router.get("/", jobController.getAllJobs);

router.get(
  "/my-posted-jobs",
  auth(USER_ROLE.EMPLOYEE),
  jobController.getOwnPostedJobs
);

router.put(
  "/:jobId",
  auth(USER_ROLE.EMPLOYEE),
  validateRequest(jobValidation.updateJobValidation),
  jobController.updateJob
);

router.patch(
  "/delete/:jobId",
  auth(USER_ROLE.EMPLOYEE),
  jobController.deleteJob
);

export const jobRouter = router;
