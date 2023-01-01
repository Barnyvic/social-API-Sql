import { Request, Response, NextFunction } from "express";

import { ErrorException } from "../Error-handler/error-exception";
import { ErrorCode } from "../Error-handler/error-code";
import User_Table from "../model/userModel";
import { IGetUserAuthInfoRequest } from "../utils/interface";
import { decodeToken } from "../utils/generateToken";

export const authMiddleware = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  try {
    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = await decodeToken(token);
      const user = await User_Table.findOne({ where: { id: decoded?.id } });

      if (!user)
        return next(new ErrorException(ErrorCode.NotFound, "User not Found"));

      req.user = user.dataValues;

      return next();
    } else if (!token)
      return next(
        new ErrorException(
          ErrorCode.NotFound,
          "No token pls register and login"
        )
      );
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};
