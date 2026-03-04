import React, { useEffect } from "react";
import "./Alert.css";

const Alert = ({ type = "success", message, onClose }) => {

    // optional auto close after 4 sec
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`alert-container ${type}`}>
            <span className="alert-message">{message}</span>
            <button className="alert-close" onClick={onClose}>
                ✕
            </button>
        </div>
    );
};

export default Alert;