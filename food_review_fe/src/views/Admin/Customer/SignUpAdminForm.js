import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import Page from 'src/components/Page';
import * as yup from 'yup';
import defaultAvatar from 'src/assets/static/images/avatars/avatar_6.png';
import { UserApi } from 'src/apis/UserApi';
import FormInput from 'src/components/CustomControl/input';
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup
		.string()
		.matches(/^(?=.*[a-zA-Z1-9]).{8,}$/, "Password more than 8 characters"),
	phonenumber: yup
		.string()
		.matches(
			/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
			"Invalid phone number"
    ),
  fullName: yup.string().required(),
  re_password: yup
  .string()
  .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const onSubmit = async data => {
  try {
    const isSignUp = await UserApi.SignUp(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
const onError = (error, e) => console.log(error, e);
const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const methods = useForm({
    validationSchema: schema,
    mode: 'onBlur'
  });
  const { handleSubmit, errors, register, control } = methods;
  const [avatar, setAvatar] = React.useState(defaultAvatar);
  const handelChangeImage = e => {
    const readFile = new FileReader();
    readFile.onload = () => {
      if (readFile.readyState === 2) {
        setAvatar(readFile.result);
      }
    };
    readFile.readAsDataURL(e.target.files[0]);
  };
  return (
    <Page className={classes.root} title="Account">
      <form
        autoComplete="off"
        className={clsx(classes.root, className)}
        {...rest}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Card className={clsx(className)} {...rest}>
                <CardContent>
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Avatar className={classes.avatar} src={avatar} />
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <input
                    type="file"
                    hidden={true}
                    id="avatar"
                    name="avatar"
                    onChange={handelChangeImage}
                    ref={register}
                  />
                  <Button color="primary" fullWidth variant="text">
                    <label
                      htmlFor={'avatar'}
                      style={{ color: 'blue', cursor: 'pointer' }}
                    >
                      Upload Avatar
                    </label>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Card>
                <CardHeader
                  subheader="The information required"
                  title="Profile"
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <FormInput
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        required
                        variant="outlined"
                        inputRef={register}
                        control={control}
                        errorobj={errors}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormInput
                        fullWidth
                        label="Email"
                        name="email"
                        required
                        variant="outlined"
                        inputRef={register}
                        control={control}
                        errorobj={errors}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormInput
                        fullWidth
                        label="Birthday"
                        name="dateOfBirth"
                        required
                        type="date"
                        defaultValue="2016-12-29"
                        variant="outlined"
                        inputRef={register}
                        control={control}
                        errorobj={errors}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormInput
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        type="number"
                        variant="outlined"
                        inputRef={register}
                        control={control}
                        errorobj={errors}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormInput
                        fullWidth
                        label="Password"
                        name="password"
                        required
                        variant="outlined"
                        inputRef={register}
                        control={control}
                        errorobj={errors}
                        type="password"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormInput
                        fullWidth
                        label="Confirme Password"
                        name="re_password"
                        required
                        variant="outlined"
                        inputRef={register}
                        control={control}
                        errorobj={errors}
                        type="password"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Province"
                        name="province"
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="District"
                        name="district"
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        fullWidth
                        
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Gender
                        </InputLabel>
                        <Select
                          native
                          label="gender"
                          inputProps={{
                            name: 'sex',
                            id: 'outlined-age-native-simple',
                            ref:register
                          }}
                        >
                          <option value={1}>Male</option>
                          <option value={2}>Female</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        disabled
                        fullWidth
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Role
                        </InputLabel>
                        <Select
                          native
                          label="Role"
                          inputProps={{
                            name: 'role',
                            id: 'outlined-age-native-simple'
                          }}
                        >
                          <option value={1}>Admin</option>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <Button color="primary" variant="contained" type="submit">
                    Create Admin
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </form>
    </Page>
  );
};

export default ProfileDetails;
