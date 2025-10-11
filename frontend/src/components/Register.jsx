// src/components/Register.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-500 to-orange-400 text-white px-4">
      <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-8 text-teal-600">Register As</h2>

        <div className="flex flex-col space-y-5">
          <button
            onClick={() => navigate("/register/ngo")}
            className="bg-gradient-to-r from-teal-500 to-orange-400 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            🏢 Register as NGO
          </button>

          <button
            onClick={() => navigate("/register/donor")}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            💖 Register as Donor
          </button>

          <button
            onClick={() => navigate("/register/volunteer")}
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            🙋 Register as Volunteer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
