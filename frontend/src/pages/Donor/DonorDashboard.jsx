import { useEffect, useState } from "react";
import { getAllDonors } from "../../services/api";

const DonorDashboard = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      const data = await getAllDonors();
      setDonors(data);
    };
    fetchDonors();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">All Donors</h2>
      <ul className="space-y-2">
        {donors.map(donor => (
          <li key={donor._id} className="border p-2 rounded">
            <p><strong>Name:</strong> {donor.name}</p>
            <p><strong>Email:</strong> {donor.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonorDashboard;
