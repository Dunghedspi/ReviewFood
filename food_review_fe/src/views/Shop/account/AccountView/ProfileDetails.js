/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ShopApi } from "apis/ShopApi";
import { EditShop } from "actions/UserAction";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";
import * as toast from "utils/toastify";
import { toastifyError } from "utils/toastify";

const useStyles = makeStyles(() => ({
  root: {},
  textarea: {
    margin: "14px 0px 0px 14px",
    padding: "6px",
    resize: "none",
    border: "2px solid #c0c0c0",
    borderRadius: "4px",
    transition: ".4s",
    outline: "none",
    "&:hover": {
      border: "2px solid #a0a0a0",
    },
    "&:focus": {
      border: "2px solid #6600ff",
    },
  },
}));

const ProfileDetails = (props) => {
  const classes = useStyles();
  const { user } = props;
  const { shopModel } = user;
  const { addressModel } = shopModel || {};
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const response = await ShopApi.EditShop(data);
    if (response) {
      toast.toastifySuccess("Cập nhập thông tin thành công");
      dispatch(EditShop(response));
    } else {
      toast.toastifyError("Cập nhập thông tin không thành công");
    }
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Shop Name"
                name="name"
                required
                value={shopModel.nameShop}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="text"
                variant="outlined"
                inputRef={register}
                value={shopModel.phone}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={user.email}
                required
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                required
                value={addressModel.country || ""}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="province"
                required
                defaultValue={addressModel.province || ""}
                variant="outlined"
                inputRef={register}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="District"
                name="district"
                required
                defaultValue={addressModel.district || ""}
                variant="outlined"
                inputRef={register}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Village"
                name="village"
                required
                defaultValue={addressModel.village || ""}
                variant="outlined"
                inputRef={register}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Street"
                name="street"
                required
                defaultValue={addressModel.street || ""}
                variant="outlined"
                inputRef={register}
              />
            </Grid>
            <Grid md={12} sm={12}>
              <textarea
                cols="80"
                rows="6"
                ref={register}
                name="description"
                className={classes.textarea}
                placeholder="Description"
              >
                {shopModel.description}
              </textarea>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
