import axiosCustom from "../Plugins/axios";
import * as toast from "utils/toastify";
export const FoodApi = {
  GetList: async () => {
    let foods = null;
    const response = await axiosCustom
      .callApi("GET", "/api/food")
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      foods = response.data;
    }
    return foods;
  },
  GetFoodTrending: async () => {
    let trendingProducts = null;
    const response = await axiosCustom
      .callApi("GET", "/api/food/getFoodByOrderByRateDesc")
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      trendingProducts = response.data;
    }
    return trendingProducts;
  },
  GetFoodsRelate: async (payload) => {
    let relateProducts = null;
    const response = await axiosCustom
      .callApi("GET", "/api/products/relate", null, payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      relateProducts = response.data;
    }
    return relateProducts;
  },
  GetDetailsFood: async (payload) => {
    let products = null;
    const response = await axiosCustom
      .callApi("GET", "/api/food/getFood/" + payload, null)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      console.log(response);
      products = response.data;
    }
    return products;
  },
  GetListComment: async (payload) => {
    let comments = null;
    const response = await axiosCustom
      .callApi("GET", "/api/comment/getListComment/" + payload, null)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      console.log(response);
      comments = response.data;
    }
    return comments;
  },
  GetListFoodByShop: async (payload) => {
    let foods = null;
    const response = await axiosCustom
      .callApi("GET", "/api/food/getFoodByShop/" + payload, null)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      foods = response.data;
    }
    return foods;
  },
  CreateComment: async (payload) => {
    let result = null;
    const response = await axiosCustom
      .callApi("POST", "/api/comment/addComment", payload)
      .catch((error) => console.error(error));
    console.log(response);
    if (response && response.status === 201) {
      result = response.data;
    }
    return result;
  },
  GetChildComment: async (payload) => {
    let childComments = null;
    const response = await axiosCustom
      .callApi("GET", "/api/comment/getChildComment/" + payload)
      .catch((error) => console.log(error));
    if (response && response.status === 200) {
      childComments = response.data;
    }
    return childComments;
  },
  SubmitLike: async (payload) => {
    const response = await axiosCustom
      .callApi("POST", "/api/comment/addLike", payload)
      .catch((error) => console.error(error));
    return response;
  },
  GetListFood: async () => {
    let foods = null;
    const response = await axiosCustom
      .callApi("GET", "/api/food/getFoodShop/")
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      foods = response.data;
    }
    return foods;
  },
  DeleteFood: async (payload) => {
    let isDelete = false;
    const response = await axiosCustom
      .callApi("DELETE", "/api/food/deleteFood/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 202) {
      isDelete = true;
      toast.toastifySuccess("Đã xóa sản phẩm");
    } else {
      toast.toastifyError("Xóa sản phẩm không thành công");
    }
    return isDelete;
  },
  CreateChildComment: async (payload) => {
    let childComments = null;
    const response = await axiosCustom
      .callApi("POST", "/api/comment/addChildComment", payload)
      .catch((error) => console.log(error));
    if (response && response.status === 201) {
      childComments = response.data;
    }
    return childComments;
  },
  UnDeleteFood: async (payload) => {
    let isUnDelete = false;
    const response = await axiosCustom
      .callApi("GET", "/api/admin/unDeleteFood/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 202) {
      isUnDelete = true;
      toast.toastifySuccess("Khôi phục sản phẩm thành công");
    } else {
      toast.toastifyError("Khôi phục sản phẩm không thành công");
    }
    return isUnDelete;
  },
  DeleteFoodByAdmin: async (payload) => {
    let isUnDelete = false;
    const response = await axiosCustom
      .callApi("GET", "/api/admin/deleteFood/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 202) {
      isUnDelete = true;
      toast.toastifySuccess("Xóa sản phẩm thành công");
    } else {
      toast.toastifyError("Xóa sản phẩm không thành công");
    }
    return isUnDelete;
  },
  FindFoodByAdmin: async (payload) => {
    let foods = null;
    const response = await axiosCustom
      .callApi("GET", "/api/food/search/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      foods = response.data;
    }
    return foods;
  },
  FindFoodByCustomer: async (payload) => {
    let foods = null;
    const response = await axiosCustom
      .callApi("GET", "/api/food/searchFood/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      foods = response.data;
    }
    return foods;
  },
};
