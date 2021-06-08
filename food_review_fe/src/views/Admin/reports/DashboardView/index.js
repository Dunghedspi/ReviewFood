import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "components/page";
import Budget from "./TotalFood";
import TotalCustomer from "./TotalCustomer";
import TotalShop from "./TotalShop";
import LatestShopAccount from "./LatestShopAccount";
import { UserApi } from "apis/UserApi";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [shops, setShops] = React.useState([]);
  const [totalCustomer, setTotalCustomer] = React.useState(0);
  const [totalShop, setTotalShop] = React.useState(0);
  const [totalFood, setTotalFood] = React.useState(0);
  React.useEffect(() => {
    const getRequestCreateShop = async () => {
      const response = await UserApi.getRequestCreateShop();
      setShops(response);
    };
    const GetTotalCustomer = async () => {
      const response = await UserApi.GetTotalCustomer();
      setTotalCustomer(response);
    };
    const GetTotalShop = async () => {
      const response = await UserApi.GetTotalShop();
      setTotalShop(response);
    };
    const GetTotalFood = async () => {
      const response = await UserApi.GetTotalFood();
      setTotalFood(response);
    };
    getRequestCreateShop();
    GetTotalCustomer();
    GetTotalShop();
    GetTotalFood();
  }, []);
  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <Budget totalFood={totalFood} />
          </Grid>
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalCustomer totalCustomer={totalCustomer} />
          </Grid>
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalShop totalShop={totalShop} />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestShopAccount shops={shops} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
