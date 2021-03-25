import axios from "axios";

export const updateCourse = (id, course, user) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/courses/${id}`, course, {
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
