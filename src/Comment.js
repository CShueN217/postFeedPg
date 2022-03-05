import './Comment.css';
import axios from 'axios';
import React, { useState } from 'react';

export default function Comment(props) {
    var addComment = props.addComment;
    var slug = props.slug;
    const [feedText, setfeedText] = useState('');
    var commentList = props.commentList;


    const postComment = () => {
        if (feedText === '') {
            return;
        }
        const data = {
            user: {
                token: `${sessionStorage.getItem('token')}`,
                email: JSON.parse(sessionStorage.getItem('user')).email,
                username: JSON.parse(sessionStorage.getItem('user')).username,
            },
            comment: {

                body: feedText
            }
        }
        axios.post(`https://api.realworld.io/api/articles/${slug}/comments`, data)
            .then(res => {
                console.log('successfully post comment', res);
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const deleteComment = (id) => {
        console.log(id)
        axios.delete(`https://api.realworld.io/api/articles/${slug}/comments/${id}`)
            .then(res => {
                console.log('successfully delete comment');
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="" >
            {
                commentList && commentList.length &&
                commentList.map((comment, index) => {
                    return (
                        <div className="comment-box" key={index} onClick={() => deleteComment(comment.id)}>
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
                <div>
                    <div className="create-feed-container ">
                        <textarea
                            className="feed-content "
                            placeholder="Leave your comment..."
                            value={feedText}
                            onChange={(e) => setfeedText(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div className="comment-btn" onClick={() => { postComment() }}>Comment</div>
                </div>
            }
        </div >
    )
}

