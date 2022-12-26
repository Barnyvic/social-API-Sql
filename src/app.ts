import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import helmet from "helmet";

import authroutes from "./routes/routes";
import errorMiddleware from "./middleware/errorMiddleware";

dotenv.config();

class App {
  public server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.initializeErrorhandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(logger("dev"));
    this.server.use(helmet());
  }

  private initializeErrorhandler() {
    this.server.use(errorMiddleware);
  }

  routes() {
    this.server.use("/api/auth", authroutes);
  }
}

export default new App().server;
