import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from 'cors';

import routes from "./routes";
import "./database";

import uploadConfig from "./config/uploads";

import AppError from "./errors/AppError";

const app = express();
app.use(cors())

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "Error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
);

app.listen(3333, () => console.log("ola"));
