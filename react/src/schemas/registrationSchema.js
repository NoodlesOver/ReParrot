import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
  email: Yup.string().email("invalid email provided").required("Valid Email Required"),
  firstName: Yup.string().min(0).max(100),
  lastName: Yup.string().min(0).max(100),
  mi: Yup.string().min(0).max(2,"Middle Initial cannot be larger than 2 characters"),
  avatarUrl: Yup.string().min(0).max(255),
  password: Yup.string().required("No password provided").min(8, "Password too short - 8 characters min")
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confirmPassword: Yup.string().required("Confirmation required").oneOf([Yup.ref('password'), null], "Passwords must match"),
});

export default registrationSchema;