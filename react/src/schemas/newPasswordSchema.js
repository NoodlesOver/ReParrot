import * as Yup from "yup";

const newPasswordSchema = Yup.object().shape({
  password: Yup.string().required("No password provided")
    .min(8, "Password too short - 8 characters min")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string().required("Confirmation required").oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default newPasswordSchema;