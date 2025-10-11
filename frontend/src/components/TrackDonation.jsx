import React, { useEffect, useState } from "react";

const TrackDonation = () => {
  const [user, setUser] = useState(null);
  const [ngoData, setNgoData] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) return;

    setUser(loggedUser);

    const ngos = JSON.parse(localStorage.getItem("ngos")) || [];
    const donations = ngos.flatMap((ngo) =>
      (ngo.donors || [])
        .filter((donor) => donor.name === loggedUser.name)
        .map((d) => ({ ...d, ngoName: ngo.name }))
    );

    setNgoData(donations);
  }, []);

  if (!user)
    return <p className="text-center mt-20 text-gray-600">Please log in to track your donations.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-16 px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Donation Tracking
        </h2>

        {ngoData.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t made any donations yet.
          </p>
        ) : (
          ngoData.map((donation, i) => (
            <div key={i} className="border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold text-teal-600">
                NGO: {donation.ngoName}
              </h3>
              <p className="text-gray-700">Amount: ₹{donation.amount}</p>
              <p className="text-gray-700">Date: {donation.date}</p>
              <p
                className={`mt-2 font-medium ${
                  donation.status === "Delivered"
                    ? "text-green-600"
                    : donation.status === "Processing"
                    ? "text-yellow-600"
                    : "text-gray-500"
                }`}
              >
                Status: {donation.status || "Pending"}
              </p>
              <p className="mt-2 text-gray-600 italic">
                {donation.utilization
                  ? `📝 NGO Report: ${donation.utilization}`
                  : "No utilization details added yet."}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrackDonation;
