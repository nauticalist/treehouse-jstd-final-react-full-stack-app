import { useState, useEffect } from "react";

/**
 * Custom hook for form validation on submit
 *
 * @param {function} callback function that will be executed after form validated successfully
 * @param {function} validate function that will validate form fields
 * @param {Object} data optional data which will be populated to fields
 * @returns {{handleSubmit: handleSubmit, handleChange: handleChange, values: {}, errors: {}}}
 */
export const useForm = (callback, validate, data = null) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // when no errors continue with callback function
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setErrors({});
      setIsSubmitting(false);
      callback();
    }
  }, [errors, isSubmitting, callback]);

  // If data is passed set field values initially
  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
