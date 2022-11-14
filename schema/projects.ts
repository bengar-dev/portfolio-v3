import * as yup from "yup";

export const projectSchema = yup.object({
  name: yup.string().required("Name is mandatory"),
  description: yup.string().required("Description is mandatory"),
  skillsId: yup.array().of(yup.string()).required().min(1),
  urlImage: yup.string().url().required("Image url is mandatory"),
  preview: yup.string().required("Preview is mandatory"),
  github: yup.string().url(),
  live: yup.string().url(),
});
