import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import helmet from "helmet";

import routes from "./routes/routes";

dotenv.config();

class App {
  public server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(logger("dev"));
    this.server.use(helmet());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
