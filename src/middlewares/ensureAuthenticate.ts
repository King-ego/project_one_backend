import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

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
    throw new Error("JWT token is missing");
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
    throw new Error("Invalid JWT invalid");
  }
};

export default ensureAuthenticated;
