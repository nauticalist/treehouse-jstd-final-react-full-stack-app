import axios from "axios";

export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/users`, user, { responseType: "json" })
      .then((response) => {
        if (response.status === 201) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
