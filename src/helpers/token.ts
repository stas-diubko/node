import jwt from "jsonwebtoken";
require("dotenv").config();

export const generateAccessToken = (userId: string, email: string, expiresIn?:string) => {
    const payload = {
        email,
        _id: userId,
        type: "access"
    };

    const options = { expiresIn: expiresIn || "6m" };
    const secret =  process.env.SECRET_KEY || '';

    return jwt.sign(payload, secret, options);
};