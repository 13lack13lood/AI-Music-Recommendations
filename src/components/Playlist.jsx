import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { addSongsToPlaylist, createPlaylist, isPlaylistCreated } from "../services/spotifyService";
import "../styles/Playlist.css";

const Playlist = () => {
    const [playlistPublic, setplaylistPublic] = useState(true);
    const [playlistName, setPlaylistName] = useState("GPT Recommended Tracks");
    const [count, setCount_1] = useState(1);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isPlaylistCreated()) {
            addSongsToPlaylist();
        } else {
            setTimeout(() => {
                setCount_1(count + 1);
            }, 100);
        }
    }, [count, setCount_1]);

    return (
        <div className={`flex flex-col items-center justify-evenly h-[80%]`}>
            <div className="text-white text-4xl font-extralight capitalize m-8 text-center">
                <p className="title">
                    <span>Add</span> <span>Generated</span> <span>Recommendations</span> <span>To</span> <span>Playlist</span>
                </p>
            </div>
            <div className="block-reveal flex items-center justify-center w-1/2">
                <TextInput
                    placeholder="Playlist Name ..."
                    onChange={(e) => {
                        setPlaylistName(e.currentTarget.value);
                        console.log(playlistName);
                    }}
                ></TextInput>
            </div>
            <div className="flex flex-row items-center w-[70%] justify-evenly">
                <Button
                    text={playlistPublic ? "Public" : "Private"}
                    onclick={() => {
                        setplaylistPublic(playlistPublic ? false : true);
                    }}
                ></Button>
                <Button
                    text="Save"
                    onclick={() => {
                        createPlaylist(playlistName, playlistPublic);
                    }}
                ></Button>
            </div>
        </div>
    );
};

export default Playlist;
