let generatedData,
    dataGenerated = false;

const sendCallTrack = (input) => {
    dataGenerated = false;

    let params = {
        prompt: input,
    };

    let searchParams = new URLSearchParams(params);

    console.log(searchParams.toString());

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/get-recommendation-track");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(searchParams.toString());
    request.onload = () => {
        if (request.status == 200) {
            storeData(JSON.parse(request.response).data);
            console.log(request.response);
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

    console.log(searchParams.toString());

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/get-recommendation-artist-artist");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(searchParams.toString());
    request.onload = () => {
        if (request.status == 200) {
            storeData(JSON.parse(request.response).data);
            console.log(request.response);
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

    console.log(searchParams.toString());

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/get-recommendation-artist-track");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(searchParams.toString());
    request.onload = () => {
        if (request.status == 200) {
            storeData(JSON.parse(request.response).data);
            console.log(request.response);
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
