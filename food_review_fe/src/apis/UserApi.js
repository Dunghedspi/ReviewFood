import axiosCustom from "Plugins/axios";
import * as toast from "utils/toastify";
import axiosSendFile from "Plugins/axios/axiosSendFile";
export const UserApi = {
  SignIn: async (payload) => {
    let userInfo = null;
    const response = await axiosCustom
      .callApi("POST", "/api/auth/login", payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      userInfo = response.data;
      toast.toastifySuccess("Login successful");
    } else {
      toast.toastifyError("Login unsuccessful");
    }
    return userInfo;
  },
  SignUp: async (payload) => {
    console.log(payload);
    let isSignUp = false;
    const response = await axiosCustom
      .callApi("POST", "/api/auth/register", payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      isSignUp = true;
    }
    return isSignUp;
  },
  EditInfo: async (payload) => {
    let userInfo = null;
    const response = await axiosCustom
      .callApi("POST", "/api/user/editUser", payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      userInfo = response.data;
      toast.toastifySuccess("Successful");
    } else {
      toast.toastifyError("unsuccessful");
    }
    return userInfo;
  },
  EditAvatar: async (payload) => {
    let avatarUrl = null;
    const response = await axiosSendFile(
      "/api/user/uploadImageAvatar",
      payload
    ).catch((error) => console.error(error));
    if (response && response.status === 200) {
      avatarUrl = response.data;
      toast.toastifySuccess("Cập nhập ảnh thành công");
    } else {
      toast.toastifyError("Cập nhập ảnh không thành công");
    }
    return avatarUrl;
  },
  getUserInfo: async () => {
    let data = null;
    const response = await axiosCustom
      .callApi("GET", "/api/user/getUserInfo")
      .catch((error) => console.log(error));
    if (response && response.status === 200) {
      data = response.data;
    }
    return data;
  },
  Logout: async () => {
    let isLogout = false;
    const response = await axiosCustom
      .callApi("GET", "/api/auth/logout")
      .catch((error) => console.log(error));
    if (response && response.status === 200) {
      isLogout = true;
    }
    return isLogout;
  },
  getShopInfo: async () => {
    let data = null;
    const response = await axiosCustom
      .callApi("GET", "/api/shop/getShopInfo")
      .catch((error) => console.log(error));
    if (response && response.status === 200) {
      data = response.data;
    }
    return data;
  },
  EditPassword: async (payload) => {
    let isUpdate = false;
    const response = await axiosCustom
      .callApi("POST", "/api/user/editPassword", payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      isUpdate = true;
    }
    return isUpdate;
  },
  getRequestCreateShop: async () => {
    let shops = [];
    const response = await axiosCustom
      .callApi("GET", "/api/admin/getRequestCreateShop")
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      console.log(response);
      shops = response.data;
    }
    return shops;
  },
  ActiveUser: async (payload) => {
    let isActive = false;
    const response = await axiosCustom
      .callApi("GET", "api/admin/unBlockUser/" + payload)
      .catch((error) => console.error(error));
    console.log(response);
    if (response && response.status === 202) {
      isActive = true;
      toast.toastifySuccess("Cập nhập thành công");
    } else {
      toast.toastifyError("Cập nhập không thành công");
    }
    return isActive;
  },
  DeleteUser: async (payload) => {
    let isActive = false;
    const response = await axiosCustom
      .callApi("GET", "api/admin/deleteShop/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 202) {
      isActive = true;
      toast.toastifySuccess("Cập nhập thành công");
    } else {
      toast.toastifyError("Cập nhập không thành công");
    }
    return isActive;
  },
  UnDeleteUser: async (payload) => {
    let isActive = false;
    const response = await axiosCustom
      .callApi("GET", "api/admin/unDeleteShop/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 202) {
      isActive = true;
      toast.toastifySuccess("Cập nhập thành công");
    } else {
      toast.toastifyError("Cập nhập không thành công");
    }
    return isActive;
  },
  UnActive: async (payload) => {
    let isActive = false;
    const response = await axiosCustom
      .callApi("GET", "api/admin/unActive/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 202) {
      isActive = true;
      toast.toastifySuccess("Cập nhập thành công");
    } else {
      toast.toastifyError("Cập nhập không thành công");
    }
    return isActive;
  },
  GetListUser: async () => {
    let users = [];
    const response = await axiosCustom
      .callApi("GET", "/api/admin/listCustomer")
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      users = response.data;
    }
    return users;
  },
  ToggleActive: async (payload) => {
    let isActive = false;
    const response = await axiosCustom
      .callApi("GET", "api/admin/toggleActive/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      isActive = true;
      toast.toastifySuccess("Cập nhập thành công");
    } else {
      toast.toastifyError("Cập nhập không thành công");
    }
    return isActive;
  },
  GetTotalCustomer: async () => {
    let users = 0;
    const response = await axiosCustom
      .callApi("GET", "/api/admin/getCountCustomer")
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      console.log(response.data);
      users = response.data;
    }
    return users;
  },
  GetTotalShop: async () => {
    let users = 0;
    const response = await axiosCustom
      .callApi("GET", "/api/admin/getCountShop")
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      users = response.data;
    }
    return users;
  },
  GetTotalFood: async () => {
    let users = 0;
    const response = await axiosCustom
      .callApi("GET", "/api/admin/getCountFood")
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      users = response.data;
    }
    return users;
  },
};
