// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { FoodApi } from "apis/FoodApi.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import classNames from "classnames";
import Page from "components/page";
import React from "react";
import { useLocation } from "react-router";
import ProductSection from ".//ProductSection.js";
const useStyles = makeStyles(styles);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LandingPage() {
  const [foods, setFoods] = React.useState([]);
  const Params = useQuery();
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
    const getFood = async () => {
      const foods = await FoodApi.FindFoodByCustomer(Params.get("name"));
      if (foods) {
        setFoods(foods);
      }
    };
    getFood();
  }, [Params.get("name")]);
  const classes = useStyles();
  return (
    <Page title="Tìm kiếm" className={classes.root}>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        id={"productHome"}
      >
        <div className={classes.container}>
          <ProductSection title={"Kết quả tìm kiếm"} foods={foods} />
        </div>
      </div>
    </Page>
  );
}
