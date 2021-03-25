import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../context/context";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {({ isAuthenticated, authUser }) => (
        <Route
          {...rest}
          render={(props) =>
            isAuthenticated && authUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/sign-in",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
