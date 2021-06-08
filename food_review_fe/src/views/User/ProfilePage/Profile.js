import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { EditAvatar } from "actions/UserAction";
const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, register } = methods;
  const user = useSelector((state) => state.UserReducers);
  console.log(user);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.avatar[0]);
    dispatch(EditAvatar(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar className={classes.avatar} src={user.imageUrl} />
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <input
            type="file"
            hidden={true}
            id="avatar"
            name="avatar"
            onChange={handleSubmit(onSubmit)}
            ref={register}
          />
          <Button color="primary" fullWidth variant="text">
            <label
              htmlFor={"avatar"}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Upload Avatar
            </label>
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
