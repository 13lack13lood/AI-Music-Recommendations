import token from "../../token.json";

const clientID = token.clientID;
const clientSecret = token.clientSecret;

const authURL = "https://accounts.spotify.com/authorize";
const tokenURL = "https://accounts.spotify.com/api/token";
const redirect = "https://harryzhu.ca/music-recommendations/";

let tracks,
	artists,
	recommended = [],
	callsMade = 0,
	callsNeeded = 100,
	playlistCreated = false;

const authorize = () => {
	const params = {
		client_id: clientID,
		response_type: "code",
		redirect_uri: encodeURI(redirect),
		show_dialog: true,
		scope: "user-read-private user-read-email user-top-read user-read-recently-played playlist-modify-public playlist-modify-private",
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

const getUserId = () => {
	callAPI("GET", "https://api.spotify.com/v1/me", function () {
		let data = JSON.parse(this.response);
		localStorage.setItem("userid", data.id);
	});
};

const createPlaylist = (playlistName, isPublic) => {
	playlistCreated = false;

	let params = {
		name: playlistName,
		public: isPublic,
	};

	callAPI(
		"POST",
		`https://api.spotify.com/v1/users/${localStorage.getItem("userid")}/playlists`,
		function () {
			let data = JSON.parse(this.response);
			localStorage.setItem("current_playlist", data.id);
			setPlaylistCreated();
		},
		params
	);
};

const setPlaylistCreated = () => {
	playlistCreated = true;
};

const isPlaylistCreated = () => {
	return playlistCreated;
};

const addSongsToPlaylist = () => {
	let uris = [];
	recommended.forEach((track) => {
		uris.push(track.uri);
	});

	let params = {
		uris: uris,
	};

	callAPI(
		"POST",
		`https://api.spotify.com/v1/playlists/${localStorage.getItem("current_playlist")}/tracks`,
		function () {
			console.log(this.response);
		},
		params
	);
};

const callAPI = (method, url, callback, params = {}) => {
	let request = new XMLHttpRequest();

	request.open(method, url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
	request.send(JSON.stringify(params));
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

const getRecommendedTracksData = async (generatedTracks) => {
	recommended = [];

	callsMade = 0;
	callsNeeded = Object.entries(generatedTracks).length;

	for (const [track, object] of Object.entries(generatedTracks)) {
		let values = [];

		for (const [key, value] of Object.entries(object)) {
			values.push(value);
		}

		callAPI(
			"GET",
			`https://api.spotify.com/v1/search?query=${values[0]}+${values[1]}&type=track&limit=1`,
			function () {
				setRecommended(JSON.parse(this.response).tracks.items[0]);

				addToCallsMade();
			}
		);
	}
};

const getRecommendedArtistsData = async (generatedArtists) => {
	recommended = [];

	callsMade = 0;
	callsNeeded = Object.entries(generatedArtists).length;

	for (const [track, object] of Object.entries(generatedArtists)) {
		callAPI("GET", `https://api.spotify.com/v1/search?query=${object.name}&type=artist&limit=1`, function () {
			setRecommended(JSON.parse(this.response).artists.items[0]);

			addToCallsMade();
		});
	}
};

const callsComplete = () => {
	return callsMade == callsNeeded;
};

const addToCallsMade = () => {
	++callsMade;
};

const setRecommended = (data) => {
	recommended.push(data);
};

const getRecommendedTracks = (tracks) => {
	getRecommendedTracksData(tracks);

	return recommended;
};

const getRecommendedArtists = (artists) => {
	getRecommendedArtistsData(artists);

	return recommended;
};
export {
	authorize,
	onPageLoad,
	getTracks,
	getArtists,
	getRecommendedTracks,
	getRecommendedArtists,
	callsComplete,
	getUserId,
	createPlaylist,
	isPlaylistCreated,
	addSongsToPlaylist,
	redirect,
};
