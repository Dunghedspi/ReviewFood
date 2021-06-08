/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "600px",
  },
}));

const convertStatus = (isActive, isDelete) => {
  if (isActive && isDelete) {
    return "Đã xóa";
  } else if (!isActive && !isDelete) {
    return "Chờ xác nhận";
  } else if (isActive && !isDelete) {
    return "Hoạt Động";
  } else {
    return "Hủy yêu cầu";
  }
};
const Results = ({ className, products, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const emptyRows = limit - Math.min(limit, products.length - page * limit);
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableCell>Tên chủ shop</TableCell>
              <TableCell>Tên cửa hàng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngày đăng ký</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Chi tiết</TableCell>
            </TableHead>
            <TableBody>
              {products
                .slice(page * limit, page * limit + limit)
                .map((shop) => (
                  <TableRow hover key={shop.id}>
                    <TableCell>{shop.fullName}</TableCell>
                    <TableCell>{shop.shopModel.nameShop}</TableCell>
                    <TableCell>{shop.email}</TableCell>
                    <TableCell>{shop.shopModel.phone}</TableCell>
                    <TableCell>
                      {moment(shop.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {convertStatus(shop.active, shop.delete)}
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/shop/details?id=${shop.shopModel.id}`}>
                        Chi tiết
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={limit}
        page={page}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired,
};

export default Results;
