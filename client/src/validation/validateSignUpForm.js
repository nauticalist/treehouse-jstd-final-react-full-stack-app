export const validateSignUpForm = (values) => {
  let errors = {};

  if (!values.firstName) {
    errors.firstName = "* First name is required";
  }

  if (!values.lastName) {
    errors.lastName = "* Last name is required";
  }

  if (!values.emailAddress) {
    errors.emailAddress = "* Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.emailAddress)) {
    errors.emailAddress = "* Email address is invalid";
  }

  if (!values.firstPassword) {
    errors.firstPassword = "* Password is required";
  } else if (values.firstPassword.length < 6) {
    errors.firstPassword = "* Password must be 6 or more characters";
  }

  if (!values.secondPassword) {
    errors.secondPassword = "* Confirm Password is required";
  } else if (values.secondPassword !== values.firstPassword) {
    errors.secondPassword = "* Passwords does not match.";
  }

  return errors;
};
