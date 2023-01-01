import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;

export const generateToken = async (payload: any, Secret = jwtSecret) => {
  const Token = await jwt.sign(payload, Secret, {
    expiresIn: process.env.EXPIRE_TIME,
  });

  return Token;
};

export async function decodeToken(token: any) {
  const payload = await jwt.verify(token, jwtSecret);
  return payload;
}
