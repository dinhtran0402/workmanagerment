import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useAuth } from "../../Contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "white",
    fontSize: 30,
    fontFamily: "Raleway",
    marginLeft: "393px",
  },
}));

export default function FullWidthGrid() {
  const { currentUser } = useAuth();

  const classes = useStyles();

  return (
    <div className="largeScreen && imageBackground && paddingText">
      <Typography className={classes.text}>
        Hello : {currentUser.email}
      </Typography>
    </div>
  );
}
