import { useState, useEffect } from "react";
import { getCourse } from "../data/getCourse";

export const useCourse = (courseId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      getCourse(courseId)
        .then((response) => {
          if (response.status === 200) {
            setCourse(response.data);
            setStatus(200);
            setIsLoading(false);
          } else {
            setStatus(500);
            setError(true);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setStatus(404);
            setError(true);
            setIsLoading(false);
          } else {
            setStatus(500);
            setError(true);
            setIsLoading(false);
          }
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [courseId]);

  return { isLoading, course, status, error };
};
