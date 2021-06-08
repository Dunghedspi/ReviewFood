/* eslint-disable no-case-declarations */
const initState = {
  foods: [],
  foodEdit: {},
};

const findIndex = (foods, id) => {
  return foods.findIndex((item) => item.id === id);
};

const FoodReducers = (state = initState, action) => {
  switch (action.type) {
    case "SET_FOOD":
      return {
        ...state,
        foods: action.payload,
      };
    case "ADD_FOOD":
      const { foods } = state;
      const newListFood = [action.payload, ...foods];
      return {
        ...state,
        foods: newListFood,
      };
    case "DELETE_FOOD":
      const newFoods = state.foods;
      const index = findIndex(newFoods, action.payload);
      if (index !== -1) {
        newFoods.splice(index, 1);
      }
      return {
        ...state,
        foods: newFoods,
      };
    case "EDIT_FOOD": {
      return {
        ...state,
        foodEdit: action.payload,
      };
    }
    case "EMTY_EDIT_FOOD": {
      return {
        ...state,
        foodEdit: {},
      };
    }
    case "UPDATE_FOOD": {
      const newFoods = state.foods;
      const index = findIndex(newFoods, action.payload.id);
      if (index !== -1) {
        newFoods.splice(index, 1, action.payload);
      }
      return {
        ...state,
        foods: newFoods,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default FoodReducers;
