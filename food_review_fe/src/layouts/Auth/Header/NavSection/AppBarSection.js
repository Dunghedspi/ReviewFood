/* eslint-disable react/prop-types */
/* eslint-disable quotes */
/* eslint-disable no-undef */
// /* eslint-disable quotes */
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import logo from "assets/img/logo/icon1.svg";
import classNames from "classnames";
import LinkCustom from "components/Link";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
    "& > header": {
      borderRadius: "0 0 5px 5px",
      backgroundColor: "white!important",
    },
    padding: "0!important",
  },
  name: {
    fontSize: "16px",
    backgroundColor: "none!important",
  },
  appbar: {
    backgroundColor: "transparent!important",
  },
  cartBox: {
    "& > button": {
      marginLeft: "0!important",
      top: "2px",
    },
    "& > button:hover": {
      backgroundColor: "none!important",
    },
    marginLeft: "0!important",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "black",
  },
  logo: {
    maxWidth: "40px",
    minWidth: "30px",
    height: "auto",
  },
  avatarBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div > div > button": {
      top: "0!important",
    },
    padding: "0 0 0 5px",
  },
  img: {
    width: "30px",
    height: "auto",
    borderRadius: "50%",
  },
  search: {
    position: "relative",
    "&:hover": {
      backgroundColor: "#e5e5e5",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    backgroundColor: "#f5f5f5",
    borderRadius: "45px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#c4c2c2",
    },
    zIndex: "100",
    maxWidth: "40px",
    borderRadius: "50%",
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "14ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  imageDropdownButton: {
    padding: "0px",
    top: "4px",
    borderRadius: "50%",
    marginLeft: "5px",
  },
  item: {
    margin: "0 0 0 2%",
  },
  list: {
    margin: 0,
    padding: "0!important",
    listStyle: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexFlow: "row nowrap",
    flexGrow: "18",
  },
  listItem: {
    float: "left",
    color: "black",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0 8px 0 0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
        backgroundColor: "#e5e5e5",
      },
    },
    "& > div > div > button": {
      borderRadius: "0!important",
      top: "0!important",
      marginLeft: "0!important",
      border: "none",
    },
    "&>button": {
      padding: "0!important",
      minWidth: "50px",
    },
  },
  link: {
    color: "black!important",
    "&:hover": {
      textDecoration: "none",
    },
    textDecoration: "none",
  },
  boxHeader: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
  },
  "@media (max-width: 900px)": {
    list: {
      order: 4,
      justifyContent: "space-between",
      "&>button": {
        padding: "0!important",
        minWidth: "50px",
        fontSize: "13px",
      },
    },
    boxLogo: { flex: "20%" },
    right: { flex: "60%" },
    boxProduct: { flex: "100%" },
    link: { fontSize: "13px" },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "50%",
      [theme.breakpoints.up("ms")]: {
        width: "10ch",
        "&:focus": {
          width: "5ch",
        },
      },
    },
  },
  "@media (max-width: 600px)": {
    listItem: {
      "& > div > div > button": {
        fontSize: "10px",
      },
    },
    link: {
      fontSize: "10px",
    },
  },
  boxLogo: {
    display: "flex",
    justifyContent: "flex-start",
    flexFlow: "row nowrap",
    alignItems: "center",
    flexGrow: "2",
    height: "50px",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
    flexFlow: "row nowrap",
    alignItems: "center",
    flexGrow: "2",
    paddingRight: "10px",
  },
  absolute: {
    position: "absolute",
    zIndex: "1100",
  },
  fixed: {
    position: "fixed",
    zIndex: "1100",
    transition: "transform .3s ease",
  },
  white: {
    border: "0",
    padding: "0 0",
    marginBottom: "0",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
  },
  unshow: {
    top: 0,
    transform: "translateY(-110px)",
  },
}));

export default function SectionNavbars(props) {
  const [pYOffsetPrev, setPYOffsetPrev] = useState(0);
  const classes = useStyles();
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const headerColorChange = () => {
    const { changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > pYOffsetPrev) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.unshow);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.unshow);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.fixed);
    }
    setPYOffsetPrev(windowsScrollTop);
  };
  const { absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes.absolute]: absolute,
  });
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={(classes.appbar, appBarClasses, classes.fixed)}
      >
        <Toolbar className={classes.boxHeader}>
          <div className={classes.boxLogo}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="open drawer"
            >
              <LinkCustom
                path="/"
                name="home"
                label={<img src={logo} className={classes.logo} alt="logo" />}
              />
            </IconButton>
            <Link to="/" name="home" className={classes.link}>
              <h6 className={classes.name}>Review-Food</h6>
            </Link>
          </div>
          <div className={classes.right}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
