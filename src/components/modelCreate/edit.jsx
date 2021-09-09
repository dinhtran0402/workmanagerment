import { Button, Input, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditForm(props) {
  const { currentUser, onFinish } = props;
  const classes = useStyles();
  const [user, setUser] = useState(currentUser);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value, id: currentUser.id });
  };

  const onPut = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://611bca0a22020a00175a4730.mockapi.io/api/work/${user.id}`,
        user
      )
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          onFinish();
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <form onSubmit={onPut}>
      <div className={classes.paper}>
        <Typography>
          Title:
          <Input
            label="Title"
            name="content"
            value={user.content}
            onChange={handleInputChange}
          />
        </Typography>
        <br />

        <Typography>
          State:
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="state"
            value={user.state}
            onChange={handleInputChange}
          >
            <MenuItem value="Todo">Todo</MenuItem>
            <MenuItem value="Doing">Doing</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            {/* {ListState.map((user) => (
              <MenuItem value={user.state}>{user.state}</MenuItem>
            ))} */}
          </Select>
        </Typography>
        <Typography>
          <Button type="submit" variant="contained" color="primary">
            Primary
          </Button>
        </Typography>
      </div>
    </form>
  );
}
