import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { selectIsLoggedIn } from "../redux/features/auth/authSlice";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You are not authorized to view this page");
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <>
          <Navigate to="/" />
        </>
      )}
    </>
  );
};

export { ProtectedRoute };
