/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import { Button, Card, CardActions, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ShopApi } from "apis/ShopApi";
import { UserApi } from "apis/UserApi";
import { FoodApi } from "apis/FoodApi";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Page from "components/page";
import moment from "moment";
import React from "react";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdateShop } from "actions/ShopAction";
import { SetFood } from "actions/FoodAction";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function AddressForm() {
  // const { onSubmit } = props;
  // const classes = useStyles();
  const dispatch = useDispatch();
  const params = useQuery();
  const navigate = useNavigate();
  const [shop, setShop] = React.useState({});
  React.useEffect(() => {
    const getFoods = async () => {
      const shop = await ShopApi.GetShopInfo(params.get("id"));
      if (shop) {
        console.log(shop);
        setShop(shop);
      }
    };
    getFoods();
  }, []);
  const handleClickResole = async () => {
    const isActive = await UserApi.ActiveUser(shop.id);
    if (isActive) {
      setShop({ ...shop, active: true });
      dispatch(UpdateShop({ ...shop, active: true }));
    }
  };
  const handleClickActive = async () => {
    const isActive = await UserApi.UnActive(shop.id);
    if (isActive) {
      setShop({ ...shop, delete: false });
      dispatch(UpdateShop({ ...shop, delete: false }));
    }
  };
  const handleClickDeleteShop = async () => {
    const isDelete = await UserApi.DeleteUser(shop.id);
    if (isDelete) {
      setShop({ ...shop, delete: true });
      dispatch(UpdateShop({ ...shop, delete: true }));
    }
  };
  const handleClickUnDeleteShop = async () => {
    const isUnDelete = await UserApi.UnDeleteUser(shop.id);
    if (isUnDelete) {
      setShop({ ...shop, delete: false });
      dispatch(UpdateShop({ ...shop, delete: false }));
    }
  };
  const convertAddress = (address) => {
    return address
      ? `${address.street}, ${address.village}, ${address.district}, ${address.province}, ${address.country}`
      : "";
  };
  const Item = ({ keyName, value }) => {
    return (
      <Grid item sm={12} md={12}>
        <GridContainer>
          <GridItem md={3} sm={3}>
            <span>{keyName}</span>
          </GridItem>
          <GridItem md={9} sm={9}>
            <span>{value}</span>
          </GridItem>
        </GridContainer>
      </Grid>
    );
  };
  const RenderAction = (isActive, isDelete) => {
    if (!isActive && !isDelete) {
      return (
        <>
          <Button variant="outlined" onClick={handleClickResole}>
            {"Kích hoạt tài khoản"}
          </Button>
          <Button variant="outlined" onClick={handleClickDeleteShop}>
            {"Hủy yêu cầu"}
          </Button>
        </>
      );
    } else if (!isActive && isDelete) {
      return (
        <Button variant="outlined" onClick={handleClickActive}>
          {"Khôi phục yêu cầu"}
        </Button>
      );
    } else if (isActive && !isDelete) {
      return (
        <Button variant="outlined" onClick={handleClickDeleteShop}>
          {"Xóa Cửa hàng"}
        </Button>
      );
    } else {
      return (
        <Button variant="outlined" onClick={handleClickUnDeleteShop}>
          {"Khôi phục cửa hàng"}
        </Button>
      );
    }
  };
  const handleClick = async () => {
    const foods = await FoodApi.GetListFoodByShop(shop.id);
    await dispatch(SetFood(foods));
    navigate("/admin/foods");
  };
  return (
    <Page title="Register Shop">
      <Card>
        <CardHeader>
          <h4 style={{ marginTop: "20px" }}>Thông tin cửa hàng</h4>
        </CardHeader>
        <Divider />
        <CardBody>
          <Grid container spacing={3} justify="center">
            <Item keyName={"Tên chủ cửa hàng"} value={shop.fullName} />
            <Item
              keyName={"Tên cửa hàng"}
              value={shop.shopModel ? shop.shopModel.nameShop : ""}
            />
            <Item keyName={"Địa chỉ email"} value={shop.email} />
            <Item
              keyName={"Số điện thoại"}
              value={shop.shopModel ? shop.shopModel.phone : ""}
            />
            <Item
              keyName={"Mô tả cửa hàng"}
              value={shop.shopModel ? shop.shopModel.description : ""}
            />
            <Item
              keyName={"Ngày đăng ký"}
              value={moment(shop.createdAt).format("DD/MM/YYYY")}
            />
            <Item
              keyName={"Địa chỉ"}
              value={convertAddress(
                shop.shopModel ? shop.shopModel.addressModel : {}
              )}
            />
          </Grid>
        </CardBody>
        <Divider />
        <CardFooter>
          <CardActions>
            {RenderAction(shop.active, shop.delete)}
            <Button variant="outlined" onClick={handleClick}>
              Xem danh sách món ăn cửa hàng
            </Button>
          </CardActions>
        </CardFooter>
      </Card>
      <Link to="/admin/shop">{"<< Quay trở về quản lý shop"}</Link>
    </Page>
  );
}
