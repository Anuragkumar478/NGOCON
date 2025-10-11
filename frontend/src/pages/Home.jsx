import React, { useEffect, useState } from "react";
import {
  getAllNGOs,
  getNGOsByCategory,
  getNGODetails,
  addFeedback,
} from "../services/api"; // <-- Make sure path is correct

const Home = () => {
  const [ngos, setNgos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    rating: "",
    comment: "",
  });

  // 🧠 Load all NGOs initially
  useEffect(() => {
    fetchAllNgos();
  }, []);

  const fetchAllNgos = async () => {
    const data = await getAllNGOs();
    setNgos(data);
    setCategories(["All", ...new Set(data.map((n) => n.category))]);
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      fetchAllNgos();
    } else {
      const data = await getNGOsByCategory(category);
      setNgos(data);
    }
  };

  const handleViewDetails = async (ngoId) => {
    const data = await getNGODetails(ngoId);
    setSelectedNgo(data);
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedNgo) return;
    await addFeedback(selectedNgo._id, feedbackForm);
    const updatedNgo = await getNGODetails(selectedNgo._id);
    setSelectedNgo(updatedNgo);
    setFeedbackForm({ name: "", email: "", rating: "", comment: "" });
    alert("Feedback added successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🏷️ Category Buttons */}
      <div className="flex flex-wrap justify-center mb-6 gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🧩 NGO Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {ngos.map((ngo) => (
          <div
            key={ngo._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
           <img
  src={
    ngo.profileImage
      ? `http://localhost:5000/${ngo.profileImage}`
      : "https://via.placeholder.com/250"
  }
  alt={ngo.name}
/>

            <div className="p-4">
              <h2 className="text-xl font-bold">{ngo.name}</h2>
              <p className="text-gray-600 mt-1">{ngo.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                📞 {ngo.contactNumber || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                🌐 {ngo.website || "N/A"}
              </p>
              <p className="mt-2 text-yellow-600 font-medium">
                ⭐ {ngo.averageRating?.toFixed(1) || "0"} / 5
              </p>
              <div className="mt-3 flex justify-between">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleViewDetails(ngo._id)}
                >
                  View Details
                </button>
                <button
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    onClick={() => handleDonate(ngo._id)}
  >
    Donate
  </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📝 NGO Details Modal */}
      {selectedNgo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-2">{selectedNgo.name}</h2>
            <p className="text-gray-700 mb-2">{selectedNgo.description}</p>
            <p className="text-gray-600 mb-1">
              📍 {selectedNgo.address || "No address"}
            </p>
            <p className="text-gray-600 mb-1">
              📞 {selectedNgo.contactNumber || "No number"}
            </p>
            <p className="text-gray-600 mb-2">
              🌐 {selectedNgo.website || "No website"}
            </p>
            <p className="text-yellow-600 font-medium mb-2">
              ⭐ {selectedNgo.averageRating?.toFixed(1) || "0"} / 5
            </p>
             <div className="mb-4">
              <button
                onClick={() => handleDonate(selectedNgo._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              >
                Donate to {selectedNgo.name}
              </button>
            </div>

            {/* 🧾 Feedbacks */}
            <h3 className="font-semibold text-lg mt-4">Feedbacks</h3>
            {selectedNgo.feedbacks.length > 0 ? (
              selectedNgo.feedbacks.map((f, idx) => (
                <div key={idx} className="mt-2 border-b pb-2">
                  <p className="text-sm font-semibold">
                    {f.userName || f.name} ({f.rating}⭐)
                  </p>
                  <p className="text-gray-600">{f.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No feedback yet.</p>
            )}

            {/* ✍️ Feedback Form */}
            <div className="mt-5 border-t pt-3">
              <h4 className="font-semibold mb-2">Add Your Feedback</h4>
              <input
                type="text"
                placeholder="Your Name"
                value={feedbackForm.name}
                onChange={(e) =>
                  setFeedbackForm({ ...feedbackForm, name: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={feedbackForm.email}
                onChange={(e) =>
                  setFeedbackForm({ ...feedbackForm, email: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                value={feedbackForm.rating}
                min="1"
                max="5"
                onChange={(e) =>
                  setFeedbackForm({ ...feedbackForm, rating: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <textarea
                placeholder="Write your feedback..."
                value={feedbackForm.comment}
                onChange={(e) =>
                  setFeedbackForm({ ...feedbackForm, comment: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              ></textarea>
              <button
                onClick={handleFeedbackSubmit}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Submit Feedback
              </button>
            </div>

            {/* ❌ Close Button */}
            <div className="mt-4 text-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setSelectedNgo(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
