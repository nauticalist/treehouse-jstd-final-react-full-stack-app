import React, { Component, createContext } from "react";
import { getUser } from "../data/getUser";

export const AuthContext = createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      authUser: JSON.parse(localStorage.getItem("authUser")),
    };
  }

  signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      getUser(email, password)
        .then((data) => {
          this.setState({ isAuthenticated: true, authUser: data });
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("authUser", JSON.stringify(data));
          resolve(true);
        })
        .catch((error) => reject(error));
    });
  };

  signOut = () => {
    this.setState({ setIsAuthenticated: false, authUser: null });
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authUser");
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.state.isAuthenticated,
          authUser: this.state.authUser,
          actions: {
            signIn: this.signIn,
            signOut: this.signOut,
          },
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const Consumer = AuthContext.Consumer;
