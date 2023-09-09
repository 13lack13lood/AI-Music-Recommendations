import React, { useState } from "react";
import Button from "./Button";
import "../styles/Selection.css";

const Selection = ({ setTracks, setArtists, setDisplay }) => {
	const [animate, setAnimate] = useState(false);

	return (
		<div className="flex flex-col items-center h-full">
			<div
				className={`${
					animate ? "fadeOutUp" : "fadeInUp"
				} flex z-10 text-6xl h-1/2 justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
			>
				Generate Recommendations
			</div>
			<div className="fadeInUpDelay relative flex flex-row w-full h-1/2  justify-evenly text-4xl text-white font-thin">
				<div className={`${animate && "fadeOutUp"}`}>
					<Button
						text="Top Tracks"
						onclick={() => {
							setAnimate(true);
							setTracks(true);
							setTimeout(() => {
								setDisplay("tracks");
							}, 1000);
						}}
					/>
				</div>

				<div className={`${animate && "fadeOutUp"}`}>
					<Button
						text="Top Artists"
						onclick={() => {
							setAnimate(true);
							setArtists(true);
							setTimeout(() => {
								setDisplay("artists");
							}, 1000);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Selection;
