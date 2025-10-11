import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCampaignDetails,
  registerVolunteerToCampaign,
  addDonationToCampaign,
} from "../../services/api";

export default function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  // Volunteer
  const [volunteerId, setVolunteerId] = useState("");

  // Donation
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getCampaignDetails(id);
      setCampaign(data);
    };
    fetchDetails();
  }, [id]);

  // Volunteer registration handler
  const handleRegisterVolunteer = async () => {
    try {
      await registerVolunteerToCampaign(id, volunteerId);
      alert("Registered as volunteer successfully!");
      setVolunteerId(""); // Clear input
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // Donation handler
  const handleDonate = async () => {
    if (!donorName || !donorEmail || !donationAmount) {
      alert("Please fill all donation details");
      return;
    }

    try {
      await addDonationToCampaign(id, {
        name: donorName,
        email: donorEmail,
        amount: Number(donationAmount),
      });
      alert("Donation successful!");
      setDonorName("");
      setDonorEmail("");
      setDonationAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Donation failed");
    }
  };

  if (!campaign) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
      <p className="text-gray-700 mb-4">{campaign.description}</p>
      <p className="mb-4">Status: {campaign.status}</p>

      {/* Volunteer Registration */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Register as Volunteer</h3>
        <input
          type="text"
          placeholder="Volunteer ID"
          value={volunteerId}
          onChange={(e) => setVolunteerId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleRegisterVolunteer}
          className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>

      {/* Donation Form */}
      <div>
        <h3 className="font-semibold mb-2">Donate to Campaign</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Donation Amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleDonate}
          className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
        >
          Donate
        </button>
      </div>
    </div>
  );
}
