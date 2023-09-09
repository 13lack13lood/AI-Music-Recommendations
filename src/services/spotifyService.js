import token from "../../token.json";

const clientID = token.clientID;
const clientSecret = token.clientSecret;

const authURL = "https://accounts.spotify.com/authorize";
const tokenURL = "https://accounts.spotify.com/api/token";
const redirect = "http://localhost:5173/callback";

let tracks, artists, recommendedTracks;

const authorize = () => {
	const params = {
		client_id: clientID,
		response_type: "code",
		redirect_uri: encodeURI(redirect),
		show_dialog: true,
		scope: "playlist-read-private user-top-read user-read-recently-played",
	};

	const url = new URL(authURL);
	Object.entries(params).forEach(([param, value]) => {
		url.searchParams.append(param, value);
	});
	window.location.href = url;
};

const onPageLoad = (setAuthorized) => {
	if (window.location.search.length > 0) {
		handleRedirect(setAuthorized);
	}
};

const handleRedirect = (setAuthorized) => {
	let code = null;
	const query = window.location.search;

	if (query.length > 0) {
		const urlParams = new URLSearchParams(query);
		console.log(urlParams.get("code"));
		code = urlParams.get("code");
	}

	let params = {
		grant_type: "authorization_code",
		code: code,
		redirect_uri: redirect,
		client_id: clientID,
		client_secret: clientSecret,
	};

	let searchParams = new URLSearchParams(params);

	let request = new XMLHttpRequest();

	request.open("POST", tokenURL, true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.setRequestHeader("Authorization", "Basic " + btoa(`${clientID}:${clientSecret}`));
	request.send(searchParams.toString());
	request.onload = () => {
		if (request.status == 200) {
			let data = JSON.parse(request.response);

			if (data.access_token != undefined) {
				localStorage.setItem("access_token", data.access_token);
			}

			if (data.refresh_token != undefined) {
				localStorage.setItem("refresh_token", data.refresh_token);
			}

			setAuthorized(true);
		}
	};

	window.history.pushState("", "", redirect);
};

const callAPI = (method, url, callback) => {
	let request = new XMLHttpRequest();

	request.open(method, url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
	request.send();
	request.onload = callback;
};

const getTrackData = () => {
	callAPI("GET", "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50", function () {
		setTracks(JSON.parse(this.response));
	});
};

const setTracks = (data) => {
	tracks = data.items;
};

const getTracks = () => {
	getTrackData();
	return tracks;
};

const getArtistsData = () => {
	callAPI("GET", "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50", function () {
		setArtists(JSON.parse(this.response));
	});
};

const setArtists = (data) => {
	artists = data.items;
};

const getArtists = () => {
	getArtistsData();

	return artists;
};

const getRecommendedTracksData = (generatedTracks) => {
	recommendedTracks = [];

	generatedTracks.forEach((track) => {
		// "https://api.spotify.com/v1/search?query=sober+up+AJR&type=track&locale=en-US%2Cen%3Bq%3D0.9%2Cfr%3Bq%3D0.8&offset=0&limit=1";
		callAPI(
			"GET",
			`https://api.spotify.com/v1/search?query=${track.artist}+${track.name}&type=track&limit=1`,
			function () {
				setRecommendedTracks(JSON.parse(this.response));
			}
		);
	});
};

const setRecommendedTracks = (data) => {
	recommendedTracks.push(data);
};

const getRecommendedTracks = (tracks) => {
	getRecommendedTracksData(tracks);
	return recommendedTracks;
};

export { authorize, onPageLoad, getTracks, getArtists, getRecommendedTracks, redirect };
