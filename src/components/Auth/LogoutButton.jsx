import { Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

const LogoutButton = (props) => {
  return (
    <div>
      <NavLink
        style={{ color: "white", textDecoration: "none" }}
        exact
        to="/Profile"
      >
        <Button color="inherit">Profile</Button>
      </NavLink>
      <Button style={{ color: "white" }} onClick={props.handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
