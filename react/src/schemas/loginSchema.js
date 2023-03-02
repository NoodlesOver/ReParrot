import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email provided").required("Valid email required"),
  password: Yup.string().required("No password provided")
});

export default loginSchema;