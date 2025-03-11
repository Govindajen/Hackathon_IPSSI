import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <h1 className="text-xl font-bold">Twitter Clone</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/profile" className="mx-2">Profil</Link>
        <button onClick={() => {dispatch(logout())}}>Logout <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
      </div>
    </nav>
  );
};

export default Navbar;
