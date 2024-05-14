import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignInFormState {
  email: string;
  password: string;
}

const SigninForm = () => {
  const navigate = useNavigate();

  const welcomePage = () => {
    navigate("/welcome");
  };

  const [formData, setFormData] = useState<SignInFormState>({
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

      response = await fetch("http://localhost:5252/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formJson),
      });

      if (!response.ok) {
        alert("Incorrect email or password. Please try again.");
        console.log("Failure to sign in.");
        return;
      }
      const data = await response.json();

      // Store token in local storage
      localStorage.setItem("authToken", data.token);

      alert("You have successfully signed in.");

      welcomePage();
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
};

export default SigninForm;
