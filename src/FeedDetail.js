import './Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function FeedDetail() {
    const { slug } = useParams();
    const url = `https://api.realworld.io/api/articles/${slug}`
    useEffect(() => {

    }, []);

    return (
        <div className="detail-container">
            {slug}
        </div>
    )
}

export default FeedDetail;
