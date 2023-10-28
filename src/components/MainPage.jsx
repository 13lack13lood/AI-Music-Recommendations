import React, { useEffect, useState } from "react";

import Selection from "./Selection";
import UserInfo from "./UserInfo";
import { getArtists, getTracks } from "../services/spotifyService";
import GeneratedContent from "./GeneratedContent";
import Playlist from "./Playlist";

const MainPage = () => {
    const [tracks, setTracks] = useState(null);
    const [artists, setArtists] = useState(null);
    const [display, setDisplay] = useState(null);

    useEffect(() => {
        const data = getTracks();
        setTracks(data);
    }, [tracks, setTracks]);

    useEffect(() => {
        const data = getArtists();
        setArtists(data);
    }, [artists, setArtists]);

    if (display == "tracks" || display == "artists") {
        return (
            <>
                <UserInfo display={display} artists={artists} tracks={tracks} setDisplay={setDisplay} />
            </>
        );
    } else if (display != null && display.startsWith("generate")) {
        return <GeneratedContent display={display} artists={artists} tracks={tracks} setDisplay={setDisplay} />;
    } else if (display != null && display.startsWith("playlist")) {
        return <Playlist></Playlist>;
    }

    return (
        <>
            <Selection setTracks={setTracks} setArtists={setArtists} setDisplay={setDisplay} />
        </>
    );
};

export default MainPage;
