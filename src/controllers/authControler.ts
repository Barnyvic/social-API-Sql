import { Request, Response, NextFunction } from "express";

import { comparePassword, hashPassword } from "../utils/hash";
import User_Table from "../model/userModel";
import { generateToken } from "../utils/generateToken";
import { ErrorException } from "../Error-handler/error-exception";
import { ErrorCode } from "../Error-handler/error-code";
import { successResponse } from "../utils/response";

//@desc Register new user
//@route POST /register
//@access Public

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Name, PhoneNumber, Email, Password, ConfirmPassword } = req.body;

    if (!Name || !PhoneNumber || !Email || !Password || !ConfirmPassword) {
      return next(
        new ErrorException(ErrorCode.VALIDATE_ERROR, "Please Fill empty fields")
      );
    }

    if (Password !== ConfirmPassword)
      return next(
        new ErrorException(ErrorCode.AsyncError, "Password must be provided")
      );

    const emailExist = await User_Table.findOne({ where: { Email: Email } });

    if (emailExist)
      return next(
        new ErrorException(
          ErrorCode.CONFLIT,
          "email already in use by another user"
        )
      );

    const phoneExist = await User_Table.findOne({
      where: { PhoneNumber: PhoneNumber },
    });

    if (phoneExist)
      return next(
        new ErrorException(
          ErrorCode.CONFLIT,
          "Phone Number already in use by another user"
        )
      );

    const hashedPassword = await hashPassword(Password);

    const newUser = await User_Table.create({
      Name: Name.trim(),
      PhoneNumber: PhoneNumber,
      Email: Email,
      Password: hashedPassword,
    });

    res.status(200).send({ data: newUser });
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};

//@desc Login user
//@route Get /register
//@access Public

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password)
      return next(
        new ErrorException(ErrorCode.VALIDATE_ERROR, "Please Fill empty fields")
      );

    const User = await User_Table.findOne({ where: { Email: Email } });

    if (!User)
      return next(
        new ErrorException(ErrorCode.NotFound, "User not found pls register")
      );

    const isPassword = await comparePassword(
      Password,
      User?.dataValues.Password
    );

    if (!isPassword)
      return next(new ErrorException(ErrorCode.CONFLIT, "incorrect password"));

    const token = await generateToken({
      id: User?.dataValues.id,
      email: User?.dataValues.Email,
    });

    return successResponse(res, 200, "user logged in successfully", {
      User,
      token,
    });
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};
