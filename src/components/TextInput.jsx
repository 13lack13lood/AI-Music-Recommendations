import React from "react";
import "../styles/TextInput.css";

const TextInput = () => {
    return (
        <div class="outside">
            <input class="input" type="text" placeholder="Playlist Name"></input>
            <span class="focus-border"></span>
        </div>
    );
};

export default TextInput;
