import { Schema, model, Document } from "mongoose";
import { FeatureView } from "./api";

const ObjectId = Schema.Types.ObjectId;

const featureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  project: {
    type: ObjectId,
    required: true,
  },
});

interface FeatureModel extends FeatureView, Document {}

export default model<FeatureModel>("Feature", featureSchema);
