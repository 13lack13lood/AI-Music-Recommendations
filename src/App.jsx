import React, { useEffect, useState } from "react";
import { onPageLoad } from "./services/spotifyService";
import Background from "./components/Background";
import "./App.css";
import FrontPage from "./components/FrontPage";
import MainPage from "./components/MainPage";

const App = () => {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        onPageLoad(setAuthorized);
    }, []);

    return (
        <div className="bg-gradient-to-br from-blue-950 to-sky-700 min-w-fit w-full h-full absolute">
            <Background />
            {authorized ? <MainPage /> : <FrontPage />}
        </div>
    );
};

export default App;
