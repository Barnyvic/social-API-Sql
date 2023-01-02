import { Request, Response, NextFunction } from "express";

import { comparePassword, hashPassword } from "../utils/hash";
import USERS from "../model/userModel";
import { generateToken } from "../utils/generateToken";
import { ErrorException } from "../Error-handler/error-exception";
import { ErrorCode } from "../Error-handler/error-code";
import { User_Role } from "../utils/interface";
import { successResponse } from "../utils/response";

//@desc Register new Admin
//@route POST /register
//@access Private

export const createNewAdmin = async (
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

    const emailExist = await USERS.findOne({ where: { Email: Email } });

    if (emailExist)
      return next(
        new ErrorException(
          ErrorCode.CONFLIT,
          "email already in use by another user"
        )
      );

    const phoneExist = await USERS.findOne({
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

    const newUser = await USERS.create({
      Name: Name.trim(),
      PhoneNumber: PhoneNumber,
      Email: Email,
      Password: hashedPassword,
      role: User_Role.Admin,
    });

    res.status(200).send({ data: newUser });
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};

//@desc getAll users and Role
//@route Get /getAllUsers
//@access Private

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Users = await (
      await USERS.findAll()
    ).map((user) => ({
      Id: user.dataValues.id,
      Name: user.dataValues.Name,
      Email: user.dataValues.Email,
      Phone: user.dataValues.PhoneNumber,
      Role: user.dataValues.role,
    }));

    return successResponse(res, 200, "Suceess", Users);
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};
