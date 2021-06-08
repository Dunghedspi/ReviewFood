/* eslint-disable react/jsx-no-undef */
import React from "react";
import UserLayout from "layouts/UserLayout";
import HomePage from "views/User/HomePage/HomePage";
import LoginPage from "views/LoginPage/index";
import FoodDetails from "views/User/FoodDetails/";
import ShopLayout from "layouts/ShopLayout/index";
import AccountView from "views/Shop/account/AccountView/index";
import DashboardView from "views/Shop/reports/DashboardView";
import ProductListView from "views/Shop/Food/index";
import SettingsView from "views/Shop/SettingsView/index";
import SignUpPage from "views/SignUpPage/SignUpPage";
import ResetPassPage from "views/ResetPassPage";
import AuthLayout from "layouts/Auth";
import UserDetailsView from "views/User/ProfilePage";
import { Navigate } from "react-router-dom";
import RegisterShopView from "views/RegisterShop";
import ShopPage from "views/User/ShopPage";
import AdminLayout from "layouts/AdminLayout/index";
import AdminAccountView from "views/Admin/account/AccountView/index";
import AdminDashboardView from "views/Admin/reports/DashboardView";
import AdminProductListView from "views/Admin/Food/index";
import AdminCustomerView from "views/Admin/Customer/CustomerListView/index";
import AdminShopView from "views/Admin/Shop/index";
import SearchCustomerView from "views/User/Search";
const routes = [
  {
    path: "/",
    element: <Navigate to="/food" />,
  },
  {
    path: "/register-shop-account",
    element: <RegisterShopView />,
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [{ path: "/", element: <UserDetailsView /> }],
  },
  {
    path: "/food",
    element: <UserLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/details/*", element: <FoodDetails /> },
      { path: "/shop/*", element: <ShopPage /> },
      { path: "/search/*", element: <SearchCustomerView /> },
    ],
  },
  {
    path: "/auth/*",
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPassPage />,
      },
    ],
  },
  {
    path: "shop/*",
    element: <ShopLayout />,
    children: [
      { path: "account", element: <AccountView /> },
      { path: "/", element: <DashboardView /> },
      { path: "foods/*", element: <ProductListView /> },
      { path: "settings", element: <SettingsView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "admin/*",
    element: <AdminLayout />,
    children: [
      { path: "account", element: <AdminAccountView /> },
      { path: "customer", element: <AdminCustomerView /> },
      { path: "/", element: <AdminDashboardView /> },
      { path: "foods/*", element: <AdminProductListView /> },
      { path: "shop/*", element: <AdminShopView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
