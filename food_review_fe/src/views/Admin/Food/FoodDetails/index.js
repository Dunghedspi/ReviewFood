/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DirectionsIcon from "@material-ui/icons/Directions";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Page from "components/page";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { FoodApi } from "apis/FoodApi";
import { useSelector } from "react-redux";
import { handleComment, checkLike } from "utils/comment";
import { useForm } from "react-hook-form";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import {
  Avatar,
  Button,
  CardActions,
  Divider,
  Popper,
  TextField,
  Tooltip,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import PersonIcon from "@material-ui/icons/Person";
import SectionsCarousel from "views/User/Components/Sections/SectionCarousel";
import classnames from "classnames";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Link, useLocation } from "react-router-dom";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { convertDate } from "utils/date";
import CardFooter from "components/Card/CardFooter";
import { useDispatch } from "react-redux";
import { UpdateFood } from "actions/FoodAction";
import io from "socket.io-client";
// import HelmetMetaData from "views/User/Components/ShareFacebook";
let socket;
const ENDPOINT = process.env.REACT_APP_SERVER_SOCKET;

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
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
    justifyContent: "flex-end",
  },
  foodImage: {
    width: "75%",
    height: "auto",
  },
  img: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
  },
  reset: {
    margin: 0,
  },
  description: {
    marginTop: "20px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  socialMediaPopper: {
    top: "300px! Important ",
    left: "unset! Important ",
    right: "0px!   Important ",
    display: "grid",
  },
  socialMediaButton: {
    "&: hover> svg": {
      height: "50px! important",
      width: "50px! important",
    },
  },
}));

