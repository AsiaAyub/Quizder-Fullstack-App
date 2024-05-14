import React, { useState } from "react";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import AdminLoginForm from "../components/AdminLoginForm";

const AuthPage: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<
    "signin" | "signup" | "adminLogin"
  >("signin");

  const toggleForm = () => {
    setCurrentForm(
      currentForm === "signin"
        ? "signup"
        : currentForm === "adminLogin"
        ? "signin"
        : "signin"
    );
  };

  const toggleToAdmin = () => {
    setCurrentForm(currentForm === "adminLogin" ? "signin" : "adminLogin");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cover bg-[url('https://cdn.pixabay.com/photo/2023/03/06/05/51/cloud-7832676_1280.jpg')]">
      <div className="lg:w-1/3 w-10/12 h-fit bg-cyan-950 p-8 bg-opacity-95">
        <div className="w-full text-center">
          <img
            src="/assets/images/refer.png"
            alt="login"
            className="w-24 h-24 mx-auto"
          />
          <h1 className="text-center text-xl font-bold">
            {currentForm === "signin" ? (
              <>Sign In</>
            ) : currentForm === "signup" ? (
              <>Sign Up</>
            ) : (
              <>Admin Sign In</>
            )}
          </h1>
          <h3 className="text-sm text-cyan-500">
            Please insert your email and password
          </h3>
        </div>
        {currentForm === "signin" ? (
          <SigninForm />
        ) : currentForm === "signup" ? (
          <SignupForm />
        ) : (
          <AdminLoginForm />
        )}

        <div className="flex justify-end mt-4 text-sm">
          <p>
            {currentForm === "signin" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="mx-1 underline focus:outline-none"
                >
                  Sign Up
                </button>
                <button
                  onClick={toggleToAdmin}
                  className="mx-2 underline focus:outline-none"
                >
                  Admin Signin
                </button>
              </>
            ) : currentForm === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="mx-1 underline focus:outline-none"
                >
                  Sign In
                </button>
                <button
                  onClick={toggleToAdmin}
                  className=" mx-2 underline focus:outline-none"
                >
                  Admin Signin
                </button>
              </>
            ) : (
              <>
                Going to user account?{" "}
                <button
                  onClick={toggleForm}
                  className="underline focus:outline-none"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
