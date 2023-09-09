import React from "react";
import "../styles/FrontPage.css";
import { authorize } from "../services/spotifyService";
import Button from "./Button";

const FrontPage = () => {
	return (
		<div className="relative flex flex-col h-full w-fit inset-x-0 mx-auto justify-center space-y-8">
			<div className=" space-y-2 text-8xl leading-tight">
				<p className="fadeInLeft text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
					AI Generated
				</p>
				<p className="fadeInRight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
					Music Recommendations
				</p>
			</div>
			<div className="fadeInUpDelay flex justify-end">
				<p className="w-fit -mt-1 font-medium text-right text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
					Powered by GPT-3
				</p>
			</div>

			<div className="fadeInUpDelay flex justify-center pt-3">
				<Button text={"Connect with Spotify"} onclick={authorize} />
			</div>
		</div>
	);
};

export default FrontPage;
