import { Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

const LoginButton = () => {
  return (
    <div>
      <NavLink
        style={{ color: "white", textDecoration: "none" }}
        exact
        to="/Login"
      >
        <Button color="inherit">Login</Button>
      </NavLink>
    </div>
  );
};

export default LoginButton;
