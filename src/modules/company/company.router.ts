import express from "express";
import { companyController } from "./company.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validateRequest";
import { companyValidation } from "./company.validation";

const router = express.Router();

router.post(
  "/create",
  auth(USER_ROLE.ADMIN),
  validateRequest(companyValidation.createCompanyValidation),
  companyController.createCompany
);

router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE),
  companyController.getAllCompany
);

export const companyRouter = router;
