import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import FeedDetail from './FeedDetail'
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Switch,
  Route,
  Routes
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path="/feed/:slug" element={<FeedDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
