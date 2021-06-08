/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Popper, Tooltip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import VisibilityIcon from "@material-ui/icons/Visibility";
import food from "assets/img/faces/food.jpg";
import StarIcon from "@material-ui/icons/Star";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
  },
  rating: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  btnShare: {
    border: "none",
    borderRadius: "25%",
    background: "none",
  },
}));

export default function RecipeReviewCard(props) {
  const { food } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link to={`/food/shop?id=${food.shopId}`}>
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={food.thumbnail}
            />
          </Link>
        }
        title={food.name}
        subheader={`Cửa hàng: ${food.nameShop}`}
      />
      <Link to={`/food/details?id=${food.id}`}>
        <CardMedia
          className={classes.media}
          image={food.thumbnail}
          title={food.name}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {food.shortDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Ratting" arrow>
          <div className={classes.rating}>
            <StarIcon />
            <span style={{ marginLeft: "3px" }}>{food.rating}</span>
          </div>
        </Tooltip>
        <Tooltip title="Lượt xem" arrow>
          <div className={classes.expand}>
            <VisibilityIcon />
            <span style={{ marginLeft: "3px" }}>{food.view}</span>
          </div>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
