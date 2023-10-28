import React from "react";

const Song = (trackInfo) => {
    let track = trackInfo.track;
    return (
        <div className="flex flex-row space-x-3 text-white bg-white/[.15] p-2 m-2 hover:scale-[1.03] hover:bg-white/[.3] transition ease-out">
            <img src={track.album.images[2].url} alt="" width="60px" />
            <div className="flex flex-col justify-center pr-2">
                <div className="text-base hover:scale-[1.03] transition ease-out">
                    <a href={track.external_urls.spotify} target="_blank">
                        {track.name}
                    </a>
                </div>
                <div className="flex flex-row text-sm text-white/70 space-x-2">
                    {track.artists.map((artist) => {
                        return (
                            <a className="hover:scale-[1.1] transition ease-out" href={artist.external_urls.spotify} target="_blank">
                                {artist.name}
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Song;
