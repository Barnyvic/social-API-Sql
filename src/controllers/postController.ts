import { Response, NextFunction } from "express";

import { ErrorException } from "../Error-handler/error-exception";
import { ErrorCode } from "../Error-handler/error-code";
import { successResponse } from "../utils/response";
import USERS from "../model/userModel";
import POST from "../model/PostModel";
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
    const user = USERS.findOne({ where: { id: id } });
    if (!user)
      return next(
        new ErrorException(ErrorCode.Unauthenticated, "You are not authorized")
      );

    const post = await POST.create({
      Topic: Topic,
      Body: Body,
      userId: id,
    });

    return successResponse(res, 201, "Success", post);
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};

export const viewAllPost = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if user exist
    const { id } = req.user;
    const user = USERS.findOne({ where: { id: id } });
    if (!user)
      return next(
        new ErrorException(ErrorCode.Unauthenticated, "You are not authorized")
      );

    const post = await POST.findAll({
      include: { model: USERS, attributes: ["Name", "PhoneNumber"] },
      order: [["createdAt", "DESC"]],
    });

    return successResponse(res, 200, "Success", post);
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};

export const uploadPostImage = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    const user = USERS.findOne({ where: { id: id } });
    if (!user)
      return next(
        new ErrorException(ErrorCode.Unauthenticated, "You are not authorized")
      );

    const uploadImage = await POST.findOne({ where: { id: req.params.id } });

    console.log(req.file);

    const uploadedImg = await uploadImage.update({
      Image: req.file?.path,
    });

    return successResponse(
      res,
      202,
      "picture uploaded successfully",
      uploadedImg
    );
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};
