import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Blogs from "../Pages/Blogs/Blogs";
import AllParts from "../Pages/Home/AllParts";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import DisplayError from "../Pages/Shared/DisplayError/DisplayError";
import AddParts from "../Pages/Dashboard/AddParts";
import MyProfile from "../Pages/Dashboard/MyProfile";
import Purchase from "../Pages/Purchase/Purchase";
import MyOrders from "../Pages/Dashboard/MyOrders";
import ManageOrders from "../Pages/Dashboard/ManageOrders";
import ManageTools from "../Pages/Dashboard/ManageTools";
import Payment from "../Pages/Dashboard/Payment";
import AddReview from "../Pages/Dashboard/AddReview";
import AdminRoute from "./AdminRoute";
import AllUsers from "../Pages/Dashboard/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/allparts",
        element: <AllParts></AllParts>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/purchase/:id",
        element: <Purchase></Purchase>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/addparts",
        element: (
          <AdminRoute>
            <AddParts></AddParts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/myorders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/manageorders",
        element: (
          <AdminRoute>
            {" "}
            <ManageOrders></ManageOrders>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addreview",
        element: <AddReview></AddReview>,
      },
      {
        path: "/dashboard/managetools",
        element: (
          <AdminRoute>
            {" "}
            <ManageTools></ManageTools>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
      // {
      //   path: "/dashboard/allusers",
      //   element: <AdminsAndUsers></AdminsAndUsers>,
      // },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
