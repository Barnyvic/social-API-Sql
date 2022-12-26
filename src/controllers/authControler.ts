import { Request, Response, NextFunction } from "express";

import { hashPassword } from "../utils/hash";
import User_Table from "../model/userModel";
import { generateToken } from "../utils/generateToken";
import { ErrorException } from "../Error-handler/error-exception";
import { ErrorCode } from "../Error-handler/error-code";

//@desc Register new user
//@route POST /register
//@access Public

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Name, PhoneNumber, Email, Password, Role, ConfirmPassword } =
      req.body;
    if (Password !== ConfirmPassword)
      return res.status(400).send("PassWord must Match");

    const hashedPassword = await hashPassword(Password);

    const newUser = await User_Table.create({
      Name: Name.trim(),
      PhoneNumber: PhoneNumber,
      Email: Email,
      Password: hashedPassword,
      role: Role,
    });

    res.status(200).send({ data: newUser });
    console.log(newUser);
  } catch (error) {
    next(error.message);
  }
};
