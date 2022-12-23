export interface IUser {
  id: string;
  Name: string;
  PhoneNumber: string;
  role: string;
  Email: string;
  createdAt: Date;
  password: string;
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
