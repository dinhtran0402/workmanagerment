import { css } from "@emotion/react";
import { Backdrop } from "@material-ui/core";
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
import { PropagateLoader } from "react-spinners";
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#FF1493",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleClose = () => {
    setLoading(false);
  };

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function handleSubmitLogin(e) {
    // e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      await timeout(3000);

      history.push("/");
    } catch {
      setError(
        "Failed to sign in (Email does not exist or password is incorrect)"
      );
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
          Sign in
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleSubmitLogin)}
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={passwordRef}
            autoComplete="current-password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && (
            <span style={{ color: "red" }}>Incorrect password</span>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign In
          </Button>
          <Backdrop
            className={classes.backdrop}
            open={loading}
            onClick={handleClose}
          >
            <PropagateLoader color="#00CED1" loading={loading} size={30} />
          </Backdrop>
          <Grid container>
            <Grid item xs>
              <NavLink
                style={{ textDecoration: "none" }}
                exact
                to="/ForgotPass"
              >
                Forgot password?
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
