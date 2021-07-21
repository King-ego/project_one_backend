import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";
import AppError from "../errors/AppError";

interface tokenProps {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Validação do token JWT
  const authorHeades = request.headers.authorization;

  if (!authorHeades) {
    throw new AppError("JWT token is missing", 401);
  }

  const { secret } = authConfig.jwt;

  const [, token] = authorHeades.split(" ");

  try {
    const decode = verify(token, secret);

    const { sub } = decode as tokenProps;
    //maneira de adicionar o id a todas as rotas autenticadas
    request.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    throw new AppError("Invalid JWT invalid", 401);
  }
};

export default ensureAuthenticated;
