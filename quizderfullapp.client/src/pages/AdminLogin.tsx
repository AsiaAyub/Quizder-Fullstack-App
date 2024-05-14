import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdminLoginState {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  let data: any = null;
  let user: any = null;

  const riddlesPage = (tokn: string, user: any) => {
    const dataToSend = {
      token: tokn,
      username: user,
    };
    navigate("/Riddles", { state: { data: dataToSend } });
  };

  const [formData, setFormData] = useState<AdminLoginState>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);

      let response: Response | null = null;

      response = await fetch("http://localhost:5252/users/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formJson),
      });

      if (!response.ok) {
        console.log("Unauthorized: Incorrect username or password.");
        alert("Incorrect admin username or password.");
        return;
      }
      data = await response.json();

      // Store token in local storage
      localStorage.setItem("authToken", data.token);

      try {
        const userResponse = await fetch(
          "http://localhost:5252/users/getUser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: data.token ? `Bearer ${data.token}` : "",
            },
          }
        );

        if (!userResponse.ok) {
          console.log("Failed to fetch user data");
          return;
        }

        user = await userResponse.json();
        console.log(user);
        setUserData(user);
      } catch (error) {
        console.log("An error occurred while fetching user data");
      }

      alert("You have successfully signed in.");

      riddlesPage(data.token, user.userName);
    } catch (error) {
      console.log(error);
    }
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
          <h1 className="text-center text-xl font-bold">Admin Sign In</h1>
          <h3 className="text-sm text-cyan-500">
            Please insert your email and password
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="text-white">
          <div>
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              variant="standard"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-cyan-900 text-black w-32 h-10 rounded-full mt-4 hover:bg-blue-900"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
