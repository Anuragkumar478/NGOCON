import React, { useState } from "react";
import { registerNGO } from "../../services/api";

const RegisterNGO = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    category: "",
    localContactNumber: "",
    website: "",
    address: "",
    profileImage: null,
    govtDocument: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      const response = await registerNGO(data);
      alert("NGO registered successfully!");
      console.log(response);

      setFormData({
        name: "",
        email: "",
        password: "",
        description: "",
        category: "",
        localContactNumber: "",
        website: "",
        address: "",
        profileImage: null,
        govtDocument: null,
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Register Your NGO
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="NGO Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            required
          >
            <option value="">Select Category</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Environment">Environment</option>
            <option value="Women Empowerment">Women Empowerment</option>
            <option value="Animal Welfare">Animal Welfare</option>
            <option value="Community Development">Community Development</option>
            <option value="Disaster Relief">Disaster Relief</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="localContactNumber"
            placeholder="Contact Number"
            value={formData.localContactNumber}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />

          <input
            type="text"
            name="website"
            placeholder="Website URL"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />

          {/* File Uploads */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              NGO Image
            </label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Govt Verified Document
            </label>
            <input
              type="file"
              name="govtDocument"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              className="w-full text-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register NGO"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegisterNGO;