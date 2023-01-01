import { Response, NextFunction } from "express";

import { ErrorException } from "../Error-handler/error-exception";
import { ErrorCode } from "../Error-handler/error-code";
import { successResponse } from "../utils/response";
import User_Table from "../model/userModel";
import Post_Table from "../model/PostModel";
import { IPost, IGetUserAuthInfoRequest } from "../utils/interface";

export const createPost = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Topic, Body } = req.body;
    if (!Topic || !Body)
      return next(
        new ErrorException(ErrorCode.CONFLIT, "Please Fill empty fields")
      );

    const { id } = req.user;
    const user = User_Table.findOne({ where: { id: id } });
    if (!user)
      return next(
        new ErrorException(ErrorCode.Unauthenticated, "You are not authorized")
      );

    const post = await Post_Table.create({
      Topic: Topic,
      Body: Body,
      userId: id,
    });

    return successResponse(res, 200, "Success", post);
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};
