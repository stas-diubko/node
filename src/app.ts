import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from "./features/auth/auth.routes";
// import errorHandler from './helpers/errorHandler';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json({limit: "50mb"}));
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use("/api/auth", authRoutes);
  }

  private catchErrors(): void {
    // this.express.use(errorHandler.notFound);
    // this.express.use(errorHandler.internalServerError);
  }

}


export default new App().express;