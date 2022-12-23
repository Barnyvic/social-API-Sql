import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpExceptions";

const errorHandleMiddleware = (
  error: HttpException,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong during the request";
  response.status(status).json({ message, status });

  next();
};

export default errorHandleMiddleware;
