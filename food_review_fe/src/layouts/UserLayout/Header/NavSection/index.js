/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import LinkControl from "components/Link";
import InputBase from "@material-ui/core/InputBase";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "actions/UserAction";
import { useNavigate } from "react-router-dom";

const headersData = [];

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#FFFFFF",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
    borderRadius: "0 0 9px 9px",
    transition: "transform .3s ease",
    minHeight: "64px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "@media (max-width: 400px)": {
      paddingRight: "20px",
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    color: "black",
    textAlign: "left",
    "@media (max-width: 400px)": {
      fontSize: "14px",
    },
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
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
  search: {
    position: "relative",
    "&:hover": {
      backgroundColor: "#e5e5e5",
    },
    marginLeft: theme.spacing(1),
    width: "auto",
    backgroundColor: "#f5f5f5",
    "@media (max-width: 600px)": {
      marginLeft: theme.spacing(3),
    },
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
    width: "20ch",
    "&:focus": {
      width: "20ch",
    },
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
    flexFlow: "row nowrap",
    alignItems: "center",
    paddingRight: "10px",
  },
  img: {
    width: "30px",
    height: "30px",
  },
  logout: {
    "&:hover": {
      color: "#FFFFFF",
    },
  },
}));

export default function Header(props) {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
  const dispatch = useDispatch();
  const [pYOffsetPrev, setPYOffsetPrev] = useState(0);
  const classes = useStyles();
  const user = useSelector((state) => state.UserReducers);
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  // React.useEffect(() => {
  //   if (props.changeColorOnScroll) {
  //     window.addEventListener("scroll", headerColorChange);
  //   }
  //   return function cleanup() {
  //     if (props.changeColorOnScroll) {
  //       window.removeEventListener("scroll", headerColorChange);
  //     }
  //   };
  // });

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
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 480
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);
  const listDownNotLogin = [
    <LinkControl
      path="/auth/signin"
      menu={true}
      label={<div>Đăng Nhập</div>}
      key={1}
    />,
    <LinkControl
      path="/auth/signup"
      menu={true}
      label={<div>Đăng ký</div>}
      key={2}
    />,
    <LinkControl
      path="/register-shop-account"
      menu
      label={<div>Đăng kí tài khoản shop</div>}
      key={3}
    />,
  ];
  const handleClickLogout = () => {
    dispatch(Logout());
  };
  const NotLogin = () => {
    return (
      <>
        <PersonOutlineIcon
          style={{ color: "black", width: "25px", height: "auto" }}
        />
      </>
    );
  };

  const Login = React.memo((props) => {
    return (
      <>
        <Avatar className={classes.img} src={user.imageUrl} />
        <h5>{props.userName}</h5>
      </>
    );
  });
  const listDownAfterLogin = [
    <LinkControl
      path="/user"
      menu={true}
      label={<div>THông tin tài khoản</div>}
      key={1}
    />,
    <div
      onClick={() => {
        handleClickLogout();
      }}
      className={classes.logout}
    >
      Đăng xuất
    </div>,
  ];

  const DisplayDesktop = () => {
    const [key, setKey] = React.useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
      navigate(`/food/search?name=${key}`);
    };
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div className={classes.center}>{getMenuButtons()}</div>
        <div className={classes.right}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Tìm kiếm món ăn ..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "Tìm kiếm món ăn" }}
              value={key}
              onChange={(event) => {
                setKey(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
            />
          </div>
          <div className={classes.avatarBox}>
            <CustomDropdown
              left
              hoverColor="black"
              dropdownHeader={""}
              buttonText={user.isLogin ? <Login /> : <NotLogin />}
              buttonProps={{
                className: classes.navLink,
                color: "transparent",
              }}
              dropdownList={
                user.isLogin ? listDownAfterLogin : listDownNotLogin
              }
            />
          </div>
        </div>
      </Toolbar>
    );
  };

  const DisplayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const [key, setKey] = React.useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
      navigate(`/food/search?name=${key}`);
    };
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "black",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Tìm kiếm món ăn ..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "Tìm kiếm món ăn" }}
            value={key}
            onChange={(event) => {
              setKey(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") handleSearch();
            }}
          />
        </div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const femmecubatorLogo = (
    <RouterLink to="/food">
      <h4 className={logo}>Food</h4>
    </RouterLink>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    // <header className={classes.root}>
    <AppBar className={header}>
      {mobileView ? <displayMobile /> : <DisplayDesktop />}
    </AppBar>
    // </header>
  );
}
