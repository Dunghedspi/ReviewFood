/* eslint-disable no-unused-vars */
import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/index";
import { UserApi } from "apis/UserApi";
import { useDispatch } from "react-redux";
import { SetInfo } from "actions/UserAction";
import { useNavigate } from "react-router-dom";
import LoaderCustom from "components/LoaderCustom";
import "react-toastify/dist/ReactToastify.css";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    flexFlow: "column nowrap",
    margin: 0,
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    marginTop: "64px",
  },
  footer: {
    marginTop: theme.spacing(2),
  },
  loader: {
    backgroundColor: "#717573",
    zIndex: 2000,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    minHeight: "100vh",
    opacity: 0.8,
  },
}));

const AdminLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  React.useEffect(() => {
    const getUser = async () => {
      const response = await UserApi.getUserInfo();
      console.log(response);
      if (response) {
        dispatch(SetInfo(response));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setTimeout(() => {
          setShow(false);
        }, 1000);
      }
    };
    getUser();
  }, []);
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Outlet />
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
      {show ? (
        <div className={classes.loader}>
          <LoaderCustom />
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default AdminLayout;
