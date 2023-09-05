import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const PendingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7l4-4m0 0l4 4m-4-4v18"
            />
          </svg>
          <h2 className="mt-2 text-lg font-semibold text-gray-800 py-2">
            An email has been sent to your account. Please click on the link to
            verify your email and continue.
          </h2>
          <p className="mt-1 text-gray-600 py-2">
            If you have not received the email, please check your spam folder.
          </p>
          <p className="mt-1 text-gray-600 py-2 ">
            after verifying your email please click on the link to enter your
            login credentials.
            <Button className="border-none text-black bg-gray-100  mx-4 px-8 mt-4  text-sm  font-bold">
              <Link to={"/signin"}>Login</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
