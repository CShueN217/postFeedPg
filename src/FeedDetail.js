import './FeedDetail.css';
import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import Comment from './Comment';

function FeedDetail() {
    const [commentList, setCommentList] = useState('');
    const [addComment, setAddComment] = useState(false);
    const [content, setContent] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            feed: '',
            following: false,
            favorited: false,
            favoriteCount: 0,
        }
    );
    const { slug } = useParams();
    const url = `https://api.realworld.io/api/articles/${slug}`;
    const commentUrl = `https://api.realworld.io/api/articles/${slug}/comments`;
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setContent({
                    feed: res.data.article,
                    following: res.data.article.author.following,
                    favorited: res.data.article.favorited,
                    favoritesCount: res.data.article.favoritesCount,
                });
                console.log('successfully fetched article', res.data.article);
            })
            .catch((error) => {
                console.log(error)
            })

        axios.get(commentUrl)
            .then(res => {
                setCommentList(res.data.comments);
                console.log('successfully fetched comment', res.data.comments);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <Layout padding={false}>
            {
                content.feed.author &&
                <div className="top-header">
                    <img className="user-avatar" src={content.feed.author.image} alt='user-avatar' />
                    <div className="username">{content.feed.author.username}</div>
                    <div className="follow-status">
                        <div className="followers">{content.feed.author.followedBy.length} Followers</div>
                        <div className="status" key={content.followig} onClick={() => setContent({ following: !content.following })}>
                            <img src={content.following ? "/heart.png" : "/love.png"} alt="" />
                            <span>{content.following ? 'Following' : 'Follow'}</span>
                        </div>
                    </div>
                </div>
            }
            {
                content.feed.author &&
                <div className="body-container">
                    <div className="content-container">
                        <h3>{content.feed.author && content.feed.title}</h3>
                        <p>{capitalizeFirstLetter(content.feed.description)}</p>
                        <div className="content">
                            <div className="content-box">
                                {content.feed.body}
                            </div>
                            <div className="like-comment-container">
                                <div className="box">
                                    {
                                        content.favorited ?
                                            <img className="favorite-icon" src="/heart.png" onClick={() => { setContent({ favorited: false, favoritesCount: content.favoritesCount - 1 }) }} />
                                            :
                                            <img className="favorite-icon" src="/love.png" onClick={() => { setContent({ favorited: true, favoritesCount: content.favoritesCount + 1 }) }} />
                                    }
                                    <div className="favoritesCount">{content.favoritesCount}</div>
                                </div>
                                <div className="box">
                                    <img className="comment-icon" src="/comment.png" onClick={() => { setAddComment(true) }} />
                                    <div className="commentCount">{commentList && commentList.length ? commentList.length : '0'}</div>
                                </div>

                            </div>
                            {/* <div>
                                {
                                    commentList && commentList.length &&
                                    commentList.map((comment, index) => {
                                        return (
                                            <div key={index}>
                                                {comment.body}
                                            </div>
                                        )
                                    })
                                }
                            </div> */}
                            <Comment
                                commentList={commentList}
                                addComment={addComment}
                            />
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default FeedDetail;
