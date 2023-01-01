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
  id?: string;
  Topic: string;
  image: string;
  viewCount: number;
  Body: string;
  like: string;
  retweet: string;
  createdAt: Date;
  updatedAt: Date;
  // UserID: number;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
}
