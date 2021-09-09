import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPass() {
  const classes = useStyles();
  const emailRef = useRef(null);
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [massager, setMassage] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function handleSubmitForgotPass(e) {
    e.preventDefault();

    try {
      setMassage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMassage("Check your inbox for further instructions");
    } catch {
      setError("Failed to Reset Password");
    }

    setLoading(false);
  }
  return (
    <Container component="main" maxWidth="xs" className="largeScreen">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {massager && <Alert severity="error">{massager}</Alert>}
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleSubmitForgotPass)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={emailRef}
            autoFocus
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>Email invalidate</span>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink style={{ textDecoration: "none" }} exact to="/Login">
                Sign in
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink style={{ textDecoration: "none" }} exact to="/SignUp">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
