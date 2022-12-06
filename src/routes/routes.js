import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../utils/constants";

const DashboardPage = lazy(async () => {
  const module = await import("../Pages/Dashboard");
  return module;
});
const MainLayout = lazy(async () => {
  const module = await import("../Pages/MainLayout");
  return module;
});
const MenuBarLayout = lazy(async () => {
  const module = await import("../Pages/Menubar");
  return module;
});
const LoginPage = lazy(() => {
  return import("../Pages/LoginPage").then(module => {
    return module;
  });
});
const LoginTypesPage = lazy(async () => {
  const module = await import("../Pages/LoginTypes");
  return module;
});
const PasswordPage = lazy(async () => {
  const module = await import("../Pages/PasswordPage");
  return module;
});
const FacePage = lazy(async () => {
  const module = await import("../Pages/FacePage");
  return module;
});
const FingerPrintPage = lazy(async () => {
  const module = await import("../Pages/FingerPrintPage");
  return module;
});

const routes = isLoggedIn => [
  {
    path: PATHS.loginTypes,
    element: isLoggedIn ? <MainLayout /> : <Navigate to={"/"} />,
    children: [
      { path: "", element: <LoginTypesPage /> },
      { path: PATHS.password, element: <PasswordPage /> },
      { path: PATHS.face, element: <FacePage /> },
      { path: PATHS.fingerPrint, element: <FingerPrintPage /> },
    ],
  },
  {
    path: PATHS.dashboard,
    element: <MenuBarLayout />,
    children: [{ path: "", element: <DashboardPage /> }],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <LoginPage /> }],
  },
];

export default routes;
