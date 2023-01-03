import dotenv from "dotenv";

dotenv.config();

const config = {
  CLOUD_NAME: process.env.CLOUD_NAME as string,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY as string,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET as string,
};

export default config;
