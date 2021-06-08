/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useForm } from "react-hook-form";
// import FormCheckBox from "components/ControlCustom/checkbox";
import FormInput from "components/input";
import LinkControl from "components/Link";
import { useStyles } from "assets/jss/material-kit-react/views/LoginPage";
import * as yup from "yup";
import CardBody from "components/Card/CardBody.js";
import Page from "components/page";
import { UserApi } from "apis/UserApi";
import { ROLE } from "constants/role";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetInfo } from "actions/UserAction";
//Validate schema
const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required(),
});

const SignInPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleClose } = props;
  const onSubmit = async (data) => {
    const payload = await UserApi.SignIn(data);
    if (payload) {
      if (payload === ROLE.shop) {
        navigate("/shop");
      } else if (payload === ROLE.admin) {
        navigate("/shop");
      } else if (payload === ROLE.user) {
        const getUser = async () => {
          const response = await UserApi.getUserInfo();
          if (response) {
            dispatch(SetInfo(response));
          }
        };
        getUser();
        handleClose();
      }
    }
  };
  const onError = (error) => console.log(error);
  const classes = useStyles();
  const methods = useForm({
    validationSchema: schema,
    mode: "onBlur",
  });
  const { handleSubmit, errors, register, control } = methods;
  return (
    <Page title="Sign In">
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <CardBody>
            <div className={classes.title}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <form
              className={classes.form}
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <FormInput
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="email"
                label="Email"
                name="email"
                autoFocus
                errorobj={errors}
                inputRef={register}
                control={control}
                type="Email"
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
                autoComplete="current-password"
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <LinkControl
                    path={"/auth/reset-password"}
                    label={"Forgot password?"}
                  />
                </Grid>
                <Grid item>
                  <LinkControl
                    path={"/auth/signup"}
                    label={"Don't have an account? Sign Up"}
                  />
                </Grid>
              </Grid>
            </form>
          </CardBody>
        </div>
      </Container>
    </Page>
  );
};
export default SignInPage;
