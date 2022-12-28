import { Request, Response } from "express";

export function successResponse(
  res: Response,
  statusCode: number,
  message: string,
  data: any = []
) {
  const resobj = { statusCode, message, data };
  return res.status(statusCode).send(resobj);
}
