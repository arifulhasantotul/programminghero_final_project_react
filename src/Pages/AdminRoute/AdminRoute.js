import { CircularProgress } from "@mui/material";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
   const { user, admin, adminLoading, isLoading } = useAuth();
   if (isLoading || adminLoading) {
      return <CircularProgress />;
   }
   return (
      <Route
         {...rest}
         render={({ location }) =>
            (admin && user.email) ||
            (admin && user.displayName) ||
            (user.photoURL && admin) ? (
               children
            ) : (
               <Redirect
                  to={{
                     pathname: "/",
                     state: { from: location },
                  }}
               />
            )
         }
      />
   );
};

export default AdminRoute;
