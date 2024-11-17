import './App.css'
import './components/pages/sign-up-page.tsx'
import { SignUpPage } from './components/pages/sign-up-page.tsx'
import { LeaderBoard } from './components/pages/sign-up-page.tsx'
import {useState} from "react";
import {LeaderboardPage} from "./components/pages/leaderboard-page.tsx";

function App() {
    const [screen, swapScreen] = useState(true);
    const [startDate, setStartDate] = useState(new Date());

    const toggleScreen = () => {
        swapScreen(!screen);
    };

    const updateStart = () => {
        setStartDate(new Date());
    };

    return (
        <>
            {screen ? <SignUpPage toggleScreen={toggleScreen} updateStart={updateStart}/> :
                <LeaderboardPage time={startDate}/>}
        </>
    )
}

export default App
