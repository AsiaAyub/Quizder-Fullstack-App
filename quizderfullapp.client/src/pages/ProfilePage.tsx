import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5252/users/getUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch user data");
          return;
        }

        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.log("An error occurred while fetching user data");
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    // Code to retrieve token from local storage, session storage, or cookies
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const handleBackButton = () => {
    window.history.back();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cover bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L2pvYjk3OS1iYWNrZ3JvdW5kLTA2XzEuanBn.jpg')]">
      <div className="lg:w-1/4 w-10/12 h-5/6 flex justify-between bg-cyan-950 bg-opacity-95">
        <div className="w-full text-center border-4">
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
            alt="login"
            className="w-full h-1/2 mx-auto"
          />
          <div className="w-full border-b-2 h-fit p-2 flex justify-between">
            <h1>UserName : </h1>
            <h1 className="text-center text-xl font-bold">
              {userData?.userName}
            </h1>
          </div>

          <div className="w-full border-b-2 h-fit p-2 flex justify-between">
            <h1>Email : </h1>
            <h1 className="text-center font-bold">{userData?.email}</h1>
          </div>
          <div className=" w-full h-fit mt-24">
            <button
              className="bg-black w-full h-12 rounded hover:bg-blue-900"
              onClick={handleBackButton}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
