import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNGO } from "../../services/api";

export default function RegisterNGO() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerNGO(formData);
      alert(`NGO Registered Successfully! Name: ${data.ngo.name}`);
      navigate("/ngos/list");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Register NGO</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" name="name" placeholder="NGO Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
