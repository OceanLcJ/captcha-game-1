import { LabelTextBox } from "../login-signup/label-textbox";
import { CaptchaButton } from "../login-signup/captcha-button";
import "./sign-up-page.css";
import Window from "./../Window.tsx";
import { useEffect, useState } from "react";
import { Navbar } from "../login-signup/navbar";

type signUpFormData = {
  username: string;
  pw: string;
  highScore: number;
  updateStart: () => void;
};

interface Props {
  updateStart: () => void;
  toggleScreen: () => void;
}

const start = Date.now();

export function SignUpPage(props: Props) {
  const [window, setWindow] = useState(false);
  const [fadeClass, setFadeClass] = useState("hidden");

  const [captchaComplete, setCaptchaComplete] = useState(false);

  function HandleCheckmarkClick() {
    setCaptchaComplete(!captchaComplete);
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleWindow = () => {
    setWindow(!window);
  };

  useEffect(() => {
    if (window) {
      setTimeout(() => {
        setFadeClass("fade-visible");
      }, 1000);
    } else {
      setFadeClass("fade-hidden");
    }
  }, [window]);

  const handleCreate = async () => {
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        pw: password,
        score: Math.floor((Date.now() - start) / 1000),
      }),
    });

    location.reload();
  };

  return (
    <div className="background-image">
      <div className="background-blur"></div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="center-container">
        <h1 className="welcome-header">Sign up/Login</h1>
        <h2>
          Create a new username and password, or enter existing credentials.
        </h2>
        <div className="credential-textbox">
          <LabelTextBox
            onChange={setUsername}
            value={username}
            name={"Username"}
            isPassword={false}
          ></LabelTextBox>
        </div>
        <div className="credential-textbox">
          <LabelTextBox
            onChange={setPassword}
            value={password}
            name={"Password"}
            isPassword={true}
          ></LabelTextBox>
        </div>
        <div className="login-captcha">
          <CaptchaButton
            captchaComplete={captchaComplete}
            updateStart={props.updateStart}
            click={toggleWindow}
          />
        </div>
        <button
          className={
            captchaComplete
              ? "signup-button signup-button-active"
              : "signup-button"
          }
          onClick={() => {
            handleCreate();
          }}
        >
          Create account
        </button>
      </div>
      {window && (
        <Window
          fade={fadeClass}
          username={username}
          handleCaptchaClick={HandleCheckmarkClick}
          toggleWindow={toggleWindow}
        />
      )}
    </div>
  );
}
