/* eslint-disable react/prop-types */
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Page from "components/page";
import ProductCard from "./FoodListView/ProductCard";
import ProductDetail from "./FoodDetails/index";
import Toolbar from "./FoodListView/Toolbar";
import NewFood from "./NewFood/index";
import EditFood from "./EditFood/index";
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
  const { classes, products, handleFilter } = props;
  return (
    <>
      <Toolbar handleFilter={handleFilter} />
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
const RenderNewFood = () => {
  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <NewFood />
        </Grid>
      </Grid>
    </Box>
  );
};
const RenderEditFood = () => {
  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <EditFood />
        </Grid>
      </Grid>
    </Box>
  );
};

const ProductList = () => {
  const classes = useStyles();
  const { foods } = useSelector((state) => state.FoodReducers);
  const [foodsList, setFoodList] = React.useState("");
  const handleFilter = (search) => {
    const newFoods = foods.filter((item) => {
      return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    setFoodList(newFoods);
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getFood = async () => {
      const foods = await FoodApi.GetListFood();
      dispatch(SetFood(foods));
    };
    getFood();
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
                handleFilter={handleFilter}
              />
            }
          />
          <Route path="/details/*" element={<RenderFoodDetails />} />
          <Route path="/new-food" element={<RenderNewFood />} />
          <Route path="/edit-food/*" element={<RenderEditFood />} />
        </Routes>
      </Container>
    </Page>
  );
};

export default ProductList;
