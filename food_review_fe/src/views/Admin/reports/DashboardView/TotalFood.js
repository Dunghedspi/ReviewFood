/* eslint-disable react/prop-types */
import {
  Avatar,
  Card,
  CardContent,
  colors,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));

const TotalFood = ({ className, totalFood, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Foods
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {totalFood}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <FastfoodOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalFood.propTypes = {
  className: PropTypes.string,
};

export default TotalFood;
