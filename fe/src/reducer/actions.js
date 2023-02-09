import { UPDATE_STAFF } from "./constants";

export const setStaff = (payload) => {
  return {
    type: UPDATE_STAFF,
    payload,
  };
};
