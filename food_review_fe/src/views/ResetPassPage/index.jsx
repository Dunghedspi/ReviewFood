import { Avatar, Button, Container, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "components/input";
import { useStyles } from "./styles";
import * as yup from "yup";
import Page from "components/page";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
const schema = yup.object().shape({
  email: yup.string().email(),
});

function ResetPassPage() {
  const { handleSubmit, errors, register, control } = useForm({
    validationSchema: schema,
    mode: "onBlur",
  });
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (error, e) => console.log(error, e);
  const classes = useStyles();
  return (
    <Page title={"reset password"}>
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Card>
            <CardBody>
              <div className={classes.title}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Reset Password
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  inputRef={register}
                  errorobj={errors}
                  control={control}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Reset Password
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </Container>
    </Page>
  );
}

export default ResetPassPage;
