import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string, email: string, expiresIn?:string) => {
    const payload = {
        email,
        _id: userId,
        type: "access"
    };

    const options = { expiresIn: expiresIn || "6m" };

    return jwt.sign(payload, process.env.SECRET_KEY, options);
};