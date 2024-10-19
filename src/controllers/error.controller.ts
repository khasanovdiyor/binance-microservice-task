import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";

const sendErrorProd = (err: AppError, res: Response) => {
  //Operational error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } //Programming or other unknown error
  else {
    console.log("Error 💥", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const globalErrorController = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    const error = { ...err };
    sendErrorProd(error, res);
  }
};
