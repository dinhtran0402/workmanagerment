import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "50% ",
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-secondary"
        color="secondary"
        onChange={(event) => {
          props.setSearchTerm(event.target.value);
        }}
        label="Search"
      />
    </form>
  );
}
