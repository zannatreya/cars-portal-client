import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";
import { AuthContext } from "../Contexts/AuthProvider";
import { FaRegUser, FaList } from "react-icons/fa";
import { BsChatLeftText, BsTools } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { BiMessageSquareAdd } from "react-icons/bi";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  return (
    <div>
      <Header></Header>
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard">
                <FaRegUser className="text-lg" />
                My Profile
              </Link>
            </li>

            <>
              <li>
                <Link to="/dashboard/addreview">
                  <BsChatLeftText className="text-lg" />
                  Add A Review
                </Link>
              </li>
              <li>
                <Link to="/dashboard/myorders">
                  <FaList className="text-lg" />
                  My Orders
                </Link>
              </li>
            </>

            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/allusers">
                    <FiUsers className="text-lg" />
                    Admins &amp; Users
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manageorders">
                    <FaList className="text-lg" />
                    Manage all orders
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/addparts">
                    <BiMessageSquareAdd className="text-2xl" />
                    Add a Part
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/managetools">
                    <BsTools className="text-lg" />
                    Manage all Parts
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
