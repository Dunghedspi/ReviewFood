import {
  Avatar,
  Box,
  Card,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DetailsIcon from "@material-ui/icons/Details";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { convertDate } from "utils/date";

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

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên món ăn</TableCell>
                <TableCell>Địa chỉ email cửa hàng</TableCell>
                <TableCell>Đánh giá</TableCell>
                <TableCell>Lượt xem</TableCell>
                <TableCell>Ngày đăng ký</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * limit, page * limit + limit)
                .map((customer) => (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar
                          className={classes.avatar}
                          src={customer.thumbnail}
                          variant="square"
                        />
                        <Typography color="textPrimary" variant="body1">
                          {customer.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.emailShop}</TableCell>
                    <TableCell>{customer.rating}</TableCell>
                    <TableCell>{customer.view}</TableCell>
                    <TableCell>{convertDate(customer.createdAt)}</TableCell>
                    <TableCell>
                      {customer.delete ? "Đã xóa" : "Kinh doanh"}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip aria-label="details" arrow title="Details">
                        <Link to={`details?id=${customer.id}`}>
                          <IconButton>
                            <DetailsIcon color="red" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={products.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired,
};

export default Results;
