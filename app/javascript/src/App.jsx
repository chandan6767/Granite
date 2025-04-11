import React from "react";

import Dashboard from "components/Dashboard";
import CreateTask from "components/Tasks/Create";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={CreateTask} path="/tasks/create" />
      <Route exact component={Dashboard} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;
