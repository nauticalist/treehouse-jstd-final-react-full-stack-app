import React from "react";
import { useCourses } from "../hooks/useCourses";
import { CourseList, CreateCourseLink } from "../components/course";
import { useHistory } from "react-router-dom";

export const CoursesPage = () => {
  const { isLoading, courses, error } = useCourses();
  const history = useHistory();
  if (error) {
    console.log(error);
    history.push("/error");
  }
  return (
    <main>
      <div className="wrap main--grid">
        <CourseList isLoading={isLoading} courses={courses} />
        <CreateCourseLink />
      </div>
    </main>
  );
};
