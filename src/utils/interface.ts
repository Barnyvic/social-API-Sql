enum User_Role {
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
  Topic: string;
  image: string;
  viewCount: number;
  Body: string;
  like: string;
  retweet: string;
}
