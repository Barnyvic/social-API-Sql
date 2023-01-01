import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../Error-handler/error-code";
import { ErrorException } from "../Error-handler/error-exception";
import { ErrorModel } from "../Error-handler/error-modal";

const errorHandleMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("Error handling middleware called.");
  console.log("Path:", request.path);
  console.error("Error occured:", err);
  if (err instanceof ErrorException) {
    console.log("Error is known.");
    response.status(err.status).send(err);
  } else {
    // For unhandled errors.
    response.status(500).send({
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      status: 500,
    } as ErrorModel);
  }
};

export default errorHandleMiddleware;
