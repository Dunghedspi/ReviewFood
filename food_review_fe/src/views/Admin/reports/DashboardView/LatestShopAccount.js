/* eslint-disable react/prop-types */
import React from "react";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: "flex-end",
  },
}));

const LatestOrders = ({ className, shops, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Yêu cầu tạo tài khoản shop" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên chủ shop</TableCell>
                <TableCell>Tên cửa hàng</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Ngày đăng ký</TableCell>
                <TableCell>Chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shops.map((shop, index) => (
                <TableRow hover key={shop.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{shop.fullName}</TableCell>
                  <TableCell>{shop.shopModel.nameShop}</TableCell>
                  <TableCell>{shop.email}</TableCell>
                  <TableCell>{shop.shopModel.phone}</TableCell>
                  <TableCell>
                    {moment(shop.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <Link to={`shop/details?id=${shop.shopModel.id}`}>
                      Chi tiết
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Link color="primary" size="small" variant="text" to="/admin/shop">
          {"View all >>"}
        </Link>
      </Box>
    </Card>
  );
};

export default LatestOrders;
