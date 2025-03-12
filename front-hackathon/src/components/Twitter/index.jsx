import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowsSpin, faBookmark, faTrash, faComment} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { likePost } from "../../redux/slices/postsSlice";
import CommentsModal from "./comments";
import myAxios from "../../utils/axios";
import { fetchPosts } from "../../redux/slices/postsSlice";

export default function Post ({keyD, post, retweetsFunction}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user.user)
    const navigate = useNavigate(); // Initialize useNavigate

    const isUser = user.id === post.user._id

    const handleLike = async () => {
        //dispatch(likePost({ id: post._id, userId: user.id, unlike: post.likes.includes(user.id) }));

        const response = await myAxios.put(`/tweets/${post._id}/like`, { userId: user.id} );

        if (response.status === 200) {
            dispatch(fetchPosts());
        }
        
    }

    const handleUserClick = () => {
        navigate(`/profil/${post.user._id}`); // Navigate to the profile page with user ID
    }

    return (
        <div key={keyD} className="post">
            <p className="user" onClick={handleUserClick} style={{ cursor: 'pointer' }}> {post.user.username}</p>
            <div className="content">
                <p>{post.content}</p>
            </div>
            <p className="hashtags">{post.hashtags.map(hashtag => `#${hashtag}`).join(' ')}</p>
            <div className="icons">
                <p onClick={() => {handleLike()}} >
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        style={{ color: post.likes.includes(user.id) ? 'red' : '#e1e8ed' }} 
                    /> 
                    {post.likes.length}
                </p>
                <p onClick={() => {retweetsFunction(post)}}>
                    <FontAwesomeIcon icon={faArrowsSpin} /> 
                    {post.retweets ? post.retweets.length : 0}
                </p>
                <CommentsModal />
                <p><FontAwesomeIcon icon={faBookmark} /> {post.signet}</p>
            </div>
            {
                post.retweets ? 
                        <div key={keyD} className="post">
                            <p className="user"> {post.retweets.user.username}</p>
                            <div className="content">
                                <p>{post.retweets.content}</p>
                            </div>
                            <p className="hashtags">{post.retweets.hashtags.map(hashtag => `#${hashtag}`).join(' ')}</p>
                            <div className="icons">
                                <p>
                                    <FontAwesomeIcon 
                                        icon={faHeart} 
                                        style={{ color: post.retweets.likes.includes(user.id) ? 'red' : '#e1e8ed' }} 
                                    /> 
                                    {post.retweets.likes.length}
                                </p>
                            </div>
                            <div className="delete">
                                {isUser ? <p><FontAwesomeIcon icon={faTrash} /></p> : null}
                            </div>
                        </div>
                : null
            }
            <div className="delete">
                {isUser ? <p><FontAwesomeIcon icon={faTrash} /></p> : null}
            </div>
        </div>
    )
}