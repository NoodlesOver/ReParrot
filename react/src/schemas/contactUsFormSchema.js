import * as Yup from "yup";

const contactUsFormSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(20).required("First Name Required"),
  lastName: Yup.string().min(2).max(20).required("Last Name Required"),
  email: Yup.string()
    .email("Must be a valid email")
    .min(5)
    .max(50)
    .required("Email Required"),
  message: Yup.string().min(5).max(500).required("Message Required"),
});

export default contactUsFormSchema;
