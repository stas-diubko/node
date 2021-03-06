import { Schema, model, Document } from "mongoose";
import { User } from "./api";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

export interface UserModel extends User, Document {}

export default model<UserModel>("User", userSchema);
