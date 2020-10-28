import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Country from "./Country";
import Countries from "./Countries";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <div className="container-fluid">
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <Countries />
            </Route>
            <Route path="/country">
              <Country />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
