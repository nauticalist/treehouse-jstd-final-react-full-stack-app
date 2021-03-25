import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { validateCourseForm } from "../validation/validateCourseForm";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { AuthContext } from "../context/context";
import { createCourse } from "../data/createCourse";

export const CreateCoursePage = () => {
  const [apiError, setApiError] = useState([]);
  const { values, errors, handleChange, handleSubmit } = useForm(
    handleCreateCourse,
    validateCourseForm
  );
  const authState = useContext(AuthContext);
  const history = useHistory();

  function handleCreateCourse() {
    const course = {
      title: values.courseTitle,
      userId: authState.authUser.userId,
      description: values.courseDescription,
      estimatedTime: values.estimatedTime,
      materialsNeeded: values.materialsNeeded,
    };

    createCourse(course, authState.authUser)
      .then(() => history.push("/"))
      .catch((error) => {
        if (error.status === 400) {
          setApiError(error.data.errors);
        } else if (error.status === 401) {
          history.push("/forbidden");
        } else {
          history.push("/error");
        }
      });
  }

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>

        <ErrorDisplay errors={apiError} />
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={values.courseTitle || ""}
                onChange={handleChange}
              />
              {errors.courseTitle && (
                <p className="field-error">{errors.courseTitle}</p>
              )}

              <label htmlFor="courseAuthor">Course Author</label>
              <input
                id="courseAuthor"
                name="courseAuthor"
                type="text"
                value={`${authState.authUser.firstName} ${authState.authUser.lastName}`}
                disabled
              />

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={values.courseDescription || ""}
                onChange={handleChange}
              />
              {errors.courseDescription && (
                <p className="field-error">{errors.courseDescription}</p>
              )}
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={values.estimatedTime || ""}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={values.materialsNeeded || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};
