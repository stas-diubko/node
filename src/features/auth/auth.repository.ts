import bcrypt from "bcrypt";
import User from "../user/user.model";
import { UserCreate, UserLogin } from "./api";
import { token } from "../../helpers";

export const loginUser = async (user: UserLogin) => {
    try {
        const userInDb = await User.findOne({ email: user.email});

        if (!userInDb) {
            return { status: 404, message: { error: "User not found" } };
        }

        const isPasswordMatching = await bcrypt.compare(user.password, userInDb.password);

        if (isPasswordMatching) {
            const accessToken = token.generateAccessToken(userInDb._id, userInDb.email);
            return { status: 200, message: { data: { accessToken: accessToken } } };
        }
        return { status: 400, message: { error: "Invalid password!" } };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};

export const registerUser = async (user: UserCreate) => {
    try {
        const checkUser = await User.countDocuments({ email: user.email });

        if (checkUser) {
            return { status: 404, message: { error: "email already exists!" } };
        }

        let createUser = new User(user);
        createUser.password = await bcrypt.hash(user.password, 10);
        
        await User.create(createUser);
        return { status: 200, message: { data: "Create user" } };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};