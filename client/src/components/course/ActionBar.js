import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/context";
import { deleteCourse } from "../../data";

export const ActionBar = ({ course }) => {
  const { isAuthenticated, authUser } = useContext(AuthContext);
  const owner = course.user;
  const history = useHistory();

  const handleDelete = () => {
    if (isAuthenticated && authUser && authUser.userId === owner.id) {
      deleteCourse(course.id, authUser)
        .then(() => history.push("/"))
        .catch((error) => {
          if (error === 403) {
            // Redirect if not course owner
            history.push("/forbidden");
          } else {
            // 500 - Internal Server Error
            history.push("/error");
          }
        });
    }
  };

  return (
    <div className="actions--bar">
      <div className="wrap">
        {isAuthenticated && authUser && authUser.userId === owner.id ? (
          <>
            <Link to={`/courses/${course.id}/update`}>
              <button className="button">Update Course</button>
            </Link>
            <button
              className="button"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this course?")
                )
                  handleDelete();
              }}
            >
              Delete Course
            </button>
          </>
        ) : null}
        <Link to="/">
          <button className="button button-secondary">Return to List</button>
        </Link>
      </div>
    </div>
  );
};
