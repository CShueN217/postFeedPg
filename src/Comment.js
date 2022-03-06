import './Comment.css';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { CommentContext } from './FeedDetail'

export default function Comment(props) {
    const [feedText, setfeedText] = useState('');
    const { commentList, slug, addComment, setCommentList } = useContext(CommentContext)
    const userName = JSON.parse(sessionStorage.getItem('user')).username;

    const postComment = () => {
        if (feedText === '') {
            return;
        }
        const data = {
            comment: {
                body: feedText
            }
        }

        axios.post(`https://api.realworld.io/api/articles/${slug}/comments`, data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(res => {
                console.log('successfully post comment', res.data.comment);
                setfeedText('');
                setCommentList([...commentList, res.data.comment])
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const deleteComment = (id) => {
        console.log(id)
        axios.delete(`https://api.realworld.io/api/articles/${slug}/comments/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Method': "DELETE"
            }
        })
            .then(res => {
                console.log('successfully delete comment', res);
                filterComment(id)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const filterComment = (id) => {
        var list = commentList;
        var filtered = list.filter(function (value, index, arr) {
            return value.id != id;
        });
        setCommentList(filtered)
        console.log('filter', filtered)
    }

    return (
        <div className="" >
            {
                commentList && commentList.length &&
                commentList.map((comment, index) => {
                    return (
                        <div className="comment-box" key={index} >

                            <div className="comment-user">
                                <img className="user" src={comment.author.image} alt="user" />
                                <div className="username-comment">{comment.author.username}</div>
                                {
                                    comment.author.username === userName &&
                                    <div className="delete-icon" onClick={() => deleteComment(comment.id)} />
                                }
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

