import React from "react";

import Dashboard from "components/Dashboard";
import { ShowTask } from "components/Tasks";
import CreateTask from "components/Tasks/Create";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={ShowTask} path="/tasks/:slug/show" />
      <Route exact component={CreateTask} path="/tasks/create" />
      <Route exact component={Dashboard} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;
