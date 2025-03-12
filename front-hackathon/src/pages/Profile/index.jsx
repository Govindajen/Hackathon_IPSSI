import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUser, faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Layout from "../../components/Layout";
import myAxios from "../../utils/axios";
import { logout } from "../../redux/slices/authSlice";
import "./profile.css";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams(); // Get userId from URL params
    
    // Récupérer l'utilisateur depuis le store Redux
    const user = useSelector(state => state.auth.user?.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
    // État local pour stocker les données supplémentaires du profil
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false); // State to track follow status
    
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);
    
    // Récupérer les données du profil utilisateur
    useEffect(() => {
        const fetchUserProfile = async () => {
            const id = userId || user?.id; // Use userId from URL or current user ID
            if (!id) return;
            
            try {
                setLoading(true);
                const response = await myAxios.get(`/users/${id}`);
                setUserProfile(response.data);
                setIsFollowing(response.data.followers.includes(user.id)); // Check if the user is following
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération du profil:", err);
                setError("Impossible de charger les informations du profil");
                setLoading(false);
            }
        };
        
        fetchUserProfile();
    }, [user, userId]);
    
    // Gérer la déconnexion
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    // Gérer le follow/unfollow
    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await myAxios.post(`/users/${userProfile._id}/unfollow`, { userId: user.id });
            } else {
                await myAxios.post(`/users/${userProfile._id}/follow`, { userId: user.id });
            }
            setIsFollowing(!isFollowing);
        } catch (err) {
            console.error("Erreur lors du suivi:", err);
            setError("Impossible de suivre/désuivre l'utilisateur");
        }
    };
    
    if (!user) {
        return (
            <Layout>
                <div className="profileContainer">
                    <p>Chargement du profil...</p>
                </div>
            </Layout>
        );
    }
    
    return (
        <Layout>
            <div className="profilePageContainer">
                <div className="profileHeader">
                    <h1>Mon Profil</h1>
                </div>
                
                <div className="profileContent">
                    <div className="profileCard">
                        <div className="profileAvatar">
                            <img 
                                src="https://images.itnewsinfo.com/lmi/articles/grande/000000090076.jpg" 
                                alt="Avatar de profil" 
                                className="avatarImage"
                            />
                        </div>
                        
                        <div className="profileInfo">
                            <h2 className="profileName">{userProfile?.username}</h2>
                            <p className="profileHandle">@{userProfile?.username.toLowerCase()}</p>

                            <p className="followP">Followers: <span> {userProfile.followers.length} </span></p>
                            <p className="followP">Following: <span> {userProfile.following.length} </span></p>
                            
                            <div className="profileDetails">
                                <div className="detailItem">
                                    <FontAwesomeIcon icon={faUser} className="detailIcon" />
                                    <span>Nom d'utilisateur: {userProfile?.username}</span>
                                </div>
                                
                                <div className="detailItem">
                                    <FontAwesomeIcon icon={faEnvelope} className="detailIcon" />
                                    <span>Email: {userProfile?.email}</span>
                                </div>
                                
                                <div className="detailItem">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="detailIcon" />
                                    <span>Date d'inscription: {userProfile ? new Date(userProfile.createdAt).toLocaleDateString() : "Chargement..."}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="profileActions">
                        {userProfile && userProfile._id !== user.id && (
                            <button 
                                onClick={handleFollow} 
                                className="followButton"
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        )}
                        <button 
                            onClick={handleLogout} 
                            className="logoutButton"
                        >
                            Déconnexion <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </button>
                    </div>
                </div>
                
                {loading && (
                    <div className="loadingIndicator">
                        <p>Chargement des informations...</p>
                    </div>
                )}
                
                {error && (
                    <div className="errorMessage">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}