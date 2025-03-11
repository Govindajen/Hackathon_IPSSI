import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";

import { logout } from "../../redux/slices/authSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {createPost, fetchPosts} from "../../redux/slices/postsSlice";


import Layout from "../../components/Layout"
import Post from "../../components/Twitter";


export default function Home () {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user.user)
    const posts = useSelector(state => state.posts.posts)

    const [postContent, setPostContent] = useState({
        content: "",
    });

    const [reTweet, setReTweet] = useState({
        content: '',
        tweet: {},
    });


    useEffect(() => {
        dispatch(fetchPosts());
    }, [posts.length])

    const postsJsx = posts.map(post => {
        return (
            <Post key={post._id} post={post} />
        )
    })

    /* ------------------------------------------------------ */

    const handlePostChange = (e) => {
        setPostContent({...postContent, content: e});
    };
    
    const handlePostSubmit = () => {

        const post = {
            content: postContent.content.replace(/#[a-z0-9_]+/gi, '').trim(),
            user: user.id,
            hashtags: (postContent.content.match(/#[a-z0-9_]+/gi) || []).map(tag => tag.slice(1)),
        };

        dispatch(createPost(post));
        setPostContent({
            content: "",
        });
    };

    /* --------------------------------------------------------------------------- */
    


    return (
        <Layout>
            <div className="homeContainer">
                <div className="sidebar">
                    <div className="profileContainer">
                        <img 
                            className="contentImage" 
                            src="https://images.itnewsinfo.com/lmi/articles/grande/000000090076.jpg" 
                            alt="User profile"
                        />
                        <p className="username">{user.username}</p>
                        <p className="handle">@{user.username.toLowerCase()}</p>
                    </div>
                    <button 
                        onClick={() => dispatch(logout())} 
                        className="logout"
                    >
                        Logout <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </button>
                </div>

                <div className="splitContainer left">
                    <div className="newPostContainer">
                        <textarea
                            value={postContent.content}
                            onChange={(e) => handlePostChange(e.target.value.slice(0, 256))}
                            placeholder="What's happening?"
                            className="postInput"
                            maxLength="256"
                            aria-label="Write a new post"
                        />
                        <button 
                            onClick={handlePostSubmit} 
                            className="postButton"
                        >
                            Post
                        </button>
                    </div>

                    <hr />

                    <div className="postsContainer">
                        {postsJsx?.length ? postsJsx : <p className="noPosts">No posts yet.</p>}
                    </div>
                </div>

                <div className="splitContainer"></div>
            </div>

        </Layout>
    )
}