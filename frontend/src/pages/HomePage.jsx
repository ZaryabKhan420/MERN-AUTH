import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
const HomePage = () => {
  const { user } = useAuthStore();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (user?.isVerified) {
      setStatus(true);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between items-center gap-3">
      <h1 className="text-3xl font-bold text-white">Mern Auth</h1>
      {status ? (
        <button className="text-green-500 px-4 py-2 rounded-sm bg-white border-none outline-none font-bold">
          <Link to={"/dashboard"}>Dashboard</Link>
        </button>
      ) : (
        <button className="text-green-500 px-4 py-2 rounded-sm bg-white border-none outline-none font-bold">
          <Link to={"/login"}>Login</Link>
        </button>
      )}
    </div>
  );
};

export default HomePage;
