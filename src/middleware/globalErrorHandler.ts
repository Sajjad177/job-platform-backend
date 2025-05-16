import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../interface/globalInterface";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import AppError from "../errors/AppError";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  let errorSource: TErrorSource = [
    {
      path: "",
      message: error.message,
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSource = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSource = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.nodeEnv === "development" ? error.stack : null,
  });
};

export default globalErrorHandler;
