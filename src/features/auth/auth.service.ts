import { validate } from "../../helpers";
import LoginSchema from "./schemas/LoginSchema.json";
import * as repository from "./auth.repository";
import { UserLogin } from "./api";

export const login = async (user: UserLogin) => {
    const validateObject = validate(user, LoginSchema);

    if (!validateObject.valid) {
        // logger.error(`login user not validate, error: ${validateObject.errors}, user = ${JSON.stringify(user)}`);

        return { status: 400, message: { error: validateObject.errors } };
    }

    const result = await repository.loginUser(user);

    return result;
};