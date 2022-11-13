import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup
    .string()
    .email("must be an valid email")
    .required("email is required"),
  password: yup.string().required("password is required"),
});
