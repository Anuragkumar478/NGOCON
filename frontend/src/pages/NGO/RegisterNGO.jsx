import React, { useState } from "react";
import { registerNGO } from "../../services/api";

const RegisterNGO = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    category: "",
    localContactNumber: "", // match backend
    website: "",
    address: "",
    profileImage: null, // matches backend
    govtDocument: null,  // matches backend
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] }); // store File object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData();
      // Append fields to FormData
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("localContactNumber", formData.localContactNumber);
      data.append("website", formData.website);
      data.append("address", formData.address);
      if (formData.profileImage) data.append("profileImage", formData.profileImage);
      if (formData.govtDocument) data.append("govtDocument", formData.govtDocument);

      const response = await registerNGO(data); // call backend API
      alert("NGO registered successfully!");
      console.log(response);

      // Reset form
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Register Your NGO</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="NGO Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category (Education, Health, etc.)"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="localContactNumber"
          placeholder="Contact Number"
          value={formData.localContactNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="website"
          placeholder="Website URL"
          value={formData.website}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* File Uploads */}
        <label className="block">
          NGO Image:
          <input
            type="file"
            name="profileImage" // must match backend
            accept="image/*"
            onChange={handleChange}
            className="mt-1"
          />
        </label>
        <label className="block">
          Govt Verified Document:
          <input
            type="file"
            name="govtDocument" // must match backend
            accept=".pdf,.jpg,.png"
            onChange={handleChange}
            className="mt-1"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register NGO"}
        </button>
      </form>
    </div>
  );
};

export default RegisterNGO;
