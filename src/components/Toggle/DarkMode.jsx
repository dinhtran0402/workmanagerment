import React from "react";
import { IconButton } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
export default function Switches({ themeMode, lightMode, darkMode }) {
  return (
    <div>
      {themeMode === "dark" ? (
        <IconButton onClick={lightMode}>
          <WbSunnyIcon />
        </IconButton>
      ) : (
        <IconButton onClick={darkMode}>
          <Brightness4Icon />
        </IconButton>
      )}
    </div>
  );
}
