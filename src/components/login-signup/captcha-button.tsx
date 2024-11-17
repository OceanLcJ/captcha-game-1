import { useState } from "react";
import "./captcha-button.css";

function GetCheckmarkDiv(captchaComplete: boolean, click: () => void) {
  if (captchaComplete) {
    return <div className="checkmark"></div>;
  } else {
    return (
      <>
        <input
          type="checkbox"
          id="checkbox"
          className="captcha-checkbox"
          onClick={click}
        />
        <div className="reload-anim"></div>
      </>
    );
  }
}

interface Props {
  click: () => void;
}

export function CaptchaButton(props: Props) {
  const [captchaComplete, setCaptchaComplete] = useState(false);

  function HandleCheckmarkClick() {
    setCaptchaComplete(!captchaComplete);
  }

  return (
    <div className="captcha-container">
      <div className="checkbox-text-container">
        {GetCheckmarkDiv(captchaComplete, props.click)}
        <label htmlFor="checkbox">I'm not a robot</label>
      </div>
      <img src="/images/RecaptchaLogo.png" className="recaptcha-logo"></img>
    </div>
  );
}
