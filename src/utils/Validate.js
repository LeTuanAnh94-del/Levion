import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please input your email"),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters")
    .required("Please enter a password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password incorrect")
    .required("Please confirm password"),
});

export default ValidationSchema;
