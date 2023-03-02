import * as Yup from "yup";

const lostPasswordSchema = Yup.object().shape({
  email: Yup.string().email("invalid email provided").required("Valid Email Required")
});

export default lostPasswordSchema;