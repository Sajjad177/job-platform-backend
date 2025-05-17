import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { authRouter } from "../modules/auth/auth.router";
import { companyRouter } from "../modules/company/company.router";
import { jobRouter } from "../modules/job/job.router";
import { applicationRouter } from "../modules/application/application.router";
import { paymentRouter } from "../modules/payment/payment.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/company",
    route: companyRouter,
  },
  {
    path: "/job",
    route: jobRouter,
  },
  {
    path: "/application",
    route: applicationRouter,
  },
  {
    path: "/payment",
    route: paymentRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
