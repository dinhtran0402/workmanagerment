import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouterUrl from "./components/urlRoute/routeUrl";
import AuthProvider from "./Contexts/AuthContext";
import SideBar from "./components/sidebar/index";
import { useEffect, useState } from "react";
import {
  unstable_createMuiStrictModeTheme,
  ThemeProvider,
} from "@material-ui/core";
function App() {
  const getMode = () => {
    return JSON.parse(localStorage.getItem("mode"));
  };
  const [themeMode, setThemeMode] = useState(getMode());
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(themeMode));
  }, [themeMode]);

  const theme = unstable_createMuiStrictModeTheme({
    palette: {
      type: themeMode,
      primary: {
        main: themeMode === "dark" ? "#008B8B" : "#48D1CC",
      },
    },
  });

  const handleLightMode = () => {
    document.querySelector("body").style.background = "#FFFAFA";
    setThemeMode("light");
  };
  const handleDarkMode = () => {
    document.querySelector("body").style.background = "#111";
    setThemeMode("dark");
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={themeMode === "dark" ? "dark-mode" : "light-mode"}>
          <AuthProvider>
            <SideBar
              themeMode={themeMode}
              lightMode={handleLightMode}
              darkMode={handleDarkMode}
            />
            <RouterUrl />
          </AuthProvider>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
