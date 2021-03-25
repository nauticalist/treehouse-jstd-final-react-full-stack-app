import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/context";

export const CreateCourseLink = () => {
  const { isAuthenticated, authUser } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated && authUser ? (
        <Link to="/courses/create">
          <div className="course--module course--add--module">
            <span className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
              </svg>
              New Course
            </span>
          </div>
        </Link>
      ) : null}
    </>
  );
};
