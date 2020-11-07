import { validate } from "../../helpers";
import LoginSchema from "./schemas/LoginSchema.json";
import RegisterSchema from "./schemas/RegisterSchema.json";
import * as repository from "./auth.repository";
import { UserCreate, UserLogin } from "./api";
import logger from "../utils/logger";

export const login = async (user: UserLogin) => {
    const validateObject = validate.toValidate(user, LoginSchema);

    if (!validateObject.valid) {
        logger.error(`login data is not valid, error: ${validateObject.errors}, user = ${JSON.stringify(user)}`);
        return { status: 400, message: { error: validateObject.errors } };
    }

    const result = await repository.loginUser(user);
    return result;
};

export const register = async (user: UserCreate) => {
    const validateObject = validate.toValidate(user, RegisterSchema);

    if (!validateObject.valid) {
        logger.error(`registration data is not valid, error: ${validateObject.errors}, user = ${JSON.stringify(user)}`);
        return { status: 400, message: { error: validateObject.errors } };
    }

    const result = await repository.registerUser(user);
    return result;
}