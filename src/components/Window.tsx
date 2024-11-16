import './Window.css'
import Level1 from './captcha/Level1.tsx'
import Level2 from './captcha/Level2'
import { useState } from 'react'

function Window() {
    const [success, setSuccess] = useState(false);
    const [index, setIndex] = useState(0);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const levels = [<Level1 setSuccess={setSuccess}/>, <Level2 setSuccess={setSuccess}/>];
    const paragraphs = ["Select all the images with"]
    const larger = ["Crosswalks"]

    const handleVerifyClick = () => {
        if (success) {
            if (index < levels.length - 1) {
                setIndex(index + 1);
            } else {
                //send to leaderboard
            }
        } else {
            setShowFailureMessage(true);

            setTimeout(() => {
                setShowFailureMessage(false);
            }, 2000);
        }
    };

    return (
        <div className="window">
            <header className="title">
                <p>{paragraphs[index]}</p>
                <h2>{larger[index]}</h2>
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
