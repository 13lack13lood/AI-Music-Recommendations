import React, { useEffect, useState } from "react";
import { getGeneratedData, isDataReady, sendCallTrack, sendCallArtist, sendCallArtistTrack } from "../services/openAIService";
import { getRecommendedTracks, callsComplete, getRecommendedArtists } from "../services/spotifyService";
import "../styles/GeneratedContent.css";
import Button from "./Button";
import Song from "./Song";
import Loading from "./Loading";
import Artist from "./Artist";

const GeneratedContent = ({ display, artists, tracks, setDisplay }) => {
    const [count_1, setCount_1] = useState(0);
    const [count_2, setCount_2] = useState(0);
    const [generatedData, setGeneratedData] = useState("loading");
    const [generatedProperData, setGeneratedProperData] = useState([]);
    const [animate, setAnimate] = useState(false);
    const [displayType, setDisplayType] = useState("");

    const getTrackList = (tracks) => {
        let output = "";

        tracks.forEach((track) => {
            output += `\n${track.name} by ${track.artists[0].name}`;
        });

        return output;
    };

    const getArtistList = (artists) => {
        let output = "";

        artists.forEach((artist) => {
            output += `\n${artist.name}`;
        });

        return output;
    };

    useEffect(() => {
        setGeneratedData("loading");

        console.log(displayType);
        if (display.startsWith("generate") && display.includes("artist") && displayType.includes("tracks")) {
            const tracklist = getGeneratedData();
            console.log(tracklist);

            sendCallArtistTrack(tracklist);

            setCount_2(count_2 + 1);
        } else if (display.startsWith("generate") && display.includes("track")) {
            console.log(tracks);

            if (displayType != "tracks") {
                setDisplayType("tracks");
            }

            const tracklist = getTrackList(tracks);
            console.log(tracklist);

            sendCallTrack(tracklist);

            setCount_2(count_2 + 1);
        } else if (display.startsWith("generate") && display.includes("artist")) {
            console.log(artists);

            if (displayType != "artists") {
                setDisplayType("artists");
            }

            const artistList = getArtistList(artists);
            console.log(artistList);

            sendCallArtist(artistList);

            setCount_2(count_2 + 1);
        }
    }, [display, setDisplay, displayType, setDisplayType]);

    useEffect(() => {
        if (isDataReady()) {
            let response = getGeneratedData();
            response = JSON.parse(response.substring(response.indexOf("{")));
            console.log(response);
            console.log(displayType);

            if (displayType == "tracks") {
                setGeneratedProperData(getRecommendedTracks(response));
            } else if (displayType == "artists") {
                setGeneratedProperData(getRecommendedArtists(response));
            }

            setCount_1(count_1 + 1);
        } else {
            setTimeout(() => {
                setGeneratedData("loading");
                setCount_2(count_2 + 1);
            }, 500);
        }
    }, [count_2, setCount_2]);

    useEffect(() => {
        console.log(callsComplete());
        if (callsComplete() && count_1 % 6 == 0) {
            setGeneratedData(generatedProperData);
            setAnimate(false);
        } else {
            setGeneratedData("loading");
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
                            displayType == "tracks" &&
                            generatedData.map((track, index) => {
                                return (
                                    <div className={`fadeInUpGeneratedData${index + 1}`}>
                                        <Song track={track}></Song>
                                    </div>
                                );
                            })}
                        {generatedData != "loading" &&
                            displayType == "artists" &&
                            generatedData.map((artist, index) => {
                                return (
                                    <div className={`fadeInUpGeneratedData${index + 1}`}>
                                        <Artist artist={artist}></Artist>
                                    </div>
                                );
                            })}
                    </div>
                    <div className={`fadeInUpGeneratedDataButton flex flex-row w-[80%] items-center justify-evenly`}>
                        <Button
                            text={displayType.includes("tracks") ? "Add To Playlist" : "Recommend Songs"}
                            onclick={() => {
                                setAnimate(true);
                                setTimeout(() => {
                                    if (displayType.includes("tracks")) {
                                        setDisplay("playlist");
                                    } else {
                                        setDisplayType("tracks");
                                        setGeneratedData("loading");
                                    }
                                }, 1000);
                            }}
                        ></Button>
                        <Button
                            text="Regenerate"
                            onclick={() => {
                                setAnimate(true);
                                setTimeout(() => {
                                    if (display.includes("tracks")) {
                                        setGeneratedData("loading");
                                        sendCallTrack(getTrackList(tracks));
                                        setCount_1(6);
                                        setCount_2(6);
                                    } else {
                                        setDisplayType("artists");
                                        setGeneratedData("loading");
                                    }
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
