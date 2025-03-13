import { useState } from "react";
import { Link } from "react-router-dom";
import NotifDropdown from "./Notif";
import myAxios from "../../utils/axios";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("tweets");

  const handleSearch = async () => {
    try {
      const response = await myAxios.get(`/search/search`, {
        params: {
          query: searchQuery,
          type: searchType,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };


  return (
    <nav className="navbar">
      <img
        src="src\assets\img\image.png"
        alt="Site Logo"
        onClick={() => {navigate('/home')}}
        style={{ cursor: "pointer", height: "40px" }}
      />
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/profil" className="mx-2">Profil</Link>
      </div>
      <div className="searchForm">
        <input
          type="text"
          className="searchInput"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="tweets">Tweets</option>
          <option value="users">Utilisateurs</option>
          <option value="hashtags">Hashtags</option>
        </select>
        <button className="searchButton" onClick={handleSearch}>Chercher</button>
      </div>
        <NotifDropdown />
      <div className="searchResults">
        {searchResults.map((result, index) => (
          <div key={index} className="searchResultItem">
            {searchType === "users" ? (
              <Link to={`/profil/${result._id}`}>{result.username}</Link>
            ) : (
              <p>{result.content}</p>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
