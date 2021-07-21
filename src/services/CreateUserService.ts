import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import Users from "../models/users";
import AppError from "../errors/AppError";

// services ficam as regras de negocio
interface RequesteProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: RequesteProps): Promise<Users> {
    const userRepository = getRepository(Users);

    const CheckUserExist = await userRepository.findOne({
      where: { email },
    });
    if (CheckUserExist) {
      throw new AppError("Email address already used");
    } //Cria uma estancia e não é necessario o await

    const hastPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hastPassword,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
