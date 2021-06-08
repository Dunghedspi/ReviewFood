/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import FormInput from "components/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .matches(/^(?=.*[a-zA-Z1-9]).{8,}$/, "Password more than 8 characters"),
  newPassword: yup
    .string()
    .matches(/^(?=.*[a-zA-Z1-9]).{8,}$/, "Password more than 8 characters"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
const Password = (props) => {
  const { onSubmit } = props;
  const methods = useForm({
    validationSchema: schema,
    mode: "onBlur",
  });
  const { handleSubmit, control, register, errors } = methods;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <FormInput
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
            inputRef={register}
            control={control}
            errorobj={errors}
          />
          <FormInput
            fullWidth
            label="New Password"
            margin="normal"
            name="newPassword"
            type="password"
            variant="outlined"
            inputRef={register}
            control={control}
            errorobj={errors}
          />
          <FormInput
            fullWidth
            label="Confirm password"
            margin="normal"
            name="rePassword"
            type="password"
            variant="outlined"
            inputRef={register}
            control={control}
            errorobj={errors}
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
