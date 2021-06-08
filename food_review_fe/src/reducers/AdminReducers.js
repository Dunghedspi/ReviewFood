const initState = {
  users: [],
};
// const findIndex = (shops, shop) => {
//   return shops.findIndex((item) => item.id === shop.id);
// };
const AdminReducers = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_USER":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default AdminReducers;
