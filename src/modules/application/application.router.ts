import express from "express";
import { applicationController } from "./application.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { parseBody } from "../../middleware/parserBody";
import upload from "../../config/multer.config";


const router = express.Router();

router.post(
  "/apply",
  upload.single("file"),
  parseBody,
  auth(USER_ROLE.JOB_SEEKER),
  applicationController.applyApplication
);

export const applicationRouter = router;
