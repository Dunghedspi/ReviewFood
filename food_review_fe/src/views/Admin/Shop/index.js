/* eslint-disable react/prop-types */
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Page from "components/page";
import ShopDetails from "./ShopDetails/index";
import Toolbar from "./ShopListView/Toolbar";
import { SetShopList } from "actions/ShopAction";
import ProductCard from "./ShopListView/ProductCard";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));

const RenderProductsList = (props) => {
  const { classes, products } = props;
  const [search, setSearch] = React.useState("");

  return (
    <>
      <Toolbar setSearch={setSearch} />
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <ProductCard
              className={classes.productCard}
              products={products.filter(
                (item) =>
                  item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const RenderFoodDetails = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <ShopDetails />
        </Grid>
      </Grid>
    </Box>
  );
};

const ProductList = () => {
  const classes = useStyles();
  const { shops } = useSelector((state) => state.ShopReducers);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getFood = async () => {
      dispatch(SetShopList());
    };
    getFood();
  }, []);
  return (
    <Page className={classes.root} title="Foods">
      <Container maxWidth={false}>
        <Routes>
          <Route
            path="/"
            element={<RenderProductsList classes={classes} products={shops} />}
          />
          <Route path="/details/*" element={<RenderFoodDetails />} />
        </Routes>
      </Container>
    </Page>
  );
};

export default ProductList;
