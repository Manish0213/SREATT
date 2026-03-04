import React from 'react'
import './Loading.css';

const Loading = ({ message }) => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>{message}</p>
        </div>
    )
}

export default Loading