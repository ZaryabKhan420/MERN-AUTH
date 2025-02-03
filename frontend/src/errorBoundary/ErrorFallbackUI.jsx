import React from "react";
import { useNavigate } from "react-router-dom";
const ErrorFallbackUI = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col justify-center items-center gap-5 w-screen h-screen mx-auto">
      <h1 className="text-lg font-bold text-center">
        Whoops, something went wrong.
      </h1>
      <p className="text-center">
        Please either refresh the page or return home to try again.
      </p>
      <p className="text-center">
        If the issue continues, please{" "}
        <a href="#" className="text-green-500">
          get in touch.
        </a>
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-green-500 text-white py-2 px-4 rounded-sm cursor-pointer"
      >
        Go home
      </button>
      <p className="text-green-500">Error:</p>
    </div>
  );
};

export default ErrorFallbackUI;
