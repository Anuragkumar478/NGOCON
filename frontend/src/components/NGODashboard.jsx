import React, { useEffect, useState } from "react";

// --- Utility Functions and Mock Setup ---
const seedMockData = () => {
    // यह फ़ंक्शन सुनिश्चित करता है कि डैशबोर्ड को चलाने के लिए आवश्यक मॉक डेटा localStorage में मौजूद हो।
    if (!localStorage.getItem("ngos") || !localStorage.getItem("loggedInNGO")) {
        const initialNgo = {
            name: "Helping Hands Foundation", 
            email: "hhf@ngo.org",
            category: "Education",
            address: "123 Main St",
            aim: "Educate underprivileged children",
            quote: "Knowledge is power.",
            donors: [
                // RazorpayClone से 'Completed' स्टेटस वाला एक सैंपल डोनेशन।
                { 
                    name: "Priya Sharma", 
                    amount: 1000, 
                    date: new Date().toISOString().split("T")[0], 
                    status: "Completed", 
                    utilization: "",
                },
                { 
                    name: "Rajesh Kumar", 
                    amount: 5000, 
                    date: "2024-06-15", 
                    status: "Processing",
                    utilization: "Purchased 10 new school books.",
                }
            ],
        };
        // Mock the logged-in NGO
        localStorage.setItem("loggedInNGO", JSON.stringify(initialNgo));
        
        // Mock the overall NGOs list
        localStorage.setItem("ngos", JSON.stringify([initialNgo]));
    }
};

