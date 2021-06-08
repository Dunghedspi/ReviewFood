import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "components/page";
import Results from "./Results";
import Toolbar from "./Toolbar";
import { GetListUser } from "actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CustomerListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(GetListUser());
  }, [dispatch]);
  const { users } = useSelector((state) => state.AdminReducers);
  const [search, setSearch] = React.useState("");
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar setSearch={setSearch} />
        <Box mt={3}>
          <Results
            customers={users.filter(
              (item) =>
                item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
