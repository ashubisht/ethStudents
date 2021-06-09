import './App.css';
import Login from './login/Login';
import Dashboard from "./dashboard/Dashboard";
import Report from "./report/Report";
import Register from "./register/Register";
import Generate from "./generate/Generate";
import Teacher from "./teacher/Teacher";
import Admin from "./admin/Admin";
import ReportAdmin from "./admin/ReportAdmin";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/report" component={Report} />
            <Route path="/register" component={Register} />
            <Route path="/generate" component={Generate} />
            <Route path="/teacher" component={Teacher} />
            <Route path="/admin" component={Admin} />
            <Route path="/reportAdmin" component={ReportAdmin} />
            <Route path="*" component={Login} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
