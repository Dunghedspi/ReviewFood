import { ShopApi } from "apis/ShopApi";
export const SetShopList = () => {
  return async (dispatch) => {
    const response = await ShopApi.GetShopList();
    if (response) {
      dispatch({
        type: "SET_SHOP_LIST",
        payload: response,
      });
    }
  };
};
export const UpdateShop = (payload) => {
  return {
    type: "UPDATE_SHOP",
    payload,
  };
};
