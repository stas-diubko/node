import * as yup from "yup";

const featureSchema = yup.object().shape({
  title: yup.string().required(),
  level: yup.string().required(),
  estimate: yup.number().required(),
});

export const createProgectSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  features: yup.array(featureSchema)
});
