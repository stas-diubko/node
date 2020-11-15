import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const router = require("./app-routes");

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json({limit: "50mb"}));
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use("/api", router);
  }
}

export default new App().express;