/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import food from "assets/img/faces/food.jpg";
import React from "react";
import Rating from "@material-ui/lab/Rating";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { Link } from "react-router-dom";
// Sections for this page

const useStyles = makeStyles();
const renderRelatedFood = (foods, foodId) => {
  const classes = makeStyles(() => ({
    img: {
      width: "100%",
      height: "auto",
    },
    item: {
      paddingRight: "30px",
      "&>div": {
        marginBottom: "7px",
        marginTop: "0px",
      },
    },
    imgBox: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "center",
      alignItems: "center",
    },
  }))();
  return foods.map((item, index) => {
    if (item.id !== foodId)
      return (
        <GridItem xs={12} sm={12} md={12} key={index} className={classes.item}>
          <Card>
            <CardBody>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={5} md={5} className={classes.imgBox}>
                    <Link to={`/food/details?id=${item.id}`}>
                      <img
                        alt="food"
                        src={item.thumbnail}
                        className={classes.img}
                      />
                    </Link>
                  </GridItem>
                  <GridItem xs={7} md={7}>
                    <GridContainer>
                      <GridItem xs={12} md={12}>
                        <h4>{item.name}</h4>
                      </GridItem>
                      <GridItem xs={12} md={12}>
                        <Rating
                          name="size-small"
                          defaultValue={item.rating}
                          size="small"
                          precision={0.1}
                          readOnly
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </CardBody>
          </Card>
        </GridItem>
      );
  });
};
export default function LandingPage(props) {
  const { foods, foodId } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer>{renderRelatedFood(foods, foodId)}</GridContainer>
    </div>
  );
}
