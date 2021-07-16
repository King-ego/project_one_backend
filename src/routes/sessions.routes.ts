import { Router } from "express";

import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();
interface UserProps {
  id: string;
  name: string;
  email: string;
  password?: string;
  createaat: Date;
  updatedat: Date;
}
interface authProps {
  user: UserProps;
  token: string;
}

sessionsRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;

    const AuthenticateUser = new AuthenticateUserService();

    const { user, token }: authProps = await AuthenticateUser.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ errors: err.message });
  }
});

export default sessionsRouter;