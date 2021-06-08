import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "row nowrap",
    minHeight: "100vh",
  },
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
function LoaderCustom() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
}

export default LoaderCustom;
