/* eslint-disable react/prop-types */
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
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { EditAvatar } from "actions/UserAction";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: "auto",
    width: "100%",
    marginBottom: "20px",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const { user } = props;
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.thumbnail[0]);
    dispatch(EditAvatar(formData));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={classes.root}>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar
              className={classes.avatar}
              variant="square"
              src={user.imageUrl}
            />
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <input
            type="file"
            hidden={true}
            id="thumbnail"
            name="thumbnail"
            onChange={handleSubmit(onSubmit)}
            ref={register}
          />
          <Button color="primary" fullWidth variant="text">
            <label
              htmlFor={"thumbnail"}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Upload Thumbnail Shop
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
