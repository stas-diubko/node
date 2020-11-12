import bcrypt from "bcrypt";
import User from "../user/user.model";
import { UserCreate, UserLogin } from "./api";

export const createUser = async (user: UserCreate) => {
  try {
    await User.create(user);
    return { status: 200, message: { data: "Create user" } };
  } catch (error) {
    return { status: 500, message: { error } };
  }
};

export const getUserByEmail = async (user: UserLogin) => {
  try {
    return await User.findOne({ email: user.email });
  } catch (error) {
    return { status: 500, message: { error } };
  }
};

export const checkUserByEmail = async (user: UserLogin) => {
  try {
    return await User.countDocuments({ email: user.email });
  } catch (error) {
    return { status: 500, message: { error } };
  }
};
