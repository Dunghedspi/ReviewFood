import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "components/page";
import Password from "./Password";
import { UserApi } from "apis/UserApi";
import * as toast from "utils/toastify";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const onSubmit = async (data) => {
  const response = await UserApi.EditPassword(data);
  if (response) {
    toast.toastifySuccess("Cập nhập thông tin thành công");
  } else {
    toast.toastifyError("Cập nhập thông tin không thành công");
  }
};
const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Box mt={3}>
          <Password onSubmit={onSubmit} />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
