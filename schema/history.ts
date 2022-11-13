import * as yup from "yup";

export const historySchema = yup.object({
  category: yup.string().required("Category is mandatory"),
  date: yup
    .date()
    .typeError("Invalid date")
    .nullable()
    .required("Date is mandatory"),
  description: yup.string().required("Description is mandatory"),
});
