const initState = {
  userName: "",
  email: "",
  imageUrl: "",
  role: "",
  isLogin: false,
};
const UserReducers = (state = initState, action) => {
  switch (action.type) {
    case "SET_INFO":
      return {
        ...state,
        ...action.payload,
        isLogin: true,
      };
    case "SET_AVATAR": {
      return {
        ...state,
        imageUrl: action.payload,
      };
    }
    case "RESET_USER":
      return {
        ...initState,
      };
    case "SET_SHOP_MODEL":
      return {
        ...state,
        shopModel: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default UserReducers;
