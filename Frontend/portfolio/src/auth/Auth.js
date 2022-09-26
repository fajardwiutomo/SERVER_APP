import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

const Auth = ({ signedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let token = signedIn;

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
