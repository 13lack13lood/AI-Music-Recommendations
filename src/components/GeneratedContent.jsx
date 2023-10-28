import React, { useEffect, useState } from "react";
import { getGeneratedData, isDataReady, sendCall } from "../services/openAiService";
import { getRecommendedTracks, callsComplete, createPlaylist } from "../services/spotifyService";
import "../styles/GeneratedContent.css";
import Button from "./Button";
import Song from "./Song";
import Loading from "./Loading";

const GeneratedContent = ({ display, artists, tracks, setDisplay }) => {
    const [count_1, setCount_1] = useState(0);
    const [count_2, setCount_2] = useState(0);
    const [generatedData, setGeneratedData] = useState("loading");
    const [generatedTracks, setGeneratedTracks] = useState([]);
    const [animate, setAnimate] = useState(false);

    const getTrackList = (tracks) => {
        let output = "";

        tracks.forEach((track) => {
            output += `\n${track.name} by ${track.artists[0].name}`;
        });

        return output;
    };

    useEffect(() => {
        console.log(tracks);

        const tracklist = getTrackList(tracks);
        console.log(tracklist);

        sendCall(tracklist);
    }, []);

    useEffect(() => {
        if (isDataReady()) {
            let response = getGeneratedData();
            response = JSON.parse(response.substring(response.indexOf("{")));
            console.log(response);
            setGeneratedTracks(getRecommendedTracks(response));
            // setLoad(false);
        } else {
            setTimeout(() => {
                setCount_2(count_2 + 1);
            }, 500);
        }
    }, [count_2, setCount_2]);

    useEffect(() => {
        if (callsComplete() && count_1 % 6 == 0) {
            setGeneratedData(generatedTracks);
            setAnimate(false);
        } else {
            setTimeout(() => {
                setCount_1(count_1 + 1);
            }, 500);
        }
    }, [count_1, setCount_1]);

    return (
        <div className={`${animate && "fadeOutUpGeneratedData"}text-white m-auto w-full text-3xl flex flex-col justify-evenly h-full`}>
            {generatedData == "loading" ? (
                <Loading></Loading>
            ) : (
                <div className={`${animate && "fadeOutUpGeneratedData"} flex flex-col h-full items-center justify-evenly`}>
                    <div className="text-white text-4xl font-extralight capitalize">
                        <p className="title">
                            <span>Generated</span> <span>Recommendations</span>
                        </p>
                    </div>
                    <div className="grid grid-cols-3 max-w-[93%] min-w-[80%]">
                        {generatedData != "loading" &&
                            generatedData.map((track, index) => {
                                return (
                                    <div className={`fadeInUpGeneratedData${index + 1}`}>
                                        <Song track={track}></Song>
                                    </div>
                                );
                            })}
                    </div>
                    <div className={`fadeInUpGeneratedDataButton flex flex-row w-[80%] items-center justify-evenly`}>
                        <Button
                            text="Add To Playlist"
                            onclick={() => {
                                setAnimate(true);
                                setTimeout(() => {
                                    setDisplay("playlist");
                                }, 1000);
                            }}
                        ></Button>
                        <Button
                            text="Regenerate"
                            onclick={() => {
                                setAnimate(true);
                                setTimeout(() => {
                                    setGeneratedData("loading");
                                    sendCall(getTrackList(tracks));
                                    setCount_1(count_1 + 1);
                                    setCount_2(count_2 + 1);
                                }, 1000);
                            }}
                        ></Button>
                        <Button
                            text="Back"
                            onclick={() => {
                                setAnimate(true);
                                setTimeout(() => {
                                    setDisplay("selection");
                                }, 1000);
                            }}
                        ></Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeneratedContent;
