import { FoodApi } from "apis/FoodApi";

export const GetFoodTrending = () => {
  return async (dispatch) => {
    const response = await FoodApi.GetFoodTrending();
    if (response) {
      dispatch({
        type: "SET_FOOD",
        payload: response,
      });
    }
  };
};

export const GetDetailsFood = (id) => {
  return async (dispatch) => {
    const response = await FoodApi.GetDetailsFood(id);
    if (response) {
      dispatch({
        type: "SET_FOOD_DETAILS",
        payload: response,
      });
    }
  };
};

export const SetFood = (payload) => {
  return {
    type: "SET_FOOD",
    payload,
  };
};

export const AddFood = (payload) => {
  return {
    type: "ADD_FOOD",
    payload,
  };
};
export const DeleteFood = (id) => {
  return async (dispatch) => {
    const response = await FoodApi.DeleteFood(id);
    if (response) {
      dispatch({
        type: "DELETE_FOOD",
        payload: id,
      });
    }
  };
};
export const AddFoodEdit = (payload) => {
  return {
    type: "EDIT_FOOD",
    payload,
  };
};

export const UpdateFood = (payload) => {
  return {
    type: "UPDATE_FOOD",
    payload,
  };
};
