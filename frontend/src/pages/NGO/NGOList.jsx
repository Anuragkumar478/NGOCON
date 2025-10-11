import { useEffect, useState } from "react";
import { getAllNGOs } from "../../services/api";

export default function NGOList() {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const data = await getAllNGOs();
        setNgos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNGOs();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h2>All NGOs</h2>
      {ngos.length === 0 ? (
        <p>No NGOs registered yet.</p>
      ) : (
        <ul>
          {ngos.map((ngo) => (
            <li key={ngo._id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc" }}>
              <h3>{ngo.name}</h3>
              <p>{ngo.email}</p>
              <p>{ngo.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
