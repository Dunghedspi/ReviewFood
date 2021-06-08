import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import FormRegister from "./FormRegister";
import { ShopApi } from "apis/ShopApi";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const [active, setActive] = React.useState(0);

  const onSubmit = async (data) => {
    console.log(data);
    const isCreate = await ShopApi.CreateShop(data);
    if (isCreate) {
      setActive(true);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Đăng ký tạo tài khoản shop
          </Typography>
          <React.Fragment>
            {active ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Cảm ơn bạn đã chọn hợp tác với chúng tôi
                </Typography>
                <Typography variant="subtitle1">
                  Yêu cầu của bạn sẽ được xử lý, email xác nhận sẽ được gửi đến
                  địa chỉ email của bạn
                </Typography>
                <Link to="/food">Quay trở về trang chủ</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FormRegister onSubmit={onSubmit} />
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
