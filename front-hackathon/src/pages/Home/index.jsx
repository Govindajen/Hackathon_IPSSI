// pages/Home/index.jsx
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { fetchUsers, logout } from "../../redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { createPost, fetchPosts, repost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Post from "../../components/Twitter";
import myAxios from "../../utils/axios";

import { getUser } from "../../redux/slices/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user.user);
  const userToken = useSelector((state) => state.auth.user.token);
  const posts = useSelector((state) => state.posts.posts);


  function updateUserInformations () {
    dispatch(getUser({userId: user.id,token:  userToken}));
  }


  const [postTemp, setPostTemp] = useState(posts);
  useEffect(() => {
    let emotions = user.emotions
    emotions = emotions?.filter((emotion) => emotion.post.hashtags.length > 0)
    let groupEmotions = [];
    const emotionKeys = ["angry", "disgust", "fear", "happy", "neutral", "sad", "suprise"];
    emotions?.forEach(emotion => {
        emotion.post.hashtags.forEach((hashtag) => {
            const refHashtags = groupEmotions.map(groupEmotion => groupEmotion.hashtag)
            let groupHashtag = undefined
            if (!refHashtags.includes(hashtag)) {
                groupHashtag = { hashtag, angry: 0, disgust: 0, fear: 0, happy: 0, neutral: 0, sad: 0, suprise: 0 }
            } else {
                groupHashtag = groupEmotions.filter(groupEmotion => groupEmotion.hashtag === hashtag)[0]
            }
            if (emotionKeys.includes(emotion.emotion)) {
                groupHashtag[emotion.emotion] += 1;
            }
            groupEmotions = groupEmotions.filter(groupEmotion => groupEmotion.hashtag !== hashtag)
            groupEmotions.push(groupHashtag)
        })
    });
    posts.forEach(post => {
        groupEmotions.forEach(groupEmotion => {
            if (post.hashtags.includes(groupEmotion.hashtag)) {
                const emotion = Object.keys(groupEmotion)
  // On enlève la clé "hashtag"
  .filter(key => key !== 'hashtag')
  .reduce((maxKey, currentKey) => {
    return groupEmotion[currentKey] > groupEmotion[maxKey] ? currentKey : maxKey;
  });
                let postsRef = posts.filter(postRef => {
                    post.id !== postRef.id
                })
                console.log("emotion:", emotion)
                console.log(groupEmotion)
                if (emotion === "happy") {
                    postsRef.unshift(post)
                } else if (emotion !== "neutral") {
                    postsRef.push(post)
                }
                setPostTemp(postsRef)
            }
        })
    })
    setPostTemp(posts);
  }, [posts]);

  // State pour le tweet incluant texte et fichier image
  const [postContent, setPostContent] = useState({
    content: "",
    file: null,
  });

  const [reTweet, setReTweet] = useState({
    content: "",
    tweet: {},
  });

  function handleRetweet(tweet) {
    setReTweet({
      content: "",
      tweet: tweet,
    });
  }

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [currentEmotion, setCurrentEmotion] = useState({});

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    startCamera();
  }, [dispatch]);

  const detectEmotion = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL("image/jpeg").split(",")[1];

    try {
    //   console.log(imageBase64)
      const res = await myAxios.post(`http://localhost:5000/api/detect-emotion`, { image: imageBase64 });
      // On récupère l'émotion du premier visage détecté (s'il y en a)
      if (res.data.results && res.data.results.length > 0) {
        const emotions = res.data.results[0].emotions || {}
        return Object.keys(emotions).reduce(function(a, b){ return emotions[a] > emotions[b] ? a : b });
      }
      return {};
    } catch (err) {
      console.error("Erreur détection émotion:", err);
      return {};
    }
  };

  const postsJsx = [...postTemp].reverse().map((post) => (
    <Post key={post._id} post={post} retweetsFunction={handleRetweet} detectEmotion={detectEmotion} />
  ));

  const handlePostChange = (value) => {
    setPostContent({ ...postContent, content: value });
  };

  const handleCreateNotification = async (postOwnerId, type) => {
    try {
    if (postOwnerId !== user.id) {
      const notificationData = {
      content: `${user.username} a commenté votre post`,
      type: type,
      sendby: user.id,
      sendfor: postOwnerId,
      };
      
      const response = await myAxios.post('/notifs', notificationData);
      console.log('Notification created:', response.data);
    }
    } catch (error) {
    console.error('Error creating notification:', error);
    }
  };


  const handlePostSubmit = async () => {
    // On vérifie qu'il y a du texte ou une image
    if (postContent.content === "" && !postContent.file) {
      return;
    }

    let mediaUrl = null;
    // Si un fichier image est sélectionné, on l'upload
    if (postContent.file) {
      const formData = new FormData();
      formData.append("file", postContent.file);
      try {
        const uploadResponse = await myAxios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        mediaUrl = uploadResponse.data.url;
      } catch (error) {
        console.error("Erreur d'upload:", error);
        return;
      }
    }

    const tweet = {
      content: postContent.content.replace(/#[a-z0-9_]+/gi, '').trim(),
      user: user.id,
      retweets: null,
      hashtags:
        (postContent.content.match(/#[a-z0-9_]+/gi) || []).map((tag) =>
          tag.slice(1)
        ),
      media: mediaUrl,
    };

    dispatch(createPost(tweet));
    handleCreateNotification(tweet.user, "post");
    setPostContent({ content: "", file: null });
  };

  const handleRepostSubmit = () => {
    if (reTweet.content === "") {
      return;
    }

    const tweet = {
      content: reTweet.content.replace(/#[a-z0-9_]+/gi, "").trim(),
      user: user.id,
      retweets: reTweet.tweet._id,
      hashtags:
        (reTweet.content.match(/#[a-z0-9_]+/gi) || []).map((tag) =>
          tag.slice(1)
        ),
    };

    dispatch(repost(tweet));
    handleCreateNotification(reTweet.tweet.user.id, "repost");
    setReTweet({ content: "", tweet: {} });
  };


  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Erreur d'accès à la caméra:", err));
  };

  return (
    <Layout>
      <div className="homeContainer x-like-style">
        <div className="sidebar">
          <div className="profileContainer">
            <img
              className="contentImage"
              src="src\assets\img\image.png"
              alt="User profile"
            />
            <p className="username" onClick={() => {navigate(`/profil/${user.id}`);}}>
              @{user.username}
            </p>
          </div>
          <div></div>
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
                  value={reTweet.content}
                  onChange={(e) =>
                    setReTweet({
                      ...reTweet,
                      content: e.target.value.slice(0, 256),
                    })
                  }
                  placeholder="Add a comment..."
                  className="postInput retweetComment"
                  maxLength="256"
                  aria-label="Add a comment to your retweet"
                />
                <span className="retweetButtons">
                  <button
                    onClick={() => setReTweet({ content: "", tweet: {} })}
                    className="postButton"
                  >
                    Annuler
                  </button>
                  <button onClick={handleRepostSubmit} className="postButton">
                    Reposter
                  </button>
                </span>
              </div>
            </div>
          ) : (
            <div className="newPostContainer">
              <textarea
                value={postContent.content}
                onChange={(e) =>
                  handlePostChange(e.target.value.slice(0, 256))
                }
                placeholder="What's happening?"
                className="postInput"
                maxLength="256"
                aria-label="Write a new post"
              />
              <input className="btn-upload"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPostContent({
                    ...postContent,
                    file: e.target.files[0],
                  })
                }
              /> <br></br>
              <button onClick={handlePostSubmit} className="postButton">
                Post
              </button>
            </div>
          )}

          <hr />

          <div className="postsContainer x-like-style">
            {postsJsx?.length ? postsJsx : <p className="noPosts">No posts yet.</p>}
          </div>
        </div>

        <div className="splitContainer"></div>
      </div>
      <video ref={videoRef} style={{ display: 'none' }} autoPlay playsInline />
    <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Layout>
  );
}