/* eslint-disable react/prop-types */

import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  makeStyles,
  SvgIcon,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Search as SearchIcon } from "react-feather";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const handedClick = (navigator) => {
  navigator("new-food");
};

const Toolbar = ({ className, handleFilter, ...rest }) => {
  const classes = useStyles();
  const navigator = useNavigate();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          onClick={() => handedClick(navigator)}
        >
          Add New Food
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Food"
                variant="outlined"
                onChange={(event) => handleFilter(event.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
