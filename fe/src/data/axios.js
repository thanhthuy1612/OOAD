import axios from "axios";

export default function getAPI(baseURL) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}`)
      .then((response) => {
        
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
