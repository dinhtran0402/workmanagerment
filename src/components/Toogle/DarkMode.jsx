import React from "react";
import Switch from "@material-ui/core/Switch";

export default function Switches() {
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Switch
        onChange={handleChange}
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </div>
  );
}
