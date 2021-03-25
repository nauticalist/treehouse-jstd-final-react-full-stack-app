import axios from "axios";

export const deleteCourse = (id, user) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/courses/${id}`, {
        responseType: "json",
        auth: {
          username: user.emailAddress,
          password: user.password,
        },
      })
      .then((response) => {
        if (response.status === 204) {
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
