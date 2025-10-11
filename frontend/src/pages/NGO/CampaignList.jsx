import { useEffect, useState } from "react";
import { getAllCampaigns } from "../../services/api";
import { Link } from "react-router-dom";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getAllCampaigns();
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">All Campaigns</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {campaigns.map((c) => (
          <div key={c._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">{c.title}</h3>
            <p className="text-gray-700">{c.description}</p>
            <p className="text-sm mt-1">Status: {c.status}</p>
            <Link
              to={`/campaigns/${c._id}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
