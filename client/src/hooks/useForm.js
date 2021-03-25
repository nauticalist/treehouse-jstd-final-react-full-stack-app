import { useState, useEffect } from "react";

export const useForm = (callback, validate, data = null) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setErrors({});
      setIsSubmitting(false);
      callback();
    }
  }, [errors, isSubmitting, callback]);

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
