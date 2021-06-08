import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { UserApi } from "apis/UserApi";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [id, setId] = useState(-1);
  const [text, setText] = useState("");
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id, value, email) => {
    setId(id);
    if (parseInt(value) === 0) {
      setText(`${email} tài khoản bị khóa`);
    } else {
      setText(`${email} tài khoản được mở khóa`);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleClick = async () => {
    const isResult = UserApi.ToggleActive(id);
    if (isResult) {
      handleClose();
    }
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClick} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Họ tên</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ngày đăng ký</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .slice(page * limit, page * limit + limit)
                .map((customer) => (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar
                          className={classes.avatar}
                          src={customer.imageUrl}
                        >
                          {customer.fullName}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {customer.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.userName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {moment(customer.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      <NativeSelect
                        id="select"
                        defaultValue={customer.active ? 1 : 0}
                        onChange={(e) =>
                          handleClickOpen(
                            customer.id,
                            e.target.value,
                            customer.email
                          )
                        }
                      >
                        <option value={0}>Khóa</option>
                        <option value={1}>Mở khóa</option>
                      </NativeSelect>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
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
  customers: PropTypes.array.isRequired,
};

export default Results;
