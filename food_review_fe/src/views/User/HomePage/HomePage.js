// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import classNames from "classnames";
import Page from "components/page";
import React from "react";
// Sections for this page
import Carousel from "./Sections/Carousel";
import ProductSection from "./Sections/ProductSection.js";
import { GetFoodTrending } from "actions/FoodAction";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles(styles);

export default function LandingPage() {
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.FoodReducers);
  React.useEffect(() => {
    const handleChangeSize = () => {
      let element = document.getElementById("productHome");
      if (window.matchMedia("(max-width: 650px)").matches) {
        if (element) element.classList.remove(classes.mainRaised);
      } else {
        if (element) element.classList.add(classes.mainRaised);
      }
    };
    window.addEventListener("resize", handleChangeSize);
  }, []);
  React.useEffect(() => {
    if (foods.length <= 0) {
      dispatch(GetFoodTrending());
    }
  }, []);
  const classes = useStyles();
  return (
    <Page title="Home Page" className={classes.root}>
      <Carousel />
      <div
        className={classNames(classes.main, classes.mainRaised)}
        id={"productHome"}
      >
        <div className={classes.container}>
          <ProductSection title={"Food Trending"} foods={foods} />
        </div>
      </div>
    </Page>
  );
}
