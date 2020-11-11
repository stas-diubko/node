import { Schema, model, Document } from "mongoose";
import { ProjectCreate } from "./api";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // _id: {
    //     type: String,
    // }
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

interface ProjectModel extends ProjectCreate, Document {};

export default model<ProjectModel>("Project", projectSchema);