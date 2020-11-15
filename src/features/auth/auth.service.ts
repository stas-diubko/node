import bcrypt from "bcrypt";
import * as repository from "./auth.repository";
import { UserCreate, UserLogin } from "./api";
import logger from "../utils/logger";
import { UserModel } from "../user/user.model";
import { token } from "../../helpers";
import User from "../user/user.model";
import { AppError } from "../../helpers/app-errors";

export const login = async (user: UserLogin) => {
  const userInDb = (await repository.getUserByEmail(user)) as UserModel;

  if (!userInDb) {
    return AppError.notFound("User not found");
  }

  const isPasswordMatching = await bcrypt.compare(
    user.password,
    userInDb.password
  );

  if (isPasswordMatching) {
    const accessToken = token.generateAccessToken(userInDb._id, userInDb.email);
    return { status: 200, message: { data: { accessToken: accessToken } } };
  }

  logger.error(`Invalid password of user - ${userInDb._id}`);
  return AppError.badRequest("Invalid password!");
};

export const register = async (user: UserCreate) => {
  const checkUser = await repository.checkUserByEmail(user);

  if (checkUser) {
    return AppError.badRequest("Email already exists!");
  }

  let createUser = new User(user);
  createUser.password = await bcrypt.hash(user.password, 10);

  const result = await repository.createUser(createUser);
  return result;
};
