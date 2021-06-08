/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import { Button, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Page from "components/page";
import React from "react";
import { useForm } from "react-hook-form";

const useStyles = makeStyles(() => ({
  header: {
    width: "100%",
    paddingLeft: "20px",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    backgroundColor: "#333333",
    "&>h3": {
      color: "#FFFFFF",
    },
    justifyContent: "space-between",
  },
  item: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    marginTop: "2%",
  },
  label: {
    "&>span": {
      color: "red",
    },
  },
  inputBox: {
    "&>input": {
      padding: "8px 12px",
      outline: "none",
      border: "#DDDDDD 1px solid",
    },
    "&>input:focus": {
      border: "black 1px solid",
    },
  },
  body: {
    display: "flex",
    flexFlow: "column nowrap",
    padding: "20px 20px 10px 10px",
    backgroundColor: "#EEEEEE",
  },
  formBox: {
    backgroundColor: "#FFFFFF",
    padding: "20px 10px",
    display: "flex",
    flexFlow: "column nowrap",
  },
  buttonBox: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#f45424",
    minWidth: "30%",
    "&:hover": {
      backgroundColor: "#f45424",
    },
    "&>*": {
      color: "#FFFFFF",
    },
    padding: "10px 20px",
  },
  editBtn: {
    padding: "5px 10px",
    backgroundColor: "#FFFFFF",
    marginRight: "20px",
    "&:hover": {
      backgroundColor: "#EEEEEE",
    },
  },
  description: {
    marginTop: "10px",
  },
}));

export default function AddressForm(props) {
  const { onSubmit } = props;
  const classes = useStyles();
  const InputCustomer = React.forwardRef((props, ref) => {
    const { label, name } = props;
    return (
      <div className={classes.item}>
        <div className={classes.label}>
          <label htmlFor={name}>{label}</label>
          <span>{"*"}</span>
        </div>
        <div className={classes.inputBox}>
          <input name={name} id={name} ref={ref} {...props} />
        </div>
      </div>
    );
  });
  const { register, handleSubmit } = useForm();
  return (
    <Page title="Register Shop">
      <Typography variant="h6" gutterBottom>
        Thông tin cửa hàng
      </Typography>
      <Grid container spacing={3} justify="center">
        <Grid item sm={12} md={12}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            // className={classes.formBox}
            id={"shipping"}
          >
            <InputCustomer
              name={"fullName"}
              ref={register}
              label={"Tên chủ cửa hàng"}
              type={"text"}
            />
            <InputCustomer
              name={"nameShop"}
              ref={register}
              label={"Tên cửa hàng"}
            />
            <InputCustomer
              name={"phone"}
              ref={register}
              label={"Số điện thoại chủ của hàng"}
            />
            <InputCustomer
              name={"email"}
              ref={register}
              label={"Địa chỉ email chủ của hàng"}
            />
            <InputCustomer
              name={"province"}
              ref={register}
              label={"Thành Phố"}
            />
            <InputCustomer
              name={"district"}
              ref={register}
              label={"Quận/Huyện"}
            />
            <InputCustomer name={"village"} ref={register} label={"Phường"} />
            <InputCustomer name={"street"} ref={register} label={"Đường"} />
            <InputCustomer
              name={"country"}
              ref={register}
              label={"Quốc gia"}
              value={"Viet Nam"}
              disabled
            />
            <textarea
              name="description"
              placeholder="Mô tả về của hàng của bạn"
              rows="4"
              cols="66"
              className={classes.description}
              ref={register}
            ></textarea>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                Xác nhận tạo tài khoản
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Page>
  );
}
