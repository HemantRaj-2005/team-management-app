import { ErrorRequestHandler } from "express";
import { AppError } from "../utils/appError";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {

    console.error(`Error occured at PATH: ${req.path}`, error);
    
  if (error instanceof SyntaxError) {
    return res.status(400).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown Error Occured",
  });
};
