import express from "express";
import { applicationController } from "./application.controller";

const router = express.Router();

router.post("/apply", applicationController.applyApplication);


export const applicationRouter = router;
