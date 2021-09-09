import {
  Button,
  Drawer,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";
import React from "react";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [state, setState] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onCreatePost(e) {
    e.preventDefault();
    const postData = {
      content,
      state,
    };
    axios
      .post(`https://611bca0a22020a00175a4730.mockapi.io/api/work`, postData)
      .then((res) => {
        handleClose();
        props.onPosted();
      });
  }
  return (
    <div>
      <Button style={{ float: "left", color: "green" }}>
        <AddCircleIcon type="button" onClick={handleOpen} />
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <form onSubmit={onCreatePost}>
          <Fade in={open}>
            <div className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  Add Form
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    <TextField
                      label="Title"
                      value={content}
                      variant="outlined"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <MenuItem value="Todo">Todo</MenuItem>
                      <MenuItem value="Doing">Doing</MenuItem>
                      <MenuItem value="Done">Done</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Primary
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Fade>
        </form>
      </Modal>
    </div>
  );
}
