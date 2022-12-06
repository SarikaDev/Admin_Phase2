import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import routes from "./routes";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const RouteHandler = () => {
  const loggedIn = useSelector(state => state.auth?.identityNumber?.length);
  console.log("loggedIn", loggedIn);
  const routing = useRoutes(routes(!!loggedIn));
  return <Suspense fallback={<CircularProgress />}> {routing}</Suspense>;
};

export default RouteHandler;
