import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
   const location = useLocation();
   const { user, admin, adminLoading, isLoading } = useAuth();
   if (isLoading || adminLoading) {
      return <CircularProgress />;
   }
   if (user.email && admin) {
      return children;
   }

   return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;
