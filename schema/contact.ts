import * as yup from "yup";

export const contactSchema = yup.object({
  title: yup.string().required(),
  email: yup.string().email().required(),
  text: yup.string().required(),
});
