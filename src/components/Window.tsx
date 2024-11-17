import './Window.css'
import { useState } from 'react'

import CountBalls from "./captcha/CountBalls.tsx";
import CrossingGrid from './captcha/CrossingGrid.tsx'
import { ExitVim } from './captcha/ExitVim.tsx'
import {MovingCheck} from "./captcha/MovingCheck.tsx";
import Poly from './captcha/Poly.tsx'
import { RotatingEmail } from './captcha/RotatingEmail.tsx'
import Slide from './captcha/Slide.tsx'
import { SpeechRecognition } from './captcha/SpeechRecognition.tsx'
import StopSignGrid from './captcha/StopSignGrid.tsx'
import {TicTacToe} from "./captcha/TicTacToe.tsx";
import {ThumbsUp} from "./captcha/ThumbsUp.tsx";
import {TouchGrass} from "./captcha/TouchGrass.tsx";
import TrafficGrid from './captcha/TrafficGrid.tsx'
import Waldo from './captcha/Waldo.tsx'

interface Props {
    fade: string;
    username: string;
}

function Window(props: Props) {
    const [success, setSuccess] = useState(false);
    const [index, setIndex] = useState(0);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const [p, setP] = useState("");
    const [l, setL] = useState("");

    const levels = [
        <CrossingGrid setL={setL} setP={setP} setSuccess={setSuccess}/>,
    ]

    //     <TrafficGrid setL={setL} setP={setP} setSuccess={setSuccess}/>,
    //     <Waldo setL={setL} setP={setP} setSuccess={setSuccess}/>,
    //     <Slide setL={setL} setP={setP} setSuccess={setSuccess}/>,
    //     <StopSignGrid setL={setL} setP={setP} setSuccess={setSuccess}/>,
    //     <TicTacToe setL={setL} setP={setP} setSuccess={setSuccess} mode={"easy"}/>,
    //     <SpeechRecognition setL={setL} setP={setP} setSuccess={setSuccess} index={2}/>,
    //     <Poly setL={setL} setP={setP} setSuccess={setSuccess}/>,
    //
    //     <CountBalls setL={setL} setP={setP} setSuccess={setSuccess} />,
    //     <ThumbsUp setL={setL} setP={setP} setSuccess={setSuccess}/>,
    //     <ExitVim setL={setL} setP={setP} setSuccess={setSuccess}/>,
    //     <TicTacToe setL={setL} setP={setP} setSuccess={setSuccess} mode={"hard"}/>,
    //     <MovingCheck setL={setL} setP={setP} setSuccess={setSuccess}/>,
    //
    //     <SpeechRecognition setL={setL} setP={setP} setSuccess={setSuccess} index={1}/>,
    //     <RotatingEmail setL={setL} setP={setP} setSuccess={setSuccess} username={props.username}/>

    const handleVerifyClick = () => {
        if (success) {
            if (index < levels.length - 1) {
                setIndex(index + 1);
            } else {
                alert("End of levels, direct to leaderboard");
            }
        } else {
            setShowFailureMessage(true);

            setTimeout(() => {
                setShowFailureMessage(false);
            }, 2000);
        }
    };

    return (
        <div className={"window " + props.fade}>
            <header className="title">
                <p>{p}</p>
                <h2>{l}</h2>
            </header>

            <main className="content">
                {levels[index]}
            </main>

            {showFailureMessage && (
                <div className="failure-message">
                    Please try again
                </div>
            )}

            <footer>
                <div className="verify" onClick={handleVerifyClick}>
                    Verify
                </div>
            </footer>
        </div>
    );
}

export default Window;
