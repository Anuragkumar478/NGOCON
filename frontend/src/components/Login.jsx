// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "donor",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        (u.username === formData.username || u.email === formData.username) &&
        u.password === formData.password &&
        u.role === formData.role
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert(`Welcome back, ${user.name}!`);
      navigate("/");
    } else {
      alert("Invalid credentials or role mismatch.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 to-orange-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
            required
          />

          <div className="flex justify-between items-center border rounded-lg p-3">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="role"
                value="donor"
                checked={formData.role === "donor"}
                onChange={handleChange}
              />
              Donor
            </label>

            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="role"
                value="volunteer"
                checked={formData.role === "volunteer"}
                onChange={handleChange}
              />
              Volunteer
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-orange-400 text-white p-3 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          New user?{" "}
          <Link
            to="/register"
            className="text-teal-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
