import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
    email: Yup.string()
        .min(5, "Must be longer than 5 characters")
        .required("Required"),
    password: Yup.string()
        .min(8, "Must be longer than 8 characters")
        .max(50, "Nice try, must be less than 50 characters")
        .required("Required")
});
export default loginFormSchema;