import React, { useState } from "react";
import "../styles/UserInfo.css";
import Button from "./Button";
import { sendCall } from "../services/openAiService";
import Song from "./Song";

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
                            <div className={`fadeInUp${index + 1} flex flex-row space-x-3 text-white bg-white/[.15] p-2 m-2 hover:scale-[1.03] hover:bg-white/[.3] transition ease-out`}>
                                <img src={artist.images[2].url} alt="" width="60px" />
                                <div className="flex flex-col justify-center">
                                    <div className="text-base hover:scale-[1.03] transition ease-out">
                                        <a href={artist.external_urls.spotify} target="_blank">
                                            {artist.name}
                                        </a>
                                    </div>
                                    <div className="flex flex-row text-sm text-white/70 space-x-3 capitalize flex-wrap">
                                        {artist.genres.map((genre) => {
                                            return <p>{genre}</p>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="fadeInUpInfoDelay">
                <Button
                    text="Generate Recommendations"
                    onclick={() => {
                        setAnimate(true);
                        setTimeout(() => {
                            setDisplay("generate_" + display);
                        }, 1000);
                    }}
                />
            </div>
        </div>
    );
};

export default UserInfo;
