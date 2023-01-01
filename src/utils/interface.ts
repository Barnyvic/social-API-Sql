import { Request } from "express";

export enum User_Role {
  User = "User",
  Admin = "Admin",
}

export interface IUser {
  id?: string;
  Name: string;
  PhoneNumber: string;
  role: User_Role;
  Email: string;
  createdAt: Date;
  Password: string;
  updatedAt: Date;
}

export interface IPost {
  id: number;
  Topic: string;
  Image: string;
  Body: string;
  view_Count: number;
  like: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
}
