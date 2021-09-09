import { Box, IconButton, MenuItem, Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  alpha,
  makeStyles,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import DarkMode from "../Toogle/DarkMode";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const { getUserState, logout } = useAuth();
  const theme = useTheme();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userState, setUserState] = React.useState(null);
  useEffect(() => {
    getUserState().then((user) => {
      if (user) {
        setUserState(user);
      }
    });
  }, [getUserState]);
  const AuthNav = () => {
    return (
      <>
        {userState != null ? (
          <LogoutButton handleLogout={handleLogout} />
        ) : (
          <LoginButton />
        )}
      </>
    );
  };
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  async function handleLogout() {
    await logout();
    setUserState(null);
    history.push("/Login");
  }
  const drawer = (
    <div>
      <div fontFamily="Monospace" className={classes.toolbar}>
        <List>
          <ListItem button>
            <Typography component="div">
              <Box
                color="#2196f3
                "
                fontWeight="fontWeightBold"
                fontFamily="Monospace"
                fontSize="h6.fontSize"
                m={1}
              >
                Work Management
              </Box>
            </Typography>
          </ListItem>
        </List>
      </div>
      <Divider />
      <List>
        <NavLink
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "#4682B4",
          }}
          className="linkMenu"
          to="/"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <HomeIcon style={{ color: "#00CED1" }} fontSize="medium" />
            </ListItemIcon>
            <ListItemText fontWeight="bold" primary="Home" />
          </StyledMenuItem>
        </NavLink>
        <NavLink
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "#4682B4",
          }}
          className="linkMenu"
          to="/List"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <AssignmentIcon style={{ color: "#2E8B57" }} fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Boards" />
          </StyledMenuItem>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.grow} variant="h6" noWrap></Typography>

          <IconButton>{AuthNav()}</IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
