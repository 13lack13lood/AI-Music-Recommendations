import React from "react";
import "../styles/Loading.scss";

const Loading = () => {
    return (
        <div className="m-auto">
            <div className="loading-container">
                <div className="loading-text">
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