// --- NGO Dashboard Component (उपयोगकर्ता के कोड पर आधारित) ---
const NGODashboard = () => {
  // Use local state for NGO and Donors
  const [ngo, setNgo] = useState(null);
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [utilization, setUtilization] = useState("");

  useEffect(() => {
    seedMockData(); // Mock डेटा सेट करें
    
    // Check for logged-in NGO (NGO Dashboard के लिए आवश्यक)
    const loggedNgo = JSON.parse(localStorage.getItem("loggedInNGO"));
    if (!loggedNgo) {
        // यहाँ वास्तविक ऐप में navigate("/ngo-login") होता।
        console.error("NGO not logged in.");
        return;
    }

    // Load the latest NGO data from the main list (जहाँ RazorpayClone ने अपडेट किया होगा)
    const allNGOs = JSON.parse(localStorage.getItem("ngos")) || [];
    const currentNgo = allNGOs.find((n) => n.email === loggedNgo.email);

    if (currentNgo) {
        setNgo(currentNgo);
        // Ensure donors data is set correctly with default status/utilization
        setDonors(currentNgo.donors.map(d => ({ 
            ...d, 
            status: d.status || "Completed", // Donation status is initially 'Completed' from payment clone
            utilization: d.utilization || "" 
        })) || []);
    } else {
        console.error("Current NGO data not found in 'ngos' list.");
    }
  }, []);


  const updateLocalStorage = (updatedDonors, currentNgoData) => {
    const allNGOs = JSON.parse(localStorage.getItem("ngos")) || [];
    
    const updatedNgo = { ...currentNgoData, donors: updatedDonors };

    // Update the main list of NGOs
    const updatedNGOs = allNGOs.map((n) =>
      n.email === updatedNgo.email ? updatedNgo : n
    );
    localStorage.setItem("ngos", JSON.stringify(updatedNGOs));
    
    // Update the loggedInNGO state
    localStorage.setItem("loggedInNGO", JSON.stringify(updatedNgo));
    setNgo(updatedNgo); 
  };

  // Status अपडेट करने का फ़ंक्शन
  const handleProgress = (donorToUpdate, newStatus) => {
    if (!ngo) return;
    
    const donorIndex = donors.findIndex(d => d.name === donorToUpdate.name && d.date === donorToUpdate.date && d.amount === donorToUpdate.amount);
    
    if (donorIndex === -1) return;

    const updatedDonors = [...donors];
    updatedDonors[donorIndex] = { ...updatedDonors[donorIndex], status: newStatus };
    setDonors(updatedDonors);

    updateLocalStorage(updatedDonors, ngo);
    // Custom Console output (alert() is avoided)
    console.log(`✅ Progress updated to "${newStatus}" for ${updatedDonors[donorIndex].name}`);
  };

  // Utilization डिटेल्स सबमिट करने का फ़ंक्शन
  const handleTrackSubmit = () => {
    if (!utilization.trim()) {
        console.error("Please fill in the utilization details.");
        return;
    }
    if (!selectedDonor || !ngo) return;

    const updatedDonors = donors.map((donor) =>
      (donor.name === selectedDonor.name && donor.date === selectedDonor.date && donor.amount === selectedDonor.amount)
        ? { ...donor, utilization: utilization.trim() }
        : donor
    );

    setDonors(updatedDonors);
    updateLocalStorage(updatedDonors, ngo);
    
    setSelectedDonor(null);
    setUtilization("");
    console.log("✅ Fund utilization details submitted successfully!");
  };

  if (!ngo) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl text-gray-500">Loading Dashboard...</p>
        </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
        case "Delivered":
            return "bg-green-100 text-green-700 border-green-300";
        case "Processing":
            return "bg-yellow-100 text-yellow-700 border-yellow-300";
        case "Completed":
            return "bg-blue-100 text-blue-700 border-blue-300";
        case "Pending":
        default:
            return "bg-gray-100 text-gray-500 border-gray-300";
    }
  };

  const totalRaised = donors.reduce((sum, donor) => sum + (Number(donor.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header and Summary */}
        <header className="mb-10 p-6 bg-white rounded-xl shadow-lg border-b-4 border-teal-500">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
              Welcome, {ngo.name} 👋
            </h2>
            <p className="text-lg text-teal-600 font-medium">
              Dashboard for Donor Tracking and Fund Utilization.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 items-center">
                <div className="p-3 bg-teal-50 rounded-lg shadow-inner">
                    <p className="text-sm font-medium text-gray-600">Total Funds Raised</p>
                    <p className="text-3xl font-bold text-teal-700">
                        ₹ {totalRaised.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>
        </header>

        {/* Donor Activity Table */}
        <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-8">
          <h3 className="text-2xl font-semibold text-teal-700 mb-6 flex items-center">
            Recent Donations & Donor Tracking 💖
          </h3>

          {donors.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No donors yet. Once people donate (e.g., via the Razorpay clone), they’ll appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {donors.map((donor, index) => (
                            <tr key={index} className="hover:bg-teal-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{Number(donor.amount).toLocaleString('en-IN')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(donor.status)}`}>
                                        {donor.status || "Completed"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-600 max-w-xs">
                                    {donor.utilization || <span className="italic text-gray-400">Awaiting update</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-end">
                                        <button
                                            onClick={() => handleProgress(donor, "Processing")}
                                            disabled={donor.status === "Processing" || donor.status === "Delivered"}
                                            className="bg-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-yellow-600 transition disabled:bg-gray-300"
                                        >
                                            Process
                                        </button>
                                        <button
                                            onClick={() => handleProgress(donor, "Delivered")}
                                            disabled={donor.status === "Delivered"}
                                            className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-green-600 transition disabled:bg-gray-300"
                                        >
                                            Deliver
                                        </button>
                                        <button
                                            onClick={() => { setSelectedDonor(donor); setUtilization(donor.utilization || "")}}
                                            className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-teal-700 transition"
                                        >
                                            Track
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Fund Utilization */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-3xl p-6 w-full max-w-lg transform transition-all scale-100 ease-out">
            <h3 className="text-2xl font-bold text-teal-700 mb-2 border-b pb-2">
              Update Fund Utilization 💰
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Donor: <strong className="text-teal-600">{selectedDonor.name}</strong> • Amount: ₹{Number(selectedDonor.amount).toLocaleString('en-IN')}
            </p>
            
            <label htmlFor="utilization-input" className="block text-sm font-medium text-gray-700 mb-1">
                Utilization Details (Visible to Donor)
            </label>
            <textarea
              id="utilization-input"
              value={utilization}
              onChange={(e) => setUtilization(e.target.value)}
              placeholder="Describe the impact: e.g., 'Fund utilized to provide a month's worth of food to a family of four.' "
              rows="5"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150"
            />
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {setSelectedDonor(null); setUtilization("")}}
                className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleTrackSubmit}
                disabled={!utilization.trim()}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition disabled:opacity-50"
              >
                Submit Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGODashboard;