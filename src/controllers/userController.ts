import { Response, NextFunction } from "express";

import { ErrorException } from "../Error-handler/error-exception";
import { ErrorCode } from "../Error-handler/error-code";
import { successResponse } from "../utils/response";
import USERS from "../model/userModel";
import { IGetUserAuthInfoRequest } from "../utils/interface";

export const searchFriend = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { searchfriend } = req.body;

  try {
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};
