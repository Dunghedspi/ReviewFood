import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { convertDate } from "utils/date";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DetailsIcon from "@material-ui/icons/Details";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteFood } from "actions/FoodAction";

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
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = products.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(-1);
  const handleClickDelete = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteFood = () => {
    dispatch(DeleteFood(id));
    handleClose();
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Xác nhận xóa món ăn"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDeleteFood} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === products.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < products.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Food Name</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Registration date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
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
                  <TableCell>{customer.rating}</TableCell>
                  <TableCell>{customer.view}</TableCell>
                  <TableCell>{convertDate(customer.createdAt)}</TableCell>
                  <TableCell align="center">
                    <Tooltip aria-label="details" arrow title="Details">
                      <Link to={`details?id=${customer.id}`}>
                        <IconButton>
                          <DetailsIcon color="red" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip aria-label="details" arrow title="Delete">
                      <IconButton
                        onClick={() => handleClickDelete(customer.id)}
                      >
                        <DeleteOutlineIcon color="red" />
                      </IconButton>
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
