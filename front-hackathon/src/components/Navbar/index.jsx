import { Link } from "react-router-dom";
import NotifDropdown from "./Notif";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();


  return (
    <nav className="navbar">
      <h1 className="text-xl font-bold" onClick={() => {navigate('/home')}} style={{"cursor": "pointer"}}>MySocialMedia</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/profil" className="mx-2">Profil</Link>
      </div>
      
    </nav>
  );
};

export default Navbar;
