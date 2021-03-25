import React, { useState, useContext } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useCourse, useForm } from "../hooks";
import { validateCourseForm } from "../validation";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { AuthContext } from "../context/context";
import { updateCourse } from "../data";

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
    validateCourseForm,
    course
  );

  function handleUpdateCourse() {
    const updatedCourse = {
      title: values.title,
      userId: authUser.userId,
      description: values.description,
      estimatedTime: values.estimatedTime,
      materialsNeeded: values.materialsNeeded,
    };

    updateCourse(id, updatedCourse, authUser)
      .then(() => history.push(`/courses/${course.id}`))
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
    history.push(`/courses/${course.id}`);
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
                  <form>
                    <div className="main--flex">
                      <div>
                        <label htmlFor="title">Course Title</label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          value={values.title}
                          onChange={handleChange}
                        />
                        {errors.title && (
                          <p className="field-error">{errors.title}</p>
                        )}

                        <label htmlFor="courseAuthor">Course Author</label>
                        <input
                          id="courseAuthor"
                          name="courseAuthor"
                          type="text"
                          value={`${authUser.firstName} ${authUser.lastName}`}
                          disabled
                        />

                        <label htmlFor="description">Course Description</label>
                        <textarea
                          id="description"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                        />
                        {errors.description && (
                          <p className="field-error">{errors.description}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          value={values.estimatedTime}
                          onChange={handleChange}
                        />

                        <label htmlFor="materialsNeeded">
                          Materials Needed
                        </label>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          value={values.materialsNeeded}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <button className="button" onClick={handleSubmit}>
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
