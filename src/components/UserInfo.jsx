import React, { useState } from "react";
import "../styles/UserInfo.css";
import Button from "./Button";
import Song from "./Song";
import Artist from "./Artist";

const UserInfo = ({ display, tracks, artists, setDisplay }) => {
    const [animate, setAnimate] = useState(false);

    return (
        <div className={`${animate ? "fadeOutUp" : "fadeInUp"} flex flex-col h-full items-center justify-evenly`}>
            <div className="text-white text-4xl font-extralight capitalize">
                <p className="title">
                    <span>Your</span> <span>Top</span> <span>{display == "tracks" ? tracks.length : artists.length}</span> <span>{display}</span> <span>Last Month</span>
                </p>
            </div>
            <div className="expand grid grid-cols-3 outline outline-1 outline-offset-[1.5rem] outline-white overflow-y-scroll h-3/5 p-4 max-w-[93%]">
                {display == "tracks" &&
                    tracks.map((track, index) => {
                        return (
                            <div className={`fadeInUp${index + 1}`}>
                                <Song track={track}></Song>
                            </div>
                        );
                    })}
                {display == "artists" &&
                    artists.map((artist, index) => {
                        console.log(artist);

                        return (
                            <div className={`fadeInUp${index + 1}`}>
                                <Artist artist={artist}></Artist>
                            </div>
                        );
                    })}
            </div>
            <div className="flex flex-row fadeInUpInfoDelay w-[80%] justify-evenly items-center">
                <Button
                    text="Generate Recommendations"
                    onclick={() => {
                        setAnimate(true);
                        setTimeout(() => {
                            setDisplay("generate_" + display);
                        }, 1100);
                    }}
                />
                <Button
                    text="Back"
                    onclick={() => {
                        setAnimate(true);
                        setTimeout(() => {
                            setDisplay("selection");
                        }, 1100);
                    }}
                />
            </div>
        </div>
    );
};

export default UserInfo;
