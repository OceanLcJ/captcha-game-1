import './Window.css'
import Level1 from './captcha/Level1.tsx'
import Level2 from './captcha/Level2'
import { useEffect, useRef, useState } from 'react'
import { TicTacToe } from './captcha/TicTacToe.tsx';
import { ThumbsUp } from './captcha/ThumbsUp.tsx';
import { ExitVim } from './captcha/ExitVim.tsx';
import { TouchGrass } from './captcha/TouchGrass.tsx';
import { MovingCheck } from './captcha/MovingCheck.tsx';

interface Props {
    fade: string;
}

function Window(props: Props) {
    const [success, setSuccess] = useState(false);
    const [index, setIndex] = useState(0);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const [p, setP] = useState("");
    const [l, setL] = useState("");
    const checkSuccessCallback = useRef<null | (() => Promise<boolean>)>(null);

    const levels = [
        <Level1 setL={setL} setP={setP} setSuccess={setSuccess} />,
        <Level2 setL={setL} setP={setP} setSuccess={setSuccess} />,
        <MovingCheck setL={setL} setP={setP} setSuccess={setSuccess} />,
        // <TicTacToe setL={setL} setP={setP} setSuccess={setSuccess} mode="easy" />,
        // <ThumbsUp setL={setL} setP={setP} setSuccess={setSuccess} />,
            <TouchGrass
            setL={setL}
            setP={setP}
            checkSuccessCallback={checkSuccessCallback}
        />,
        <ExitVim setL={setL} setP={setP} setSuccess={setSuccess} />,
    ];

    const handleVerifyClick = async () => {
        setVerifying(true);
        const isSuccess = 
            typeof checkSuccessCallback.current === "function" ?
            await checkSuccessCallback.current() :
            success;
        setVerifying(false);
        
        if (isSuccess) {
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

    // reset the checkSuccessCallback when the index changes
    useEffect(() => {
        checkSuccessCallback.current = null;
    }, [index])

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
                    {verifying ? "Verifying..." : "Verify"}
                </div>
            </footer>
        </div>
    );
}

export default Window;
