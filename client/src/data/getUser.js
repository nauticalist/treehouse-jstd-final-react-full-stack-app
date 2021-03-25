import axios from "axios";

export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    axios({
      url: "http://localhost:5000/api/users",
      method: "get",
      responseType: "json",
      auth: {
        username: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          resolve({ ...response.data, password });
        } else {
          reject(response.status);
        }
      })
      .catch((error) => {
        reject(error.response.status);
      });
  });
};
