import { Request, Response, NextFunction } from "express";

import { validateCreateUser } from "../validation/valiateUser";
import { ErrorException } from "../Error-handler/error-exception";
import { ErrorCode } from "../Error-handler/error-code";

export const validateCreateUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userPayload = req.body;
  try {
    const validate = await validateCreateUser(userPayload);
    console.log(validate);

    if (validate.error) {
      return next(
        new ErrorException(
          ErrorCode.VALIDATE_ERROR,
          validate?.error.details[0].message
        )
      );
    }
    next();
  } catch (error: any) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};
