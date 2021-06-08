/* eslint-disable react/prop-types */
import React, { useState } from "react";
import clsx from "clsx";
import * as toast from "utils/toastify";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Avatar,
  CardActions,
} from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { useForm } from "react-hook-form";
import axios from "Plugins/axios/axiosSendFile";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: "auto",
    width: "100%",
  },
  img: {
    padding: "40px 50px",
    border: "#efefef 3px solid",
    borderRadius: "9px",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "#1873E8",
    "&:hover": {
      backgroundColor: "#f2f9f9",
    },
  },
  image: {
    minHeight: "100px",
  },
}));

const EditFood = ({ className, ...rest }) => {
  const classes = useStyles();
  const [foodThumbnail, setFoodThumbnail] = useState("");
  const { handleSubmit, register } = useForm();
  const [images, setImages] = useState([]);
  const [foodImage, setFoodImage] = useState([]);
  const { foodEdit } = useSelector((state) => state.FoodReducers);
  const [imageListDelete, setImageListDelete] = React.useState([]);
  const [listOldImage, setListOldImage] = React.useState(
    foodEdit.listImageFoodUrl
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append(
      "thumbnail",
      data.thumbnail.length > 0 ? data.thumbnail[0] : ""
    );
    for (let i = 0; i < foodImage.length; i++) {
      formData.append("foodImages", foodImage[i]);
    }
    for (let key in data) {
      if (key !== "thumbnail") formData.append(key, data[key]);
    }
    formData.append("imageUrl", imageListDelete);
    formData.append("id", foodEdit.id);
    const response = await axios("/api/food/editFood", formData);
    console.log(response);
    if (response && response.status === 200) {
      toast.toastifySuccess("Chỉnh sửa món ăn thành công");
      // dispatch(AddFood(response.data));
      navigate(`/shop/foods/details?id=${response.data.id}`);
      console.log(response);
    }
  };
  const onError = (error) => {
    console.error(error);
  };

  const deleteImage = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  };
  const deleteOldImage = (index) => {
    setImageListDelete([...imageListDelete, listOldImage.splice(index, 1)]);
    setListOldImage([...listOldImage]);
  };
  const RenderImages = () => {
    return images.map((image, index) => {
      return (
        <GridItem xs={2} key={index}>
          <div className={classes.image}>
            <Avatar variant="square" className={classes.avatar} src={image} />
          </div>
          <Button onClick={() => deleteImage(index)}>Xóa ảnh</Button>
        </GridItem>
      );
    });
  };
  const handleSelectFile = (e) => {
    setFoodImage([...foodImage, e.target.files[0]]);
    const readFile = new FileReader();
    readFile.onload = () => {
      if (readFile.readyState === 2) {
        setImages([...images, readFile.result]);
      }
    };
    readFile.readAsDataURL(e.target.files[0]);
  };

  const handelChangeImage = (e) => {
    const readFile = new FileReader();
    readFile.onload = () => {
      if (readFile.readyState === 2) {
        setFoodThumbnail(readFile.result);
      }
    };
    readFile.readAsDataURL(e.target.files[0]);
  };
  const RenderImagesFood = (images) => {
    return images.map((image, index) => {
      return (
        <GridItem xs={2} key={index}>
          <div className={classes.image}>
            <Avatar variant="square" className={classes.avatar} src={image} />
          </div>
          <Button onClick={() => deleteOldImage(index)}>Xóa ảnh</Button>
        </GridItem>
      );
    });
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <GridContainer>
        <GridItem lg={4} md={6} xs={12}>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardContent>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  variant="square"
                  className={classes.avatar}
                  src={foodThumbnail ? foodThumbnail : foodEdit.thumbnail}
                />
              </Box>
            </CardContent>
            <Divider />
            <CardActions>
              <input
                type="file"
                hidden={true}
                id="thumbnail"
                name="thumbnail"
                onChange={handelChangeImage}
                ref={register}
              />
              <Button color="primary" fullWidth variant="text">
                <label
                  htmlFor={"thumbnail"}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  Upload Thumbnail Food
                </label>
              </Button>
            </CardActions>
          </Card>
        </GridItem>
        <GridItem lg={8} md={6} xs={12}>
          <Card>
            <CardHeader subheader="The information new food" title="Food" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Please specify the food name"
                    label="Food Name"
                    name="name"
                    required
                    variant="outlined"
                    inputRef={register}
                    defaultValue={foodEdit.name}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="vnd"
                    label="Price"
                    name="price"
                    required
                    variant="outlined"
                    inputRef={register}
                    defaultValue={foodEdit.price}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Short Description"
                    name="shortDescription"
                    required
                    variant="outlined"
                    inputRef={register}
                    defaultValue={foodEdit.shortDescription}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="content"
                    type="text"
                    variant="outlined"
                    inputRef={register}
                    defaultValue={foodEdit.content}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <GridContainer>
                    {RenderImagesFood(listOldImage)}
                    {RenderImages()}
                    <GridItem xs={2}>
                      <input
                        type="file"
                        hidden={true}
                        id="file"
                        onChange={(e) => handleSelectFile(e)}
                      />
                      <label htmlFor="file">
                        <div role="button" className={classes.img}>
                          <AddAPhotoOutlinedIcon />
                        </div>
                      </label>
                    </GridItem>
                  </GridContainer>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained" type={"submit"}>
                Update Food
              </Button>
            </Box>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
  );
};

export default EditFood;
