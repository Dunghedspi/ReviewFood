/* eslint-disable react/prop-types */
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Page from "components/page";
import ProductCard from "./FoodListView/ProductCard";
import ProductDetail from "./FoodDetails/index";
import Toolbar from "./FoodListView/Toolbar";
import { FoodApi } from "apis/FoodApi";
import { SetFood } from "actions/FoodAction";
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
  const { classes, products, handleSearch } = props;
  return (
    <>
      <Toolbar handleSearch={handleSearch} />
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <ProductCard className={classes.productCard} products={products} />
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
          <ProductDetail />
        </Grid>
      </Grid>
    </Box>
  );
};

const ProductList = () => {
  const classes = useStyles();
  const { foods } = useSelector((state) => state.FoodReducers);
  const [foodsList, setFoodList] = React.useState("");
  const handleSearch = async (search) => {
    const foods = await FoodApi.FindFoodByAdmin(search);
    if (foods) {
      setFoodList(foods);
    }
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getFood = async () => {
      const foods = await FoodApi.GetFoodTrending();
      dispatch(SetFood(foods));
    };
    if (foods.length <= 0) {
      getFood();
    }
  }, []);
  return (
    <Page className={classes.root} title="Foods">
      <Container maxWidth={false}>
        <Routes>
          <Route
            path="/"
            element={
              <RenderProductsList
                classes={classes}
                products={foodsList ? foodsList : foods}
                handleSearch={handleSearch}
              />
            }
          />
          <Route path="/details/*" element={<RenderFoodDetails />} />
        </Routes>
      </Container>
    </Page>
  );
};

export default ProductList;
