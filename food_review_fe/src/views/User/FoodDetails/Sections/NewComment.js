/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @material-ui/core components
import { Avatar, Button, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useStyles = makeStyles(() => ({
  reset: {
    margin: 0,
  },
  btnGroup: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-end",
  },
  center: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
  },
  root: {
    padding: "20px 10px",
  },
}));
const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);
const schemaValid = yup.object().shape({
  rate: yup.number().min(1),
  content: yup.string().required(),
});
export default function NewComment(props) {
  const { handleClose, handleCreateComment, foodDetails } = props;
  const classes = useStyles();
  const methods = useForm({
    validationSchema: schemaValid,
    mode: "onBlur",
  });
  const [rate, setRate] = React.useState(0);
  const user = useSelector((state) => state.UserReducers);
  const onSubmit = (data) => {
    handleCreateComment(data);
    handleClose();
  };
  const { handleSubmit, register, errors, control } = methods;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridContainer className={classes.root}>
        <GridItem xs={12} md={12} className={classes.center}>
          <h4 className={classes.reset}>
            Nhận xét món ăn <strong>{foodDetails.name}</strong>
          </h4>
        </GridItem>
        <GridItem xs={12} md={12}>
          <GridContainer>
            <GridItem xs={1} md={1}>
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={user.imageUrl}
              />
            </GridItem>
            <GridItem xs={10} md={10}>
              <GridContainer>
                <GridItem xs={12} md={12}>
                  <h3 className={classes.reset}>{user.userName}</h3>
                </GridItem>
                <GridItem md={12}>
                  <StyledRating
                    name="rate"
                    defaultValue={0}
                    precision={1}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  <input
                    style={{ display: "none" }}
                    value={rate}
                    onChange={() => {}}
                    ref={register}
                    name="rate"
                  />
                </GridItem>
                <GridItem xs={12} md={12}>
                  {errors.rate ? errors.rate.message : ""}
                </GridItem>
                <GridItem xs={12} md={12}>
                  <CustomInput
                    id="regular"
                    inputProps={{
                      placeholder: "Nhận xét",
                      inputRef: register,
                      control: control,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    name="content"
                  />
                </GridItem>
                <GridItem xs={12} md={12}>
                  <p style={{ color: "red" }}>
                    {errors.content ? errors.content.message : ""}
                  </p>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} md={12} className={classes.btnGroup}>
          <Button
            variant="outlined"
            style={{ marginRight: "5px" }}
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#1873E8" }}
            type="submit"
            // onClick={handleClose}
          >
            Đăng
          </Button>
        </GridItem>
      </GridContainer>
    </form>
  );
}
