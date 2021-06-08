import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { BarChart as BarChartIcon, User as UserIcon } from "react-feather";
import { Link as RouterLink, useLocation } from "react-router-dom";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";
import StoreOutlinedIcon from "@material-ui/icons/StoreOutlined";

const items = [
  {
    href: "/admin",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/admin/customer",
    icon: UserIcon,
    title: "Customer",
  },
  {
    href: "/admin/foods",
    icon: FastfoodOutlinedIcon,
    title: "Foods",
  },
  {
    href: "/admin/shop",
    icon: StoreOutlinedIcon,
    title: "Shop",
  },
  {
    href: "/admin/account",
    icon: UserIcon,
    title: "Account",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector((state) => state.UserReducers);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.imageUrl}
          to="/shop/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box p={2} m={2} bgcolor="background.dark" />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
