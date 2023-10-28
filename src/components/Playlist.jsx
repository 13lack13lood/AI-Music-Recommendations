import React from "react";
import TextInput from "./TextInput";
import "../styles/TextInput.scss";

const Playlist = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-white text-4xl font-extralight capitalize m-8">
                <p className="title">
                    <span>Enter</span> <span>a</span> <span>Playlist</span> <span>Name</span>
                </p>
            </div>
            <TextInput></TextInput>
        </div>
    );
};

export default Playlist;
