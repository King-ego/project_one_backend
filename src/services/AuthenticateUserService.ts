import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import Users from "../models/users";
import authConfig from "../config/auth";

interface RequesteProps {
  email: string;
  password: string;
}
interface UserProps {
  user: Users;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequesteProps): Promise<UserProps> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Incorrect Email/Password combinated.");
    }
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect Email/Password combinated.");
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });
    return { user, token };
  }
}

export default AuthenticateUserService;
