import express from "express";
import { companyController } from "./company.controller";

const router = express.Router();

router.post("/create", companyController.createCompany);

export const companyRouter = router;
