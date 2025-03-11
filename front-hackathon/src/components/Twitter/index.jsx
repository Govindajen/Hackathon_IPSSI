import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowsSpin, faBookmark, faTrash, faComment} from '@fortawesome/free-solid-svg-icons';


export default function Post ({key, post}) {
    const user = useSelector(state => state.auth.user.user)

    const isUser = user.id === post.user._id

    console.log(post)


    return (
        <div key={key} className="post">
            
            <p className="user"> {post.user.username}</p>
            <div className="content">
                <p>{post.content}</p>
            </div>
            
            <p className="hashtags">{post.hashtags.map(hashtag => `#${hashtag}`).join(' ')}</p>
            <div className="icons">
                <p><FontAwesomeIcon icon={faHeart} /> {post.likes.length}</p>
                <p><FontAwesomeIcon icon={faArrowsSpin} /> {post.retweets ? post.retweets.length : 0}</p>
                <p><FontAwesomeIcon icon={faComment} /> </p>
                <p><FontAwesomeIcon icon={faBookmark} /> {post.signet}</p>

            </div>

            {
                post.retweets && post.retweets.length ? 

                        <div key={key} className="post">
                            
                            <p className="user"> {post.user.username}</p>
                            <div className="content">
                                <p>{post.content}</p>
                            </div>
                            
                            <p className="hashtags">{post.hashtags.map(hashtag => `#${hashtag}`).join(' ')}</p>
                            <div className="icons">
                                <p><FontAwesomeIcon icon={faHeart} /> {post.likes.length}</p>
                                <p><FontAwesomeIcon icon={faArrowsSpin} /> {post.retweets.length}</p>
                                <p><FontAwesomeIcon icon={faComment} /> </p>
                                <p><FontAwesomeIcon icon={faBookmark} /> {post.signet}</p>

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