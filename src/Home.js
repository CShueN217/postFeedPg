import './Home.css';
import React, { useState } from 'react';
import Feed from './Feed';
import Layout from './Layout'

function PostFeed() {
  const [feedText, setfeedText] = useState('');

  return (
    <div className="create-feed-container light-dark">
      <div className="feed-title">Create a Post</div>
      <textarea
        className="feed-content light-dark"
        placeholder="Your thought in the crypto market..."
        value={feedText}
        onChange={(e) => setfeedText(e.target.value)}
      >
      </textarea>
    </div>
  )
}

function Home() {
  return (
    <Layout padding={true}>
      <PostFeed />
      {/* {feedList.articles[0].author} */}
      <Feed />
    </Layout>
  );
}

export default Home;
