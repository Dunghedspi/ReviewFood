import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Page from "components/page";
import FormInput from "components/input";
import LinkControl from "components/Link";
import { useStyles } from "assets/jss/material-kit-react/views/SignUpPage";
import { useNavigate } from "react-router-dom";
import { UserApi } from "apis/UserApi";

const schema = yup.object().shape({
  userName: yup
    .string()
    .matches(/^(?=.*[a-zA-Z1-9]).{8,}$/, "Invalid username"),
  email: yup.string().required().email(),
  password: yup
    .string()
    .matches(/^(?=.*[a-zA-Z1-9]).{8,}$/, "Password more than 8 characters"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpPage = () => {
  const classes = useStyles();
  const navigation = useNavigate();
  const { register, control, handleSubmit, errors } = useForm({
    validationSchema: schema,
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    const isCheck = UserApi.SignUp(data);
    if (isCheck) {
      navigation("/auth/signin");
    }
  };
  const onError = (error) => console.log(error);
  return (
    <Page title="Sign Up">
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Card>
            <CardBody>
              <div className={classes.title}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
              </div>
              <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <FormInput
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="userName"
                  autoComplete="username"
                  autoFocus
                  errorobj={errors}
                  inputRef={register}
                  control={control}
                />
                <FormInput
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  errorobj={errors}
                  inputRef={register}
                  control={control}
                />
                <FormInput
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  errorobj={errors}
                  inputRef={register}
                  control={control}
                />
                <FormInput
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="re_password"
                  label="Confirm password"
                  type="password"
                  id="re-password"
                  errorobj={errors}
                  inputRef={register}
                  control={control}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item md={6}>
                    <LinkControl
                      path={"/auth/signin"}
                      label={"Do have an account? Sign In"}
                    />
                  </Grid>
                </Grid>
              </form>
            </CardBody>
          </Card>
        </div>
      </Container>
    </Page>
  );
};
export default SignUpPage;
