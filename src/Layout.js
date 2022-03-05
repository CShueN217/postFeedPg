import './Home.css';
import React from 'react';

export default function Layout(props) {
    return (
        <div className="layout" style={{ minHeight: window.innerHeight }}>
            { props.children}
        </div >
    )
}

