import './Window.css'
import Level1 from './captcha/Level1.tsx'
import Level2 from './captcha/Level2'
import { useState } from 'react'

interface Props {
    fade: string;
}

function Window(props: Props) {
    const [success, setSuccess] = useState(false);
    const [index, setIndex] = useState(0);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const [p, setP] = useState("");
    const [l, setL] = useState("");

    const levels = [<Level1 setL={setL} setP={setP} setSuccess={setSuccess}/>,
                    <Level2 setL={setL} setP={setP} setSuccess={setSuccess}/>];

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
