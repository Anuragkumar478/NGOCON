import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/api";

export default function UpdateProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load existing profile
  useEffect(() => {
    async function loadProfile() {
      const data = await getProfile();
      setProfile(data);
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateProfile(profile);
    alert("Profile Updated Successfully");
    setProfile(updated);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Update Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-3"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter Name"
        />

        <input
          className="border p-2 w-full mb-3"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />

        <input
          className="border p-2 w-full mb-3"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Enter Phone"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
