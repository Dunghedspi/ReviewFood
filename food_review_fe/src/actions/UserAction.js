/* eslint-disable no-unused-vars */
import { UserApi } from "apis/UserApi";
export const SetInfo = (payload) => {
  return {
    type: "SET_INFO",
    payload,
  };
};

export const Logout = () => {
  return async (dispatch) => {
    const response = await UserApi.Logout();
    if (response) {
      dispatch({
        type: "RESET_USER",
      });
    }
  };
};

export const EditInfo = (payload) => {
  return async (dispatch) => {
    const response = await UserApi.EditInfo(payload);
    if (response) {
      dispatch({
        type: "SET_INFO",
        payload,
      });
    }
  };
};

export const EditAvatar = (payload) => {
  return async (dispatch) => {
    const response = await UserApi.EditAvatar(payload);
    if (response) {
      dispatch({
        type: "SET_AVATAR",
        payload: response,
      });
    }
  };
};

export const EditShop = (payload) => {
  return {
    type: "SET_SHOP_MODEL",
    payload,
  };
};

export const GetListUser = () => {
  return async (dispatch) => {
    const response = await UserApi.GetListUser();
    if (response) {
      dispatch({
        type: "SET_LIST_USER",
        payload: response,
      });
    }
  };
};
