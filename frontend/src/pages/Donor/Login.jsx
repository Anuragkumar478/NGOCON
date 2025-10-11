import { useState, useContext } from "react";
import { loginDonor } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginDonor(form);
      setUser(data);
      navigate("/donor/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Donor Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2"/>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2"/>
        <button type="submit" className="bg-green-500 text-white p-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
