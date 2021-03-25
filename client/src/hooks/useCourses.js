import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook for loading all courses
 *
 * @returns {{isLoading: boolean, courses: *[], error: Object}}
 */
export const useCourses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setErrors] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      axios({
        url: "/api/courses",
        method: "get",
        responseType: "json",
      })
        .then((response) => {
          if (response.status === 200) {
            setCourses(response.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setErrors(error);
          setIsLoading(false);
        });
    };

    getCourses();
  }, []);

  return { isLoading, courses, error };
};
