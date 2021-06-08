import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { UserApi } from "apis/UserApi";
import { useDispatch } from "react-redux";
import { SetInfo } from "actions/UserAction";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const ShopLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getUser = async () => {
      const response = await UserApi.getShopInfo();
      if (response && response.codeRole === "ROLE_ADMIN") {
        dispatch(SetInfo(response));
      } else {
        navigate("/food");
      }
    };
    getUser();
  }, []);
  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLayout;
