import { Link } from "react-router-dom";
import NotifDropdown from "./Notif";


const Navbar = () => {


  return (
    <nav className="navbar">
      <h1 className="text-xl font-bold">Twitter Clone</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/profil" className="mx-2">Profil</Link>
      </div>
      
    </nav>
  );
};

export default Navbar;
