import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.number().required(),
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.number().required(),
});
