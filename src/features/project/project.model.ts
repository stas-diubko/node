import { Schema, model, Document } from "mongoose";
import { ProjectCreate } from "./api";

const featureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  estimate: {
    type: Number,
    required: true,
  }
});

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
    features: {
      type: [featureSchema],
      required: false,
    }
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

export interface ProjectModel extends ProjectCreate, Document {};

export default model<ProjectModel>("Project", projectSchema);