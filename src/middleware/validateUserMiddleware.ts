import { Request, Response, NextFunction } from "express";

import { validateCreateUser } from "../validation/valiateUser";
import { ErrorException } from "../Error-handler/error-exception";

export const validateCreateUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userPayload = req.body;
  try {
    const validate = validateCreateUser(userPayload);
    if (validate.error) {
      return;
    }
    next();
  } catch (error: any) {
    next(error);
  }
};
