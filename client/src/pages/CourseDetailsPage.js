import React from "react";
import { useCourse } from "../hooks";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { ActionBar, CourseDetails } from "../components/course";

export const CourseDetailsPage = () => {
  const { id } = useParams();
  const { isLoading, course, status, error } = useCourse(id);
  const history = useHistory();

  if (error && status === 500) {
    history.push("/error");
  }

  return (
    <main>
      {isLoading ? null : (
        <>
          {course === null ? (
            <Redirect to="/not-found" />
          ) : (
            <>
              <ActionBar course={course} />
              <CourseDetails course={course} />
            </>
          )}
        </>
      )}
    </main>
  );
};
