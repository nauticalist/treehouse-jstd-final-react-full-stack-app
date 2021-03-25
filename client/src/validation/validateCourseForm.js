export const validateCourseForm = (values) => {
  let errors = {};

  if (!values.courseTitle) {
    errors.courseTitle = "* Title is required";
  }

  if (!values.courseDescription) {
    errors.courseDescription = "* Description is required";
  }

  return errors;
};
