/* eslint-disable valid-typeof */
/* eslint-disable react/prop-types */
import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel(props) {
  const { images } = props;
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                {Array.isArray(images)
                  ? images.map((image, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={image}
                            alt="First slide"
                            className={classes.img}
                          />
                        </div>
                      );
                    })
                  : ""}
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
