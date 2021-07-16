import { getRepository } from "typeorm";
import Users from "../models/users";
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
    console.log(CheckUserExist);
    if (CheckUserExist) {
      throw new Error("Email address already used");
    } //Cria uma estancia e não é necessario o await
    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
