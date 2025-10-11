import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NGOLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefillEmail = new URLSearchParams(location.search).get("email") || "";

  const [email, setEmail] = useState(prefillEmail);
  const [contact, setContact] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedNGOs = JSON.parse(localStorage.getItem("ngos")) || [];
    const foundNGO = storedNGOs.find(
      (n) => n.email === email && n.contact === contact
    );

    if (foundNGO) {
      localStorage.setItem("loggedInNGO", JSON.stringify(foundNGO));
      navigate("/ngo-dashboard");
    } else {
      alert("Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 to-orange-100 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-4">
          NGO Login
        </h2>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Enter your Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-orange-400 text-white py-3 rounded-full font-semibold hover:from-orange-500 hover:to-teal-500 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default NGOLogin;
