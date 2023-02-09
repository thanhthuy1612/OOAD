import { UPDATE_STAFF } from "./constants";

export const initState = {
  item: "",
  items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STAFF:
      return {
        ...state,
        item: action.payload,
      };
    default:
      throw new Error("Invalid action");
  }
};

export default reducer;
