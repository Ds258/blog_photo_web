import React from "react";
import './Loading.css';

export default function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center full-screen">
            <div className="spinner-border" style={{width: "5rem", height: "5rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

