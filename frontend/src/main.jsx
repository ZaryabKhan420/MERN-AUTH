import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { CheckAuthentication, ProtectedRoute } from "./components/index.js";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const VerifyPage = lazy(() => import("./pages/VerifyPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route
        path="signup"
        element={
          <CheckAuthentication>
            <SignUpPage />
          </CheckAuthentication>
        }
      />
      <Route
        path="verify-email"
        element={
          <CheckAuthentication>
            <VerifyPage />
          </CheckAuthentication>
        }
      />
      <Route
        path="login"
        element={
          <CheckAuthentication>
            <LoginPage />
          </CheckAuthentication>
        }
      />
      <Route
        path="forgot-password"
        element={
          <CheckAuthentication>
            <ForgotPasswordPage />
          </CheckAuthentication>
        }
      />
      <Route
        path="reset-password/:token"
        element={
          <CheckAuthentication>
            <ResetPasswordPage />
          </CheckAuthentication>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
