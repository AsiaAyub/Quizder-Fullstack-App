import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

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
          setError("Failed to fetch user data");
          return;
        }

        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        setError("An error occurred while fetching user data");
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

  useEffect(() => {
    const isAdmin = async () => {
      const response = await fetch("http://localhost:5252/users/isadmin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const isAdmin = await response.json();
      return isAdmin;
    };

    if (buttonClicked) {
      const fetchData = async () => {
        try {
          const isAdminResult = await isAdmin();
          console.log(isAdminResult);
          setUserIsAdmin(isAdminResult);
          console.log(userIsAdmin);

          if (isAdminResult) {
            const dataToSend = {
              token: token,
              username: userData.userName,
            };
            navigate("/Riddles", { state: { data: dataToSend } });
          } else {
            alert(
              "You are currently logged in as user. Please provide ADMIN credentials to access this page."
            );
            console.log("here");
            navigate("/adminLogin");
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          // Handle error
        }
      };

      fetchData();
    }
  }, [buttonClicked]);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  const navigate = useNavigate();

  const nextPage = () => {
    const dataToSend = {
      userName: userData?.userName,
      token: token,
    };
    navigate("/questions", { state: { data: dataToSend } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to login page
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className=" w-screen bg-blend-luminosity h-screen bg-[url('/assets/images/welcomeImg.jpg')]">
        <div className="flex justify-end p-1 bg-opacity-40 bg-black w-screen">
          <button
            className="mr-14 text-sm bg-black w-28 h-8 border-2 mt-2 border-cyan-500 rounded hover:bg-blue-900 text-white"
            onClick={handleButtonClick}
          >
            Go To Riddles
          </button>
          <div className="w-fit h-fit mx-4 mt-1">
            <img
              src="\assets\images\user.png"
              alt="image"
              className="w-7 h-7"
              onClick={handleProfile}
            />
            {userData ? (
              <p className="text-xs font-extrabold text-center">
                {userData.userName}
              </p>
            ) : (
              <p>Not Loged In</p>
            )}
          </div>

          <button
            className="text-sm w-28 h-8 text-white focus:outline-none"
            onClick={handleLogout}
          >
            <img
              src="\assets\images\logout.png"
              alt="img"
              className="w-7 h-7 m-auto"
            />
            Logout
          </button>
        </div>

        <div className="text-white absolute bg-black bg-opacity-75 my-32 mx-10 w-fit md:w-3/4 lg:w-3/4 h-fit p-10">
          <h1 className=" font-extrabold text-4xl">
            Welcome To <span className="text-cyan-400">Quizder</span>
          </h1>
          <hr className="border-cyan-400 border-2" />
          <p className="pt-6">
            This is Quizder quize. You will get 5 random general knowledge
            questions on each ATTEMPT. Once you finish, your results will be
            displayed on next page. Click get started to proceed. All the best.
          </p>
          <div className="flex justify-end">
            <button
              className="bg-cyan-400 w-32 h-10 rounded-full my-5 lg:my-9 hover:bg-blue-900"
              onClick={nextPage}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
