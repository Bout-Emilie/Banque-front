import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./Login";
import Compte from "./Compte";
import * as serviceWorker from "./serviceWorker";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

//ReactDOM.render(<Login />, document.getElementById("root"));
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/App" component={App} />
      <Route path="/Compte" component={Compte} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
