import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadConfig from "../config/uploads";
import Users from "../models/users";
import { request } from "express";

interface RequesteProps {
  user_id: string | undefined;
  filename: string | undefined;
}

class UpdateUserAvatarservice {
  public async execute({ user_id, filename }: RequesteProps): Promise<Users> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error("Only authenticated users can change avatar");
    }

    if (user.avatar) {
      //remover caso exista
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename as string;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarservice;
