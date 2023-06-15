import React, { useContext, useState } from "react";
// import { AuthContext } from "../../Contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Pages/Shared/PageLoading";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../Contexts/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
