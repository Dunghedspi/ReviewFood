import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";
import App from "App/App";
import { Provider } from "react-redux";
import store from "store";
var history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
