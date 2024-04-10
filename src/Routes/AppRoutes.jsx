import React from "react";
import SignIn from "../components/SignIn.jsx";
import SignUp from "../components/SignUp.jsx";
import ForgetPassword from "../components/ForgetPassword.jsx";
import Layout from "../components/Layout.jsx";
import Projects from "../components/Projects/Projects.jsx";
import Dashboard from "../components/Dashboard.jsx";
import CreateProject from "../components/Projects/CreateProject.jsx";
import Users from "../components/Users/Users.jsx";
import CreateUser from "../components/Users/CreateUser.jsx";
import ConfirmPassword from "../components/ConfirmPassword.jsx";
import Materials from "../components/Materials/Materials.jsx";
import CreateMaterial from "../components/Materials/CreateMaterial.jsx";
import PlanDetails from "../components/Plan/PlanDetails.jsx";
import AgreementDetails from "../components/Agreement/AgreementDetails.jsx";
import QuotationDetails from "../components/Quotation/QuotationDetails.jsx";
import NotFound from "../components/NotFound.jsx";
import UnAuthorized from "../components/UnAuthorized.jsx";
const AppRoutes = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/402",
    element: <UnAuthorized />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/user/forgetPassword/:token",
    element: <ConfirmPassword />,
  },
  {
    path: "/main",
    element: <Layout />,
    children: [
      {
        path: "/main/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/main/projects",
        element: <Projects />,
      },
      {
        path: "/main/projects/create",
        element: <CreateProject />,
      },
      {
        path: "/main/projects/edit/:id",
        element: <CreateProject />,
      },
      {
        path: "/main/users",
        element: <Users />,
      },
      {
        path: "/main/users/create",
        element: <CreateUser />,
      },
      {
        path: "/main/users/edit/:id",
        element: <CreateUser />,
      },
      {
        path: "/main/materials",
        element: <Materials />,
      },
      {
        path: "/main/materials/create",
        element: <CreateMaterial />,
      },
      {
        path: "/main/materials/edit/:id",
        element: <CreateMaterial />,
      },
      {
        path: "/main/plan",
        element: <PlanDetails />,
      },
      {
        path: "/main/agreement",
        element: <AgreementDetails />,
      },
      {
        path: "/main/quotation",
        element: <QuotationDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default AppRoutes;
