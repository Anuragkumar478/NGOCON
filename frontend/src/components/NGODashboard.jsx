import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NGODashboard = () => {
  const navigate = useNavigate();
  const [ngo, setNgo] = useState(null);
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [utilization, setUtilization] = useState("");

  useEffect(() => {
    const loggedNgo = JSON.parse(localStorage.getItem("loggedInNGO"));
    if (!loggedNgo) {
      navigate("/ngo-login");
      return;
    }

    const allNGOs = JSON.parse(localStorage.getItem("ngos")) || [];
    const currentNgo = allNGOs.find((n) => n.email === loggedNgo.email);
    setNgo(currentNgo);
    setDonors(currentNgo?.donors || []);
  }, [navigate]);

  const handleProgress = (index, newStatus) => {
    const updatedDonors = [...donors];
    updatedDonors[index].status = newStatus;
    setDonors(updatedDonors);

    updateLocalStorage(updatedDonors);
    alert(`✅ Progress updated to "${newStatus}" for ${updatedDonors[index].name}`);
  };

  const updateLocalStorage = (updatedDonors) => {
    const allNGOs = JSON.parse(localStorage.getItem("ngos")) || [];
    const updatedNGOs = allNGOs.map((n) =>
      n.email === ngo.email ? { ...n, donors: updatedDonors } : n
    );
    localStorage.setItem("ngos", JSON.stringify(updatedNGOs));
    localStorage.setItem("loggedInNGO", JSON.stringify({ ...ngo, donors: updatedDonors }));
  };

  const handleTrackSubmit = () => {
    if (!utilization.trim()) {
      alert("Please fill in the utilization details.");
      return;
    }

    const updatedDonors = donors.map((donor) =>
      donor.name === selectedDonor.name
        ? { ...donor, utilization }
        : donor
    );

    setDonors(updatedDonors);
    updateLocalStorage(updatedDonors);
    setSelectedDonor(null);
    setUtilization("");

    alert("✅ Fund utilization details submitted successfully!");
  };

  if (!ngo) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 py-16 px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-teal-700 mb-4">
          Welcome, {ngo.name}
        </h2>
        <p className="text-gray-600 mb-10">
          Here's your live donation summary and donor activity.
        </p>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-teal-600 mb-6">
            Recent Donors 💖
          </h3>

          {donors.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No donors yet. Once people donate, they’ll appear here.
            </p>
          ) : (
            donors.map((donor, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between items-center border-b py-4"
              >
                <div className="text-center md:text-left mb-3 md:mb-0">
                  <p className="font-semibold text-lg">{donor.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{donor.amount} • {donor.date}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      donor.status === "Delivered"
                        ? "text-green-600"
                        : donor.status === "Processing"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    Status: {donor.status || "Pending"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                  <button
                    onClick={() => handleProgress(index, "Processing")}
                    className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full hover:bg-yellow-200 transition"
                  >
                    Mark Processing
                  </button>
                  <button
                    onClick={() => handleProgress(index, "Delivered")}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition"
                  >
                    Mark Delivered
                  </button>
                  <button
                    onClick={() => setSelectedDonor(donor)}
                    className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition"
                  >
                    Track
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Fund Utilization */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold text-teal-700 mb-4 text-center">
              Fund Utilization
            </h3>
            <p className="text-gray-600 mb-2 text-center">
              For donor: <strong>{selectedDonor.name}</strong>
            </p>
            <textarea
              value={utilization}
              onChange={(e) => setUtilization(e.target.value)}
              placeholder="Describe how the funds were utilized..."
              rows="5"
              className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-teal-400"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedDonor(null)}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleTrackSubmit}
                className="bg-gradient-to-r from-teal-500 to-orange-400 text-white px-6 py-2 rounded-lg hover:from-orange-500 hover:to-teal-500 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGODashboard;
