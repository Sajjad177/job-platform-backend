import express from "express";

import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { paymentController } from "./payment.controller";
import validateRequest from "../../middleware/validateRequest";
import { paymentValidationSchema } from "./payment.validation";

const router = express.Router();

router.post(
  "/pay",
  auth(USER_ROLE.JOB_SEEKER),
  validateRequest(paymentValidationSchema.createPaymentValidationSchema),
  paymentController.initiatePayment
);

export const paymentRouter = router;
