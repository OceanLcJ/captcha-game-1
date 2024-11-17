import "./Window.css";
import { useEffect, useRef, useState } from "react";

import CountBalls from "./captcha/CountBalls.tsx";
import CrossingGrid from "./captcha/CrossingGrid.tsx";
import { ExitVim } from "./captcha/ExitVim.tsx";
import { MovingCheck } from "./captcha/MovingCheck.tsx";
import Poly from "./captcha/Poly.tsx";
import { RotatingEmail } from "./captcha/RotatingEmail.tsx";
import Slide from "./captcha/Slide.tsx";
import { SpeechRecognition } from "./captcha/SpeechRecognition.tsx";
import StopSignGrid from "./captcha/StopSignGrid.tsx";
import { TicTacToe } from "./captcha/TicTacToe.tsx";
import { ThumbsUp } from "./captcha/ThumbsUp.tsx";
import { TouchGrass } from "./captcha/TouchGrass.tsx";
import TrafficGrid from "./captcha/TrafficGrid.tsx";
import Waldo from "./captcha/Waldo.tsx";

const IS_DEMO = true;

interface Props {
  fade: string;
  username: string;
  toggleWindow: () => void;
  handleCaptchaClick: () => void;
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
    <CrossingGrid setL={setL} setP={setP} setSuccess={setSuccess} />,
    <TrafficGrid setL={setL} setP={setP} setSuccess={setSuccess} />,
    <StopSignGrid setL={setL} setP={setP} setSuccess={setSuccess} />,
    <Slide setL={setL} setP={setP} setSuccess={setSuccess} />,
    <Waldo setL={setL} setP={setP} setSuccess={setSuccess} />,
    !IS_DEMO && (
      <TicTacToe
        setL={setL}
        setP={setP}
        setSuccess={setSuccess}
        mode={"hard"}
      />
    ),
    <Poly setL={setL} setP={setP} setSuccess={setSuccess} />,
    IS_DEMO && (
      <SpeechRecognition
        setL={setL}
        setP={setP}
        setSuccess={setSuccess}
        index={0}
      />
    ),
    <CountBalls setL={setL} setP={setP} setSuccess={setSuccess} />,
    IS_DEMO && <ThumbsUp setL={setL} setP={setP} setSuccess={setSuccess} />,
    <MovingCheck setL={setL} setP={setP} setSuccess={setSuccess} />,
    <ExitVim setL={setL} setP={setP} setSuccess={setSuccess} />,
    <TouchGrass
      setL={setL}
      setP={setP}
      checkSuccessCallback={checkSuccessCallback}
    />,
    <RotatingEmail
      setL={setL}
      setP={setP}
      setSuccess={setSuccess}
      username={props.username}
    />,
  ].filter(Boolean);

  const handleVerifyClick = async () => {
    setVerifying(true);
    const isSuccess =
      typeof checkSuccessCallback.current === "function"
        ? await checkSuccessCallback.current()
        : success;
    setVerifying(false);

    if (isSuccess) {
      if (index < levels.length - 1) {
        setIndex(index + 1);
      } else {
        props.handleCaptchaClick();
        props.toggleWindow();
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
  }, [index]);

  return (
    <div className={"window " + props.fade}>
      <header className="title">
        <p>{p}</p>
        <h2>{l}</h2>
      </header>

      <main className="content">{levels[index]}</main>

      {showFailureMessage && (
        <div className="failure-message">Please try again</div>
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
