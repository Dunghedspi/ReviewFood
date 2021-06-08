/* eslint-disable react/prop-types */

import {
  Box,
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

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ className, handleSearch, ...rest }) => {
  const classes = useStyles();
  const typingSearchKey = React.useRef(null);
  const [search, setSearch] = React.useState("");
  const handleOnChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (typingSearchKey.current != null) {
      clearTimeout(typingSearchKey.current);
    }
    typingSearchKey.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
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
                value={search}
                onChange={handleOnChange}
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
