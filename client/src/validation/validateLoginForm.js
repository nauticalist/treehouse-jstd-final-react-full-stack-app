export const validateLoginForm = (values) => {
  let errors = {};

  if (!values.emailAddress) {
    errors.emailAddress = "* Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.emailAddress)) {
    errors.emailAddress = "* Email address is invalid";
  }

  if (!values.password) {
    errors.password = "* Password is required";
  }
  return errors;
};
