/* eslint-disable react/prop-types */
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import StoreOutlinedIcon from "@material-ui/icons/StoreOutlined";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const TotalProfit = ({ className, totalShop, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL SHOP
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {totalShop}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <StoreOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string,
};

export default TotalProfit;
