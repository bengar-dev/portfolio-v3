import * as yup from "yup";

export const AboutSchema = yup.object({
  text: yup.string(),
  urlPicture: yup.string().url("Should be an valid url"),
});
