import logo from './logo.svg';
import './Home.css';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import Feed from './Feed'
const Layout = (props) => {
  return (
    <div className="layout" style={{ minHeight: window.innerHeight }}>
      { props.children}
    </div >
  )
}

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
    <Layout>
      <PostFeed />
      {/* {feedList.articles[0].author} */}
      <Feed />
    </Layout>
  );
}

export default Home;
