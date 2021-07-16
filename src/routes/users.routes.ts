import { Router } from "express";

import CreateUserService from "../services/CreateUserService";
interface UserProps {
  //Criando uma tipagem para tornar o password opcional e deleta-lo do retorno ao usuario
  id: string;
  name: string;
  email: string;
  password?: string;
  createaat: Date;
  updatedat: Date;
}
const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user: UserProps = await createUser.execute({ name, email, password });
    delete user.password; //removendo o usuario do retorno da rota
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ errors: err.message });
  }
});

export default usersRouter;
