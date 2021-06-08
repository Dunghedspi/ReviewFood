/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import styles from "assets/jss/material-kit-react/components/linkStyles.js";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
const useStyles = makeStyles(styles);
const LinkControl = (props) => {
  const { label, path, menu } = props;
  const classes = useStyles();
  const classLink = classnames([classes.root, classes.menu]);
  return (
    <React.Fragment>
      <Link to={path} className={menu ? classLink : classes.root}>
        {label}
      </Link>
    </React.Fragment>
  );
};

export default LinkControl;
