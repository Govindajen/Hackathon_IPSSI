// components/Twitter/index.jsx

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faArrowsSpin,
    faBookmark,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CommentsModal from "./comments";
import myAxios from "../../utils/axios";
import { fetchPosts } from "../../redux/slices/postsSlice";
import { useState } from "react";



export default function Post({ keyD, post, retweetsFunction, detectEmotion }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user.user);
    const users = useSelector((state) => state.auth.users);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Vérification et récupération du créateur du tweet
    const postCreatedBy = post.user && users.find((u) => u._id === post.user._id);

    const handleLike = async () => {
        //dispatch(likePost({ id: post._id, userId: user.id, unlike: post.likes.includes(user.id) }));

        const response = await myAxios.put(`/tweets/${post._id}/like`, {
            userId: user.id,
        });

        if (response.status === 200) {
            dispatch(fetchPosts());
        }
    };

    const handleDelete = async () => {
        try {
            const response = await myAxios.delete(`/tweets/${post._id}`);
            if (response.status === 200) {
                dispatch(fetchPosts());
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }

    };

    const handleBookmark = async () => {
        const response = await myAxios.post(`/tweets/${post._id}/bookmark`, { userId: user.id });

        if (response.status === 200) {
            dispatch(fetchPosts());
        }
    };

    const handleUserClick = () => {
        if (post.user && post.user._id) {
            navigate(`/profil/${post.user._id}`);
        }
    };

    const handleDetectEmotion = async (postId) => {
        const emotion = await detectEmotion();
        const response = await myAxios.put(`/emotions/${user.id}`, { post: postId, emotion: emotion });
        console.log(response)
    }

    return (
        <div className="post">
            <p className="user" onClick={handleUserClick} style={{ cursor: "pointer" }}>
                {post.user && typeof post.user.username === "string"
                    ? postCreatedBy.username
                    : "Unknown User"}
            </p>
            <div className="content">
                {post.content && <p>{post.content}</p>}
                {post.media && (
                    <img
                        src={post.media}
                        alt="Tweet media"
                        className="tweetMedia"
                        style={{ maxWidth: "100%", height: "auto", marginTop: "8px" }}
                    />
                )}
            </div>
            {post.hashtags && post.hashtags.length > 0 && (
                <p className="hashtags">
                    {post.hashtags.map((hashtag) => `#${hashtag}`).join(" ")}
                </p>
            )}
            <div className="icons">
                <p onClick={handleLike}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: post.likes.includes(user.id) ? "red" : "#e1e8ed" }}
                    />{" "}
                    {post.likes.length}
                </p>
                <p onClick={() => retweetsFunction(post)}>
                    <FontAwesomeIcon icon={faArrowsSpin} />{" "}
                    {post.retweets ? post.retweets.length : 0}
                </p>
                <CommentsModal
                    comments={post.commentaire}
                    postId={post._id}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                />
                <p onClick={() => {handleBookmark()}}>
                    <FontAwesomeIcon icon={faBookmark} style={{ color: post.signet.includes(user.id) ? 'gold' : '#e1e8ed' }} /> 
                    {post.signet.length}
                </p>
                <button className="btn-camera" onClick={() => {handleDetectEmotion(post._id)}}>Caméra</button>
            </div>
            {post.retweets && (
                <div className="post retweet">
                    {post.retweets.user && (
                        <p className="user">{post.retweets.user.username}</p>
                    )}
                    {post.retweets.content && (
                        <div className="content">
                            <p>{post.retweets.content}</p>
                        </div>
                    )}
                    {post.retweets.hashtags && (
                        <p className="hashtags">
                            {post.retweets.hashtags.map((hashtag) => `#${hashtag}`).join(" ")}
                        </p>
                    )}
                    {post.retweets.media && (
                        <img
                            src={post.retweets.media}
                            alt="Retweet media"
                            className="tweetMedia"
                            style={{ maxWidth: "100%", height: "auto", marginTop: "8px" }}
                        />
                    )}
                </div>
            )}
            <div className="delete">
                {post.user && user.id === post.user._id && (
                    <p onClick={handleDelete} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faTrash} />
                    </p>
                )}
            </div>
        </div>
    );
}
