const initState = {
  shops: [],
};
const findIndex = (shops, shop) => {
  return shops.findIndex((item) => item.id === shop.id);
};
const ShopReducers = (state = initState, action) => {
  switch (action.type) {
    case "SET_SHOP_LIST":
      return {
        ...state,
        shops: action.payload,
      };
    case "UPDATE_SHOP": {
      const index = findIndex(state.shops, action.payload);
      let newShops = state.shops;
      if (index !== -1) {
        newShops.splice(index, 1, action.payload);
      }
      return {
        ...state,
        shops: newShops,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default ShopReducers;
