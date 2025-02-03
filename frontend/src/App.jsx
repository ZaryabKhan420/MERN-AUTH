import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundaryWrapper from "./errorBoundary/ErrorBoundaryWrapper.jsx";
import "./index.css";
import { FallbackUI, FloatingShape } from "./components/index.js";
import { useAuthStore } from "./store/authStore.js";
import { Toaster } from "react-hot-toast";
function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user, message } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  console.log(isAuthenticated, user, message);

  if (isCheckingAuth) {
    return <FallbackUI />;
  }
  return (
    <ErrorBoundaryWrapper>
      <Suspense fallback={<FallbackUI />}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
          <FloatingShape
            color="bg-green-500"
            size="w-64 h-64"
            top="-5%"
            left="10%"
            delay={0}
          />
          <FloatingShape
            color="bg-green-500"
            size="w-48 h-48"
            top="70%"
            left="80%"
            delay={5}
          />
          <FloatingShape
            color="bg-green-500"
            size="w-32 h-32"
            top="40%"
            left="-10%"
            delay={0}
          />
          <Outlet />
          <Toaster />
        </div>
      </Suspense>
    </ErrorBoundaryWrapper>
  );
}

export default App;
