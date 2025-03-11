import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";

import { logout } from "../../redux/slices/authSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {createPost, fetchPosts, repost} from "../../redux/slices/postsSlice";


import Layout from "../../components/Layout"
import Post from "../../components/Twitter";


export default function Home () {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user.user)
    const posts = useSelector(state => state.posts.posts)

    const [postTemp, setPostTemp] = useState(posts);

    useEffect(() => {
        setPostTemp(posts);
    }, [posts]);


    const [postContent, setPostContent] = useState({
        content: "",
    });

    const [reTweet, setReTweet] = useState({
        content: '',
        tweet: {},
    });

    function handleRetweet (tweet) {
        setReTweet({
            content: "",
            tweet: tweet,
        });
    }


    useEffect(() => {
        dispatch(fetchPosts());
    }, [posts.length])

    const postsJsx = [...postTemp].reverse().map(post => {
        return (
            <Post keyD={post._id} post={post} retweetsFunction={handleRetweet}/>
        )
    })

    /* ------------------------------------------------------ */

    const handlePostChange = (e) => {
        setPostContent({...postContent, content: e});
    };
    
    const handlePostSubmit = () => {

        if (postContent.content === "") {
            return;
        }

        const post = {
            content: postContent.content.replace(/#[a-z0-9_]+/gi, '').trim(),
            user: user.id,
            retweets: null,
            hashtags: (postContent.content.match(/#[a-z0-9_]+/gi) || []).map(tag => tag.slice(1)),
        };

        dispatch(createPost(post));
        setPostContent({
            content: "",
        });
    };

    const handleRepostSubmit = () => {

        if (reTweet.content === "") {
            return;
        }

        const post = {
            content: reTweet.content.replace(/#[a-z0-9_]+/gi, '').trim(),
            user: user.id,
            retweets: reTweet.tweet._id,
            hashtags: (reTweet.content.match(/#[a-z0-9_]+/gi) || []).map(tag => tag.slice(1)),
        };

        dispatch(repost(post));
        setReTweet({
            content: "",
            tweet: {},
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
                {(reTweet && reTweet.tweet._id) ? (
                    <div className="retweetContainer">
                        {/* Original tweet information display */}
                        <div className="originalTweetInfo">
                            <div className="retweetHeader">
                                <span className="retweetIcon">🔁</span>
                                <span className="retweetLabel">Reposter</span>
                            </div>
                            <div className="originalTweetContent">
                                <div className="tweetAuthor">
                                    <span className="authorName">{reTweet.tweet.user?.name || "User"}</span>
                                    <span className="authorUsername">@{reTweet.tweet.user?.username || "username"}</span>
                                </div>
                                <p className="tweetText">{reTweet.tweet.content}</p>
                                {reTweet.tweet.media && (
                                    <img 
                                        src={reTweet.tweet.media} 
                                        alt="Tweet media" 
                                        className="tweetMedia" 
                                    />
                                )}
                                <div className="tweetMeta">
                                    <span className="tweetDate">{new Date(reTweet.tweet.date).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Retweet comment input */}
                        <div className="newPostContainer">
                            <textarea
                            value={setReTweet.content}
                            onChange={(e) => setReTweet({...reTweet, content: e.target.value.slice(0, 256)})}
                                placeholder="Add a comment..."
                                className="postInput retweetComment"
                                maxLength="256"
                                aria-label="Add a comment to your retweet"
                            />
                            <span className="retweetButtons">
                                <button 
                                    onClick={() => handleRetweet({})} 
                                    className="postButton"
                                    >
                                    Annuller
                                </button>
                                <button 
                                    onClick={handleRepostSubmit} 
                                    className="postButton"
                                    >
                                    Reposter
                                </button>
                            </span>
                        </div>
                    </div>
                ) : (
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
                )}

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