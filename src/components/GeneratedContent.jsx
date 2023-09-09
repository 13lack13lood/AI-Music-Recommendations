import React, { useEffect, useState } from "react";
import { getGeneratedData, isDataReady, sendCall } from "../services/openAiService";
import { getRecommendedTracks } from "../services/spotifyService";
import "../styles/GeneratedContent.scss";

const GeneratedContent = ({ display, artists, tracks, setDisplay }) => {
	const [count_1, setCount_1] = useState(0);
	const [generatedData, setGeneratedData] = useState("loading");
	const [load, setLoad] = useState(true);

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
			setGeneratedData(response.songs);

			setLoad(false);
		} else {
			setTimeout(() => {
				setCount_1(count_1 + 1);
			}, 500);
		}
	}, [count_1, setCount_1]);

	return (
		<div className="text-white m-auto w-full text-3xl flex flex-col h-full">
			{generatedData != "loading" && console.log(getRecommendedTracks(generatedData))}

			{generatedData == "loading" ? (
				<div className="m-auto">
					<div className="loading-container">
						<div className="loading-text">
							<span>L</span>
							<span>O</span>
							<span>A</span>
							<span>D</span>
							<span>I</span>
							<span>N</span>
							<span>G</span>
						</div>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-3">
					{generatedData.map((track) => {
						return (
							<div className=" flex flex-row space-x-3 text-white bg-white/[.15] p-2 m-2 hover:scale-[1.03] hover:bg-white/[.3] transition ease-out">
								{track.name} by {track.artist}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default GeneratedContent;
