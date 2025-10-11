import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NGORegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    username: "",
    address: "",
    aim: "",
    contact: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedNGOs = JSON.parse(localStorage.getItem("ngos")) || [];
    storedNGOs.push(formData);
    localStorage.setItem("ngos", JSON.stringify(storedNGOs));

    alert("NGO Registered Successfully!");
    navigate("/ngos"); // redirect to NGO list page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 to-orange-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-4">
          Register as NGO
        </h2>

        <input
          type="text"
          name="name"
          placeholder="NGO Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (Education, Health, etc.)"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <textarea
          name="aim"
          placeholder="What is your NGO's aim?"
          value={formData.aim}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        ></textarea>
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-full font-semibold hover:bg-orange-500 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NGORegister;
