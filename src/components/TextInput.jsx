import React from "react";
import "../styles/TextInput.css";

const TextInput = ({ placeholder, onChange }) => {
    return (
        <div class="outside">
            {console.log(placeholder)}

            <input class="input" type="text" placeholder={placeholder} onChange={onChange}></input>
            <span class="focus-border"></span>
        </div>
    );
};

export default TextInput;
