import axiosCustom from "Plugins/axios";
export const ShopApi = {
  GetShopInfo: async (payload) => {
    let shopInfo = null;
    const response = await axiosCustom
      .callApi("GET", "/api/shop/getShop/" + payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      shopInfo = response.data;
    }
    return shopInfo;
  },
  CreateShop: async (payload) => {
    let isCreate = false;
    const response = await axiosCustom
      .callApi("POST", "/api/auth/registerShop", payload)
      .catch((error) => console.error(error));
    if (response && response.status === 201) {
      isCreate = true;
    }
    return isCreate;
  },
  EditShop: async (payload) => {
    let shopModel = null;
    const response = await axiosCustom
      .callApi("POST", "/api/shop/editShop", payload)
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      shopModel = response.data;
    }
    return shopModel;
  },
  GetShopList: async () => {
    let shopModel = [];
    const response = await axiosCustom
      .callApi("GET", "/api/admin/listShop")
      .catch((error) => console.error(error));
    if (response && response.status === 200) {
      shopModel = response.data;
    }
    return shopModel;
  },
};
