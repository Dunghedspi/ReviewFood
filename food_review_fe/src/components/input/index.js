/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import TextField from "@material-ui/core/TextField";
import React from "react";
import { Controller } from "react-hook-form";
// import "./index.css";

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((props, ref) => {
  const { name, label, required, errorobj, control } = props;
  let isError = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }
  return (
    <Controller
      as={TextField}
      name={name}
      control={control}
      defaultValue={""}
      label={label}
      fullWidth={true}
      InputLabelProps={{
        className: required ? "required-label" : "",
        required: required || false,
      }}
      error={isError}
      helperText={errorMessage}
      {...props}
      ref={ref}
    />
  );
});

export default Input;
