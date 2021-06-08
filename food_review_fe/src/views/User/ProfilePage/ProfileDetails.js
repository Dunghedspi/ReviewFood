import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "components/input";
import * as yup from "yup";
import { EditInfo } from "actions/UserAction";
// import { UserApi } from "apis/UserApi";

const useStyles = makeStyles(() => ({
  root: {},
}));

const schemaValid2 = yup.object().shape({
  fullName: yup.string().required(),
  userName: yup.string().required(),
  password: yup
    .string()
    .matches(/^(?=.*[a-zA-Z1-9]).{8,}$/, "Password more than 8 characters"),
  newPassword: yup
    .string()
    .matches(/^(?=.*[a-zA-Z1-9]).{8,}$/, "Password more than 8 characters"),
  re_password: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.UserReducers);
  const [show, setShow] = React.useState(false);

  const methods = useForm({
    validationSchema: schemaValid2,
    mode: "onBlur",
  });
  const dispatch = useDispatch();
  const { handleSubmit, register, control, errors } = methods;
  const onSubmit = (data) => {
    dispatch(EditInfo(data));
  };
  const handleChange = () => {
    setShow(!show);
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                required
                value={user.email}
                variant="outlined"
                disabled
                inputRef={register}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormInput
                fullWidth
                label="Full Name"
                name="fullName"
                required
                variant="outlined"
                inputRef={register}
                defaultValue={user.fullName}
                errorobj={errors}
                control={control}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormInput
                fullWidth
                label="UserName"
                name="userName"
                required
                variant="outlined"
                inputRef={register}
                defaultValue={user.userName}
                errorobj={errors}
                control={control}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControlLabel
                control={<Checkbox name="checkbox" />}
                label="Thay đổi mật khẩu"
                onChange={handleChange}
              />
            </Grid>
            {show ? (
              <>
                <Grid item md={12} xs={12}>
                  <FormInput
                    fullWidth
                    label="Current Password"
                    name="password"
                    required
                    variant="outlined"
                    inputRef={register}
                    errorobj={errors}
                    control={control}
                    type="password"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormInput
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    required
                    variant="outlined"
                    inputRef={register}
                    errorobj={errors}
                    control={control}
                    type="password"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormInput
                    fullWidth
                    label="Confirme Password"
                    name="re_password"
                    required
                    variant="outlined"
                    inputRef={register}
                    errorobj={errors}
                    control={control}
                    type="password"
                  />
                </Grid>
              </>
            ) : (
              ""
            )}
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
