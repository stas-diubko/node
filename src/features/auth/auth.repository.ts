import { AppError } from "../../helpers/app-errors";
import User from "../user/user.model";
import logger from "../utils/logger";
import { UserCreate, UserLogin } from "./api";

export const createUser = async (user: UserCreate) => {
  try {
    await User.create(user);
    return { status: 200, message: { data: "Create user" } };
  } catch (error) {
    logger.error(`Internal server error - ${error.toString()}`);
    return AppError.serverError(error.toString());
  }
};

export const getUserByEmail = async (user: UserLogin) => {
  try {
    return await User.findOne({ email: user.email });
  } catch (error) {
    logger.error(`Internal server error - ${error.toString()}`);
    return AppError.serverError(error.toString());
  }
};

export const checkUserByEmail = async (user: UserLogin) => {
  try {
    return await User.countDocuments({ email: user.email });
  } catch (error) {
    logger.error(`Internal server error - ${error.toString()}`);
    return AppError.serverError(error.toString());
  }
};
