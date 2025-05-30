import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./router";

const app: Application = express();

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Your server is running");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
