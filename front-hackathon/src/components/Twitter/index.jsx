import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowsSpin, faBookmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Removed unused import
import CommentsModal from "./comments";
import myAxios from "../../utils/axios";
import { fetchPosts } from "../../redux/slices/postsSlice";
import { useState } from "react";

export default function Post ({keyD, post, retweetsFunction}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user.user)
    const users = useSelector(state => state.auth.users)
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const isUser = post.user && user.id === post.user._id

    const handleLike = async () => {
        //dispatch(likePost({ id: post._id, userId: user.id, unlike: post.likes.includes(user.id) }));

        const response = await myAxios.put(`/tweets/${post._id}/like`, { userId: user.id} );

        if (response.status === 200) {
            dispatch(fetchPosts());
        }
        
    }

    const handleDelete = async () => {
        const response = await myAxios.delete(`/tweets/${post._id}`);
        console.log(response)

        if (response.status === 200) {
            dispatch(fetchPosts());
        }
    }

    const handleUserClick = () => {
        navigate(`/profil/${post.user._id}`); // Navigate to the profile page with user ID
    }

    return (
        <div key={keyD} className="post">
            <p className="user" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
                 @{post.user.username}
                </p>
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
                <CommentsModal comments={post.commentaire} postId={post._id} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
                <p><FontAwesomeIcon icon={faBookmark} /> {post.signet}</p>
            </div>
            {
                post.retweets ? 
                        <div key={keyD} className="post">
                            {post.retweets.user && <p className="user">  @{post.retweets.user.username}</p>}
                            {post.retweets.content && <div className="content">
                                <p>{post.retweets.content}</p>
                            </div>}
                            {post.retweets.hashtags && <p className="hashtags">{post.retweets.hashtags.map(hashtag => `#${hashtag}`).join(' ')}</p>}
                        </div>
                : null
            }
            <div className="delete">
                {isUser ? <p onClick={() => {handleDelete}}><FontAwesomeIcon icon={faTrash} /></p> : null}
            </div>
        </div>
    )
}