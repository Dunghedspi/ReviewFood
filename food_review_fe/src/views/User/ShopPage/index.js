// @material-ui/core components
import { Avatar, Box, Card, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Page from "components/page";
import React from "react";
// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import { useLocation } from "react-router-dom";
import { FoodApi } from "apis/FoodApi";
import { ShopApi } from "apis/ShopApi";
import avatar from "assets/img/landing.jpg";
import { convertDate } from "utils/date";
import CardBody from "components/Card/CardBody.js";

const useStyles = makeStyles(styles);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function LandingPage() {
  const classes = useStyles();
  const params = useQuery();
  const [foods, setFoods] = React.useState([]);
  const [shop, setShop] = React.useState({});
  React.useEffect(() => {
    const getFoods = async () => {
      const foods = await FoodApi.GetListFoodByShop(params.get("id"));
      console.log(foods);
      if (foods) {
        setFoods(foods);
      }
    };
    getFoods();
  }, []);
  React.useEffect(() => {
    const getFoods = async () => {
      const shop = await ShopApi.GetShopInfo(params.get("id"));
      if (shop) {
        setShop(shop.shopModel);
      }
    };
    getFoods();
  }, []);
  const convertAddress = (address) => {
    return address
      ? `${address.street}, ${address.village}, ${address.district}, ${address.province}, ${address.country}`
      : "";
  };
  return (
    <Page title={`${shop.nameShop}`} className={classes.root}>
      <Container maxWidth="lg">
        <GridContainer container spacing={3}>
          <GridItem md={12} sm={12}>
            <Card>
              <GridContainer container spacing={3} className={classes.profile}>
                <GridItem md={12} sm={12}>
                  <GridContainer>
                    <GridItem sm={2} md={2}>
                      <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="column"
                      >
                        <Avatar src={avatar} className={classes.avatar} />
                      </Box>
                    </GridItem>
                    <GridItem sm={10} md={10}>
                      <Box
                        justifyContent="center"
                        display="flex"
                        flexDirection="column"
                      >
                        <GridContainer>
                          <GridItem md={12} sm={12}>
                            <GridContainer>
                              <GridItem md={2} sm={2}>
                                Tên Shop
                              </GridItem>
                              <GridItem md={3} sm={3}>
                                {shop.nameShop}
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                          <GridItem md={12} sm={12}>
                            <GridContainer>
                              <GridItem md={2} sm={2}>
                                Thành viên từ năm
                              </GridItem>
                              <GridItem md={3} sm={3}>
                                {convertDate(shop.createdAt)}
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                          <GridItem md={12} sm={12}>
                            <GridContainer>
                              <GridItem md={2} sm={2}>
                                Sản phẩm
                              </GridItem>
                              <GridItem md={3} sm={3}>
                                {foods.length}
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                          <GridItem md={12} sm={12}>
                            <GridContainer>
                              <GridItem md={2} sm={2}>
                                Mô tả
                              </GridItem>
                              <GridItem md={10} sm={10}>
                                {shop.description}
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                          <GridItem md={12} sm={12}>
                            <GridContainer>
                              <GridItem md={2} sm={2}>
                                Địa chỉ
                              </GridItem>
                              <GridItem md={10} sm={10}>
                                {convertAddress(shop.addressModel)}
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                        </GridContainer>
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem md={12} sm={12}></GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          <GridItem md={12} sm={12}>
            <Card>
              <CardBody>
                <ProductSection title={"Food"} foods={foods} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </Container>
    </Page>
  );
}
