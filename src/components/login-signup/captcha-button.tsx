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
  updateStart: () => void;
  captchaComplete: boolean;
}

export function CaptchaButton(props: Props) {
  return (
    <div className="captcha-container">
      <div className="checkbox-text-container">
        {GetCheckmarkDiv(props.captchaComplete, props.click)}
        <label htmlFor="checkbox">I'm not a robot</label>
      </div>
      <img
        src="/public/images/RecaptchaLogo.png"
        className="recaptcha-logo"
      ></img>
    </div>
  );
}
