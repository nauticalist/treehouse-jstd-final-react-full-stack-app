import React, { useState, useEffect, useContext } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { validateCourseForm } from "../validation/validateCourseForm";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { AuthContext } from "../context/context";
import { useCourse } from "../hooks/useCourse";
import { updateCourse } from "../data/updateCourse";

export const UpdateCoursePage = () => {
  const { authUser } = useContext(AuthContext);
  const { id } = useParams();
  const { isLoading, course, status, error } = useCourse(id);
  const history = useHistory();

  if (error && status === 500) {
    history.push("/error");
  }

  const [apiError, setApiError] = useState([]);
  const { values, errors, handleChange, handleSubmit } = useForm(
    handleUpdateCourse,
    validateCourseForm
  );

  function handleUpdateCourse() {
    const updatedCourse = {
      title: values.courseTitle,
      userId: authUser.userId,
      description: values.courseDescription,
      estimatedTime: values.estimatedTime,
      materialsNeeded: values.materialsNeeded,
    };

    updateCourse(id, updatedCourse, authUser)
      .then(() => history.push("/"))
      .catch((error) => {
        if (error.status === 400) {
          setApiError(error.data.errors);
        } else if (error.status === 403) {
          history.push("/forbidden");
        } else if (error.status === 404) {
          history.push("/not-found");
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
      {isLoading ? null : (
        <>
          {course === null ? (
            <Redirect to="/not-found" />
          ) : (
            <>
              {course.user.id !== authUser.userId ? (
                <Redirect to="/forbidden" />
              ) : (
                <div className="wrap">
                  <h2>Update Course</h2>
                  <ErrorDisplay errors={apiError} />
                  <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                      <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                          id="courseTitle"
                          name="courseTitle"
                          type="text"
                          value={values.courseTitle || course.title}
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
                          value={`${authUser.firstName} ${authUser.lastName}`}
                          disabled
                        />

                        <label htmlFor="courseDescription">
                          Course Description
                        </label>
                        <textarea
                          id="courseDescription"
                          name="courseDescription"
                          value={values.courseDescription || course.description}
                          onChange={handleChange}
                        />
                        {errors.courseDescription && (
                          <p className="field-error">
                            {errors.courseDescription}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          value={values.estimatedTime || course.estimatedTime}
                          onChange={handleChange}
                        />

                        <label htmlFor="materialsNeeded">
                          Materials Needed
                        </label>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          value={
                            values.materialsNeeded || course.materialsNeeded
                          }
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <button className="button" type="submit">
                      Update Course
                    </button>
                    <button
                      className="button button-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};
