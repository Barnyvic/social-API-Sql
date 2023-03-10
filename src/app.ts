import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import helmet from "helmet";

import authroutes from "./routes/routes";
import postRouter from "./routes/postroutes";
import errorMiddleware from "./middleware/errorMiddleware";
import adminRouter from "./routes/adminRoute";

dotenv.config();

class App {
  public server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.initializeErrorhandler();
    this.catchRouteNotFoundHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(logger("dev"));
    this.server.use(helmet());
  }

  routes() {
    this.server.use("/api/auth", authroutes);
    this.server.use("/api/post", postRouter);
    this.server.use("/api/auth/admin", adminRouter);
  }

  private initializeErrorhandler() {
    this.server.use(errorMiddleware);
  }

  catchRouteNotFoundHandler() {
    this.server.use("*", (req: Request, res: Response) => {
      return res.status(404).json({ message: "route not found" });
    });
  }
}

export default new App().server;
