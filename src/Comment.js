import './Comment.css';
import React, { useState } from 'react';

export default function Comment(props) {
    var addComment = props.addComment;
    const [feedText, setfeedText] = useState('');
    var commentList = props.commentList;
    return (
        <div className="" >
            {
                commentList && commentList.length &&
                commentList.map((comment, index) => {
                    return (
                        <div className="comment-box">
                            <div className="comment-user">
                                <img className="user" src={comment.author.image} alt="user" />
                                <div className="username-comment">{comment.author.username}</div>
                            </div>
                            <div key={index} className="comment">
                                {comment.body}
                            </div>
                        </div>
                    )
                })
            }{
                addComment &&
                <div className="create-feed-container ">
                    <textarea
                        className="feed-content "
                        placeholder="Leave your comment..."
                        value={feedText}
                        onChange={(e) => setfeedText(e.target.value)}
                    >
                    </textarea>
                </div>
            }
        </div >
    )
}

