import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUser, faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Layout from "../../components/Layout";
import myAxios from "../../utils/axios";
import FollowModal from "./followModal";
import { logout } from "../../redux/slices/authSlice";
import { fetchBookmarks } from "../../redux/slices/postsSlice"; // Import fetchBookmarks
import "./profile.scss";
import ProfileTabs from "./profileTabs";

import Post from "../../components/Twitter";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();
    
    const user = useSelector(state => state.auth.user?.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const allUsers = useSelector(state => state.auth.users);
    const bookmarks = useSelector(state => state.posts.bookmarks);
    const posts = useSelector(state => state.posts.posts);

    const userPosts = posts.filter(post => post.user._id === user.id);
    const otherUserPost = posts.filter(post => post.user._id === userId);

    const postsJsx = userPosts.reverse().map((post) => {
        return <Post key={post._id} post={post} profile={true} />
    });
    const otherUserPostsJsx = otherUserPost.reverse().map((post) => {
        return <Post key={post._id} post={post} profile={true} />
    });

    const bookmarksJsx = bookmarks.map((bookmark) => {
        return <Post key={bookmark._id} post={bookmark} profile={true} />
    });
  
    
    // État local pour stocker les données supplémentaires du profil
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false); 
    const [followersDetails, setFollowersDetails] = useState([]);
    const [followingDetails, setFollowingDetails] = useState([]);

    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            const id = userId || user?.id; 
            if (!id) return;
            
            try {
                setLoading(true);
                const response = await myAxios.get(`/users/${id}`);
                setUserProfile(response.data);
                setIsFollowing(response.data.followers.includes(user.id)); 
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération du profil:", err);
                setError("Impossible de charger les informations du profil");
                setLoading(false);
            }
        };
        
        fetchUserProfile();
    }, [user, userId]);
    
    useEffect(() => {
        if (userProfile) {
            dispatch(fetchBookmarks(userProfile._id)); // Fetch bookmarks for the user
        }
    }, [userProfile, dispatch]);
    
    const handleFollow = async () => {
        try {
            if (isFollowing) {
                const unfollow = await myAxios.post(`/users/${userProfile._id}/unfollow`, { userId: user.id });
                if (unfollow.status === 200) {
                    const response = await myAxios.get(`/users/${userProfile._id}`);
                    setUserProfile(response.data);
                }
            } else {
                const follow =  await myAxios.post(`/users/${userProfile._id}/follow`, { userId: user.id });
                if (follow.status === 200) {
                    const response = await myAxios.get(`/users/${userProfile._id}`);
                    setUserProfile(response.data);
                }
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
    
    useEffect(() => {
        if (userProfile) {
            const followers = userProfile.followers.map(followerId => {
                const user = allUsers.find(u => u._id === followerId);
                return user ? { username: user.username } : null;
            }).filter(Boolean);
    
            const following = userProfile.following.map(followingId => {
                const user = allUsers.find(u => u._id === followingId);
                return user ? { username: user.username } : null;
            }).filter(Boolean);
    
            setFollowersDetails(followers);
            setFollowingDetails(following);
        }
    }, [userProfile, allUsers]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
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
                            src="src\assets\img\image.png" 
                            alt="Avatar de profil" 
                            className="avatarImage"
                        />
                    </div>
                    
                    <div className="profileInfo">
                        {userProfile ? 
                            <>
                            <div className="bioContainer">
                                <div className="bioDetails">
                                    <span className="nameContainer">
                                        <h2 className="profileName">{userProfile?.username}</h2>
                                        <p className="profileHandle">@{userProfile?.username.toLowerCase()}</p>
                                    </span>
                                    <p className="profileHandle">{userProfile?.bio}</p>
                                </div>
                                <span className="followContainer">
                                <FollowModal
                                    followers={followersDetails}
                                    following={followingDetails}
                                    isOpen={isModalOpen}
                                    func={handleModal}
                                />

                               <div className="profileActions">
                                    {userProfile && userProfile._id === user.id && (
                                        <button className="editProfileButton" onClick={() => navigate(`/profile/${user.id}`)}>
                                            Modifier Profil
                                        </button>
                                    )}
                                    {userProfile && userProfile._id !== user.id && (
                                        <button 
                                            onClick={handleFollow} 
                                            className="followButton"
                                        >
                                            {isFollowing ? "Unfollow" : "Follow"}
                                        </button>
                                    )}
                                </div>
                                
                                <p className="followP" onClick={() => {handleModal()}}>Followers <span> {followersDetails.length} </span></p>
                                <p className="followP" onClick={() => {handleModal()}}>Following <span> {followingDetails.length} </span></p>
                                </span>
                            </div>
                            </> : null
                        }
                        
                        <div className="profileDetails">
                            <div className="detailItem">
                                <FontAwesomeIcon icon={faEnvelope} className="detailIcon" />
                                <span>Email: {userProfile?.email}</span>
                            </div>
                            
                            <div className="detailItem">
                                <FontAwesomeIcon icon={faCalendarAlt} className="detailIcon" />
                                <span>Date d'inscription: {userProfile ? new Date(userProfile.createdAt).toLocaleDateString() : "Chargement..."}</span>
                            </div>
                            <div className="buttonsContainer">
                                    <button className="legalButton" onClick={() => navigate('/legal')}>Mentions Légales</button>
                                    <button className="termsButton" onClick={() => navigate('/terms')}>Condition générales d'utilisations</button>
                                </div>
                        </div>
                    </div>
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
             {(userId == user.id) ?
                <ProfileTabs userPosts={postsJsx} bookmarks={bookmarksJsx} />
                :
                otherUserPostsJsx

             }
        </div>
    </Layout>
)
};