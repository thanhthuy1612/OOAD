import API, { request } from "./api";

export function getAPI(url) {
  return new Promise((resolve, reject) => {
    API.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getStaff() {
  return await getAPI(request.STAFF);
}
