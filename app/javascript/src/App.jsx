import React from "react";

import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import { CreateTask, EditTask, ShowTask } from "components/Tasks";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={Signup} path="/signup" />
      <Route exact component={EditTask} path="/tasks/:slug/edit" />
      <Route exact component={ShowTask} path="/tasks/:slug/show" />
      <Route exact component={CreateTask} path="/tasks/create" />
      <Route exact component={Dashboard} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;
