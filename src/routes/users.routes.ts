import { request, response, Router } from "express";
import multer from "multer";
import uploadConfig from "../config/uploads";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarservice from "../services/UploadUserAvatarServices";

import ensureAuthenticated from "../middlewares/ensureAuthenticate";

interface UserProps {
  //Criando uma tipagem para tornar o password opcional e deleta-lo do retorno ao usuario
  id: string;
  name: string;
  email: string;
  password?: string;
  createaat: Date;
  updatedat: Date;
  avatar: string;
}

const usersRouter = Router();

const upload = multer(uploadConfig);

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

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    try {
      const UploadUserAvatar = new UpdateUserAvatarservice();

      const user: UserProps = await UploadUserAvatar.execute({
        user_id: request.user.id,
        filename: request.file?.filename,
      });
      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ errors: err.message });
    }
  }
);

export default usersRouter;
