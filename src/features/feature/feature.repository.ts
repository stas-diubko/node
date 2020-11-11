import { FeatureView } from "./api";
import Feature from "./feature.model";

export const createFeature = async (feature: FeatureView) => {
  try {
    await Feature.create(feature);
    return { status: 200, message: { data: "Feature created!" } };
  } catch (error) {
    return { status: 400, message: { error } };
  }
};
