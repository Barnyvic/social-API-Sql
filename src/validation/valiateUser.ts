import Joi from "joi";

import { IUser } from "../utils/interface";

export const validateCreateUser = (user: IUser) => {
  const shcema = Joi.object({
    Name: Joi.string().min(3).max(25).required(),
    PhoneNumber: Joi.string().min(3).max(25).required(),
    Email: Joi.string().email().required(),
    Password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$"))
      .required(),
    ConfirmPassword: Joi.ref("Password"),
  });

  return shcema.validate(user);
};
