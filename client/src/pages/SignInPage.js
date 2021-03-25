import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/context";
import { useForm } from "../hooks";
import { validateLoginForm } from "../validation";

export const SignInPage = (props) => {
  const [apiError, setApiError] = useState(null);
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validateLoginForm
  );
  const history = useHistory();
  const context = useContext(AuthContext);

  function login() {
    const { from } = props.location.state || { from: { pathname: "/" } };
    context.actions
      .signIn(values.emailAddress, values.password)
      .then(() => history.push(from))
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
  }

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <div>
          {apiError && <p className="response-error">{apiError.message}</p>}
          <form onSubmit={handleSubmit} noValidate>
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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password || ""}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="field-error">{errors.password}</p>
              )}
            </div>
            <div className="pad-bottom">
              <button className="button" type="submit">
                Sign In
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
          Don't have a user account? Click here to{" "}
          <Link to="/sign-up">sign up</Link>!
        </p>
      </div>
    </main>
  );
};
