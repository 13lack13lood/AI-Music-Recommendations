import React from "react";

const Artist = ({ artist }) => {
    return (
        <div className="flex flex-row space-x-3 text-white bg-white/[.15] p-2 m-2 hover:scale-[1.03] hover:bg-white/[.3] transition ease-out">
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
};

export default Artist;
