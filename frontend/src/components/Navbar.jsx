import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> | 
      <Link to="/ngos/register">Register NGO</Link> | 
      <Link to="/ngos/list">All NGOs</Link>
    </nav>
  );
}
