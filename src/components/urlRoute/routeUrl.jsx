import React from "react";
import { Route, Switch } from "react-router-dom";
import Edit from "../modelCreate/edit";
import Add from "../modelCreate/index";
import List from "../card/index";
import Home from "../home/index";
import Login from "../Auth/login";
import ForgotPass from "../Auth/forgotPass";
import Profile from "../Auth/profile";
import SignUp from "../Auth/signup";
import PrivateRoute from "./PrivateRoute";
// import SideBar from "../sidebar/index";
const routeURL = () => {
  return (
    <div>
      <Switch>
        {/* <SideBar /> */}
        <Route path="/Login" component={Login}></Route>
        <Route path="/SignUp" component={SignUp}></Route>
        <Route path="/ForgotPass" component={ForgotPass}></Route>
        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <Route path="/Add" component={Add}></Route>
        <PrivateRoute path="/List" component={List}></PrivateRoute>

        <PrivateRoute path="/Profile" component={Profile}></PrivateRoute>
        <Route path="/work/:id/edit" component={Edit}></Route>
      </Switch>
    </div>
  );
};

export default routeURL;
