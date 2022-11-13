import * as yup from "yup";

export const skillsSchema = yup.object({
  name: yup.string().required("Name is mandatory"),
  description: yup.string().required("Description is mandatory"),
  urlLogo: yup.string().required("Logo url is mandatory"),
});
