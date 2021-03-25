import React from "react";
import { CourseCard } from "./CourseCard";

export const CourseList = ({ isLoading, courses }) =>
  isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </>
  );
