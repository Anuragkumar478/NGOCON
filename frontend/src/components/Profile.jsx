import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        {/* Avatar */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-teal-500 to-orange-400 text-white rounded-full flex items-center justify-center text-4xl font-bold mb-4">
          {user.name?.charAt(0)?.toUpperCase()}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-teal-700 mb-2">{user.name}</h2>
        <p className="text-gray-500 italic mb-6">
          {user.role === "donor" ? "💖 Donor" : "🙋 Volunteer"}
        </p>

        {/* Information */}
        <div className="text-left space-y-3 bg-gray-50 rounded-xl p-6 mb-6">
          <p><strong>📧 Email:</strong> {user.email}</p>
          <p><strong>📱 Mobile:</strong> {user.mobile}</p>
          <p><strong>👤 Username:</strong> {user.username}</p>

          {user.role === "donor" ? (
            <>
              <p><strong>🎁 Donations Made:</strong> {user.donations?.length || 0}</p>
              <p><strong>💬 Message:</strong> “Giving is not just about making a donation, it’s about making a difference.”</p>

              {/* New Track Donation Button */}
              <button
                onClick={() => navigate("/track-donation")}
                className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg shadow-md hover:bg-teal-600 transition"
              >
                📦 Track Your Donation
              </button>
            </>
          ) : (
            <>
              <p><strong>🤝 Volunteering Hours:</strong> {user.hours || 0}</p>
              <p><strong>💬 Message:</strong> “The best way to find yourself is to lose yourself in the service of others.”</p>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              navigate("/");
              window.location.reload();
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