const RenderList = (ratings) => {
  const classes = makeStyles(() => ({
    item: {
      display: "flex",
      flexFlow: "row nowrap",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "0 30px 0 20px",
    },
    rating: {
      minHeight: "10px",
    },
    root: {
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
    },
  }))();
  const rates = handleComment(ratings);
  const renderRate = (data) => {
    let rateView = [];
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        rateView.push(
          <GridItem lg={12} md={12} sm={12} key={key}>
            <GridContainer className={classes.item} justify="center">
              <span>{key}</span>
              <div
                className={classes.rating}
                style={{
                  minWidth: `${element.vote}%`,
                  marginLeft: "10px",
                  backgroundColor: `${element.color}`,
                }}
              ></div>
            </GridContainer>
          </GridItem>
        );
      }
    }
    return rateView;
  };
  return (
    <GridContainer justify="center" className={classes.root}>
      {renderRate(rates)}
    </GridContainer>
  );
};
const RenderListComment = ({ comments, user, methods, foodDetails }) => {
  const [childComments, setChildComments] = React.useState([]);
  const [commentSelect, setCommentsSelect] = React.useState({});
  const [commentReply, setCommentReply] = React.useState({});
  React.useEffect(() => {
    if (socket) {
      socket.on("typing", (data) => {
        console.log(111);
        const { commentId } = data;
        commentReply[`${commentId}`] = true;
        setCommentReply({ ...commentReply });
      });
      socket.on("endTyping", (data) => {
        const { commentId } = data;
        commentReply[`${commentId}`] = false;
        setCommentReply({ ...commentReply });
      });
      socket.on("comment", (data) => {
        if (
          data.foodId === foodDetails.id &&
          data.commentParentId === commentSelect.id
        ) {
          setChildComments((childComments) => [...childComments, data]);
          commentReply[`${commentSelect.id}`] = false;
          setCommentReply({ ...commentReply });
        }
      });
    }
  }, [commentSelect, socket]);
  const classes = makeStyles(() => ({
    item: {
      display: "flex",
      flexFlow: "row nowrap",
      alignItems: "center",
      justifyContent: "center",
    },
    rating: {
      minHeight: "10px",
      backgroundColor: "#203e6e",
    },
    root: {
      marginTop: "20px",
    },
    resetWidth: {
      width: "auto",
      marginTop: "-60px",
    },
    btn: {
      fontSize: "10px",
    },
  }))();
  const onSubmit = async (data) => {
    const formData = { ...data, commentParentId: commentSelect.id };
    const res = await FoodApi.CreateChildComment(formData);
    if (res) {
      setChildComments([...childComments, res]);
      socket.emit("comment", res);
    }
  };
  const { handleSubmit, register } = methods;
  const handleClick = async (item) => {
    const response = await FoodApi.GetChildComment(item.id);
    await setChildComments(response);
    await setCommentsSelect(item);
  };
  const sendEventTyping = (item) => {
    socket.emit("typing", { foodId: foodDetails.id, commentId: item.id });
  };
  const sendEndTyping = (item) => {
    socket.emit("endTyping", { foodId: foodDetails.id, commentId: item.id });
  };
  const renderListChildComment = (childComments, comment) => {
    return (
      <>
        {childComments.map((item, index) => {
          return (
            <GridItem xl={12} md={12} key={index}>
              <GridContainer className={classes.item} justify="center">
                <GridItem sm={1} md={1} lg={1}>
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={item.avatar}
                  />
                </GridItem>
                <GridItem lg={9} md={9} sm={10}>
                  <span style={{ fontWeight: 500 }}>{item.userName}</span>
                  <GridContainer>
                    <GridItem xl={8} md={8}>
                      <span>{convertDate(item.createdAt)}</span>
                    </GridItem>
                  </GridContainer>
                  <p>{item.content}</p>
                </GridItem>
              </GridContainer>
            </GridItem>
          );
        })}
        <GridItem md={12} sm={12}>
          <GridContainer>
            <GridItem sm={1} md={1} lg={1}>
              <Avatar
                aria-label="recipe"
                className={classes.avatar1}
                src={user.imageUrl}
              />
            </GridItem>
            <GridItem sm={9} md={9}>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <TextField
                  placeholder="Viết câu trả lời ..."
                  variant="outlined"
                  className={classes.textFile}
                  size="small"
                  name="reply"
                  fullWidth
                  inputRef={register}
                  onChange={() => sendEventTyping(comment)}
                  onBlur={() => sendEndTyping(comment)}
                />
              </form>
            </GridItem>
          </GridContainer>
        </GridItem>
      </>
    );
  };
  const RenderCommentChild = ({ item }) => {
    return (
      <GridItem xl={12} md={12} key={item.id}>
        <GridContainer className={classes.item}>
          <GridItem sm={1} md={1} lg={1} className={classes.resetWidth}>
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={item.avatar}
            />
          </GridItem>
          <GridItem lg={9} md={9} sm={10}>
            <span style={{ fontWeight: 500 }}>{item.userName}</span>
            <GridContainer>
              <GridItem lg={2} md={2} sm={12}>
                <Rating
                  name="size-small"
                  value={item.rate}
                  size="small"
                  precision={1}
                  readOnly
                />
              </GridItem>
              <GridItem xl={8} md={8}>
                <span>{convertDate(item.createdAt)}</span>
              </GridItem>
            </GridContainer>
            <p>{item.content}</p>
            {commentReply[item.id] ? (
              <GridItem sm={5} md={5}>
                {"Đang có người trả lời ..."}
              </GridItem>
            ) : (
              ""
            )}
            <GridItem sm={12} md={12} lg={12}>
              {item.id !== commentSelect.id ? (
                <Button
                  startIcon={<SubdirectoryArrowRightIcon />}
                  className={classes.btn}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  Xem câu trả lời
                </Button>
              ) : (
                ""
              )}
            </GridItem>
          </GridItem>
          <GridItem lg={2} md={1} sm={2} className={classes.item}>
            <IconButton disabled={true}>
              <ThumbUpIcon />
            </IconButton>
            <span>{item.countLike}</span>
          </GridItem>
        </GridContainer>
        <GridItem sm={12} md={12} lg={12}>
          {item.id === commentSelect.id
            ? renderListChildComment(childComments, item)
            : ""}
        </GridItem>
      </GridItem>
    );
  };
  return (
    <GridContainer className={classes.root}>
      {comments.map((item, index) => {
        const isCheck =
          checkLike(item.listLike, user.id) || user.id === item.userId;
        return <RenderCommentChild isCheck={isCheck} item={item} key={index} />;
      })}
    </GridContainer>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LandingPage() {
  const user = useSelector((state) => state.UserReducers);
  const [foodDetails, setFoodDetails] = React.useState({});
  const classes = useStyles();
  const [comments, setComments] = React.useState([]);
  const [typingVote, setTypingVote] = React.useState(false);
  const params = useQuery();
  const methods = useForm();

  React.useEffect(() => {
    const getFood = async () => {
      const food = await FoodApi.GetDetailsFood(params.get("id"));
      setFoodDetails(food);
    };
    getFood();
  }, [params.get("id")]);
  React.useEffect(() => {
    const getComments = async () => {
      const response = await FoodApi.GetListComment(params.get("id"));
      if (response) {
        setComments(response);
      }
    };
    getComments();
  }, [params.get("id")]);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const isDelete = await FoodApi.DeleteFoodByAdmin(foodDetails.id);
    if (isDelete) {
      setFoodDetails({ ...foodDetails, delete: true });
      dispatch(UpdateFood({ ...foodDetails, delete: true }));
    }
  };
  const handleUnDelete = async () => {
    const isUnDelete = await FoodApi.UnDeleteFood(foodDetails.id);
    if (isUnDelete) {
      setFoodDetails({ ...foodDetails, delete: false });
      dispatch(UpdateFood({ ...foodDetails, delete: false }));
    }
  };
  React.useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.emit("join", params.get("id"));
    socket.on("typingVote", () => {
      setTypingVote(true);
    });
    socket.on("addNewVote", (data) => {
      setComments((comments) => [...comments, data]);
      setTypingVote(false);
    });
    return () => {
      socket.off();
    };
  }, [ENDPOINT, params.get("id")]);
  return (
    <Page title="Product Details">
      {/* <HelmetMetaData></HelmetMetaData> */}
      <Popper className={classes.socialMediaPopper} open={true} transition>
        <FacebookShareButton
          url={"http://www.camperstribe.com"}
          quote={"CampersTribe - World is yours to explore"}
          hashtag="#camperstribe"
          className={classes.socialMediaButton}
        >
          <FacebookIcon size={36} />
        </FacebookShareButton>
      </Popper>
      <GridContainer>
        <GridItem xs={12} md={12}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xl={12} md={12} className={classes.expand}>
                  <Tooltip title="Chỉ Đường" arrow>
                    <IconButton>
                      <DirectionsIcon />
                    </IconButton>
                  </Tooltip>
                </GridItem>
                <GridItem xl={12} md={12}>
                  <GridContainer>
                    <GridItem xl={6} md={6} className={classes.img}>
                      <img
                        alt="food"
                        src={foodDetails.thumbnail}
                        className={classes.foodImage}
                      />
                    </GridItem>
                    <GridItem xl={6} md={6}>
                      <GridContainer>
                        <GridItem xl={12} md={12}>
                          <h4>{foodDetails.name}</h4>
                        </GridItem>
                        <GridItem xl={12} md={12} className={classes.expand}>
                          <Rating
                            name="size-small"
                            value={foodDetails.rating ? foodDetails.rating : 0}
                            size="small"
                            precision={0.1}
                            readOnly
                          />
                          <span style={{ margin: "0 5px 0 5px" }}>
                            {foodDetails.view}
                          </span>
                          <PersonIcon />
                        </GridItem>
                        <GridItem xl={12} md={12}>
                          {foodDetails.shortDescription}
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xl={12} md={12} className={classes.description}>
                  <SectionsCarousel images={foodDetails.listImageFoodUrl} />
                </GridItem>
                <GridItem xl={12} md={12} className={classes.description}>
                  <p>{foodDetails.content}</p>
                </GridItem>
              </GridContainer>
              <Divider />
              <GridContainer className={classes.description}>
                <GridItem xl={12} md={12}>
                  <GridContainer>
                    <GridItem xl={12} md={12}>
                      <h4 className={classes.reset}>Đánh giá</h4>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xl={12} md={12}>
                  <GridContainer>
                    <GridItem xl={4} md={4}>
                      <GridContainer justify="center">
                        <GridItem xl={12} md={12} className={classes.img}>
                          <h2 className={classes.reset}>
                            {foodDetails.rating}
                          </h2>
                        </GridItem>
                        <GridItem xl={12} md={12} className={classes.img}>
                          <Rating
                            name="size"
                            value={foodDetails.rating ? foodDetails.rating : 0}
                            precision={0.1}
                            readOnly
                          />
                        </GridItem>
                        <GridItem
                          xl={12}
                          md={12}
                          className={classnames(
                            classes.img,
                            classes.description
                          )}
                        >
                          <PersonIcon />
                          <span>{` Tổng  ${foodDetails.view}`}</span>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xl={8} md={8}>
                      {RenderList(comments)}
                    </GridItem>
                    <GridItem xl={12} md={12}>
                      <RenderListComment
                        comments={comments}
                        user={user}
                        methods={methods}
                        foodDetails={foodDetails}
                      />
                    </GridItem>
                    {typingVote ? <p>Có người đang đánh giá ...</p> : ""}
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </CardBody>
            <Divider />
            <CardFooter>
              <CardActions>
                {foodDetails.delete ? (
                  <Button variant="outlined" onClick={handleUnDelete}>
                    Khôi phục món ăn
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={handleDelete}>
                    Xóa món ăn
                  </Button>
                )}
              </CardActions>
            </CardFooter>
          </Card>
          <Link to="/admin/foods">{"<< Quay trở về quản lý foods"}</Link>
        </GridItem>
      </GridContainer>
    </Page>
  );
}
