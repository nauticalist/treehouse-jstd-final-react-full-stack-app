import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "../hooks";
import { validateSignUpForm } from "../validation";
import { createUser } from "../data";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { AuthContext } from "../context/context";

export const SignUpPage = () => {
  const [apiError, setApiError] = useState([]);
  const { values, errors, handleChange, handleSubmit } = useForm(
    handleCreateUser,
    validateSignUpForm
  );
  const context = useContext(AuthContext);
  const history = useHistory();

  function handleCreateUser() {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.emailAddress,
      password: values.secondPassword,
    };

    createUser(user)
      .then(() => {
        context.actions
          .signIn(values.emailAddress, values.secondPassword)
          .then(() => history.push("/"))
          .catch((error) => {
            if (error === 401) {
              setApiError({
                message:
                  "Your email addresss or password was entered incorrectly. Try again.",
              });
            } else {
              history.push("/error");
            }
          });
      })
      .catch((error) => {
        if (error.status === 400) {
          setApiError(error.data.errors);
        } else {
          history.push("/error");
        }
      });
  }

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <div>
          <ErrorDisplay errors={apiError} />
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={values.firstName || ""}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="field-error">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={values.lastName || ""}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="field-error">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={values.emailAddress || ""}
                onChange={handleChange}
              />
              {errors.emailAddress && (
                <p className="field-error">{errors.emailAddress}</p>
              )}
            </div>
            <div>
              <label htmlFor="firstPassword">Password</label>
              <input
                id="firstPassword"
                name="firstPassword"
                type="password"
                value={values.firstPassword || ""}
                onChange={handleChange}
              />
              {errors.firstPassword && (
                <p className="field-error">{errors.firstPassword}</p>
              )}
            </div>
            <div>
              <label htmlFor="secondPassword">Confirm Password</label>
              <input
                id="secondPassword"
                name="secondPassword"
                type="password"
                value={values.secondPassword || ""}
                onChange={handleChange}
              />
              {errors.secondPassword && (
                <p className="field-error">{errors.secondPassword}</p>
              )}
            </div>
            <div className="pad-bottom">
              <button className="button" type="submit">
                Sign Up
              </button>
              <button
                className="button button-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/sign-in">sign in</Link>!
        </p>
      </div>
    </main>
  );
};
