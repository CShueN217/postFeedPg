import './Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Feed() {
    const [feedList, setFeedList] = useState([])
    useEffect(() => {
        axios.get('https://api.realworld.io/api/articles?limit=10&offset=0')
            .then(res => {
                setFeedList(res.data.articles)
                console.log('successfully fetched', res.data.articles)
                //feedList.articles['0'].author.username
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="feed-container">
            {
                feedList && feedList.length &&
                feedList.map((feed, index) => {
                    return (
                        <div key={index} className="feed-inner-container mg-tp-btm-2rem dark">
                            <div className="user-box">
                                <img className="user-icon" src={feed.author.image} alt='user-icon' />
                                <div className="username">
                                    {feed.author.username}
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div className="feed-content-container">
                                <div className="feedpage-title">
                                    {feed.title}
                                </div>
                                <p className="description">{capitalizeFirstLetter(feed.description)}</p>
                                <p className="feed-body">{feed.body}</p>
                            </div>
                            <div className="post-detail-container">
                                {
                                    feed.favorited ?
                                        <img className="favorite-icon" src="./heart.png" />
                                        :
                                        <img className="favorite-icon" src="./love.png" />
                                }
                                <div className="favoritesCount">{feed.favoritesCount}</div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}


export default Feed;
