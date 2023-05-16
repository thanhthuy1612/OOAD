import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:5000",
});
// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export const request = {
  CARD_TYPE: "/cardType",
  CARD: "/card",
  LOG: "/log",
  LOG_DETAIL: "/logDetail",
  SCHEDULE: "/schedule",
  STAFF: "/staff",
  STAFF_SCHEDULE: "/staffSchedule",
  LICENSE_NUMBER: "/licenseNumber",
};
