import bcrypt from "bcrypt";
import { validate } from "../../helpers";
import LoginSchema from "./schemas/LoginSchema.json";
import RegisterSchema from "./schemas/RegisterSchema.json";
import * as repository from "./auth.repository";
import { UserCreate, UserLogin } from "./api";
import logger from "../utils/logger";
import { UserModel } from "../user/user.model";
import { token } from "../../helpers";
import User from "../user/user.model";

export const login = async (user: UserLogin) => {
  const validateObject = validate.toValidate(user, LoginSchema);

  if (!validateObject.valid) {
    logger.error(
      `login data is not valid, error: ${
        validateObject.errors
      }, user = ${JSON.stringify(user)}`
    );
    return { status: 400, message: { error: validateObject.errors } };
  }

  const userInDb = (await repository.getUserByEmail(user)) as UserModel;

  if (!userInDb) {
    return { status: 404, message: { error: "User not found" } };
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
  return { status: 400, message: { error: "Invalid password!" } };
};

export const register = async (user: UserCreate) => {
  const validateObject = validate.toValidate(user, RegisterSchema);

  if (!validateObject.valid) {
    logger.error(
      `registration data is not valid, error: ${
        validateObject.errors
      }, user = ${JSON.stringify(user)}`
    );
    return { status: 400, message: { error: validateObject.errors } };
  }

  const checkUser = await repository.checkUserByEmail(user);

  if (checkUser) {
    return { status: 404, message: { error: "email already exists!" } };
  }

  let createUser = new User(user);
  createUser.password = await bcrypt.hash(user.password, 10);

  const result = await repository.createUser(createUser);
  return result;
};
