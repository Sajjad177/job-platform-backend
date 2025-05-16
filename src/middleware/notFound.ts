import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Api not found",
    errorSource: [
      {
        path: req.originalUrl,
        message: `The requested API route ${req.originalUrl} was not found`,
      },
    ],
  });
  next();
};

export default notFound;
