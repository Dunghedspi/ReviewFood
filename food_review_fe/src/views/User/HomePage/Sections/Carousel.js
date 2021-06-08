/* eslint-disable react/prop-types */
import React from "react";
import bg1 from "assets/img/foods/bg2.png";
import bg2 from "assets/img/foods/bg1.jpg";
import bg3 from "assets/img/foods/bg5.jpg";

import { Paper } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
const items = [{ url: bg1 }, { url: bg2 }, { url: bg3 }];
function Item(props) {
  return (
    <Paper>
      <img src={props.url} />
    </Paper>
  );
}
const CarouselCustom = () => {
  return (
    <Carousel autoPlay={true} interval={4000} animation={"slide"}>
      {items.map((item, index) => {
        return <Item url={item.url} key={index} />;
      })}
    </Carousel>
  );
};
export default CarouselCustom;
