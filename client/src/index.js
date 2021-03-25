import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/reset.css";
import "./assets/css/global.css";
import App from "./App";
import { Provider } from "./context/context";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
