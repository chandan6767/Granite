import React from "react";

import Dashboard from "components/Dashboard";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <div>Home</div>} />
      <Route exact path="/about" render={() => <div>About</div>} />
      <Route exact component={Dashboard} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;
