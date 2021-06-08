/* eslint-disable react/prop-types */
// @material-ui/core components
import { Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React from "react";
import ProductCard from "./ProductCard";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStylesCard = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(3),
  },
  more: {
    marginTop: theme.spacing(3),
  },
}));

const useStyles = makeStyles(styles);

export default function ProductSection(props) {
  const foods = props.foods;
  const classes = useStyles();
  const classesCard = useStylesCard();
  const { title } = props;
  const renderProductCard = (products) => {
    return products.map((product, index) => {
      return (
        <GridItem
          xs={12}
          md={4}
          sm={6}
          key={index}
          className={classesCard.item}
        >
          <ProductCard food={product} />
        </GridItem>
      );
    });
  };
  return (
    <div className={classes.section}>
      <div id={"trending"}>
        <h2 className={classes.title}>{title}</h2>
        <GridContainer justify="center">
          {renderProductCard(foods)}
        </GridContainer>
        <div className={classes.more}>
          <Button
            className={classes.btn}
            endIcon={<ExpandMoreIcon />}
            // onClick={handelOnClick}
          >
            Xem thêm
          </Button>
          <Divider />
        </div>
      </div>
    </div>
  );
}
