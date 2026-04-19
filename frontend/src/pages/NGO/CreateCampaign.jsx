import { useState } from "react";
import { createCampaign } from "../../services/api"; // your API function

export default function CreateCampaign() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // No need to manually send token; cookies are sent automatically
      const response = await createCampaign(formData);

      alert(response.message || "Campaign created successfully!");
      setFormData({ title: "", description: "", location: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen text-white flex justify-center bg-black py-10">
    <div className="w-full max-w-3xl p-6 bg-gray-900 rounded shadow">
      
      <h2 className="text-2xl  justify-center px-50 font-bold mb-4">Create Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Campaign Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-4 rounded "
          required
        />

        <textarea
          name="description"
          placeholder="Campaign Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-8 rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-slate-600 text-white py-2 rounded hover:bg-cyan-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Campaign"}
        </button>
         <h1 className="text-lime-300 decoration-solid-bold">"The best way to find yourself is to lose yourself in the service of others." – Mahatma Gandhi</h1>
         <h2 className="text-sky-500 decoration-amber-200">"Never doubt that a small group of thoughtful, committed citizens can change the world; indeed, it's the only thing that ever has." – Margaret Mead</h2>
      </form>

    </div>
  </div>
);
}
