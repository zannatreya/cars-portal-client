import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import useProfile from "../../../hooks/useProfile";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [usersProfile] = useProfile(user);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.error(err));
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      {user?.uid && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      <li>
        <Link to="/portfolio">My Portfolio</Link>
      </li>

      {user?.uid ? (
        <div>
          <div className="dropdown lg:dropdown-end ">
            <label tabIndex="0" className="avatar online">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    usersProfile?.image
                      ? usersProfile?.image
                      : "https://i.ibb.co/5sWZQdg/default-images.jpg"
                  }
                  alt=""
                />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content menu p-5 shadow bg-base-100 rounded-box w-40 lg:w-52"
            >
              <div className="avatar">
                <div className="w-16 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      usersProfile?.image
                        ? usersProfile?.image
                        : "https://i.ibb.co/5sWZQdg/default-images.jpg"
                    }
                    alt=""
                  />
                </div>
              </div>
              <Link
                to="/dashboard/my-profile"
                className="text-center my-4 font-bold hover:text-primary-focus"
              >
                {user?.displayName}
              </Link>
              <p className="text-center">
                <button
                  className="rounded btn btn-secondary btn-sm btn-outline text-base-100"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </p>
            </ul>
          </div>
        </div>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </React.Fragment>
  );
  return (
    <div className="navbar bg-base-100 flex justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Cars Portal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Header;
