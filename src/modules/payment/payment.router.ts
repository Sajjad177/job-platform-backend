import express from "express";

import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { paymentController } from "./payment.controller";

const router = express.Router();

router.post(
  "/pay",
  auth(USER_ROLE.JOB_SEEKER),
  paymentController.initiatePayment
);

export const paymentRouter = router;
