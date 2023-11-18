const backendURL = "https://ai-music-recommendations-backend.onrender.com";

let generatedData,
	dataGenerated = false;

const sendCallTrack = (input) => {
	dataGenerated = false;

	let params = {
		prompt: input,
	};

	let searchParams = new URLSearchParams(params);

	let request = new XMLHttpRequest();
	request.open("POST", `${backendURL}/get-recommendation-track`);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(searchParams.toString());
	request.onload = () => {
		if (request.status == 200) {
			storeData(JSON.parse(request.response).data);
			setDataGenerated();
		} else {
			sendCallTrack(input);
		}
	};
};

const sendCallArtist = (input) => {
	dataGenerated = false;

	let params = {
		prompt: input,
	};

	let searchParams = new URLSearchParams(params);

	let request = new XMLHttpRequest();
	request.open("POST", `${backendURL}/get-recommendation-artist-artist`);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(searchParams.toString());
	request.onload = () => {
		if (request.status == 200) {
			storeData(JSON.parse(request.response).data);
			setDataGenerated();
		} else {
			sendCallArtist(input);
		}
	};
};

const sendCallArtistTrack = (input) => {
	dataGenerated = false;

	let params = {
		prompt: input,
	};

	let searchParams = new URLSearchParams(params);

	let request = new XMLHttpRequest();
	request.open("POST", `${backendURL}/get-recommendation-artist-track`);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(searchParams.toString());
	request.onload = () => {
		if (request.status == 200) {
			storeData(JSON.parse(request.response).data);
			setDataGenerated();
		} else {
			sendCallArtistTrack(input);
		}
	};
};

const storeData = (input) => {
	generatedData = input;
};

const setDataGenerated = () => {
	dataGenerated = true;
};

const isDataReady = () => {
	return dataGenerated;
};

const getGeneratedData = () => {
	return generatedData;
};

export { sendCallTrack, sendCallArtist, sendCallArtistTrack, isDataReady, getGeneratedData };
