import { LabelTextBox } from '../login-signup/label-textbox';
import { CaptchaButton } from '../login-signup/captcha-button';
import './sign-up-page.css';
import Window from './../Window.tsx';
import {useEffect, useState} from "react";

export function SignUpPage(){
    const [window, setWindow] = useState(false);
    const [fadeClass, setFadeClass] = useState("hidden");

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

    return (
        <>
            <div className="background-image">
                <div className="background-blur"></div>
            </div>

            <div className="center-container">
                <h1>Sign up</h1>
                <h2>To continue, please create an account.</h2>
                <LabelTextBox name={"USERNAME"}></LabelTextBox>
                <LabelTextBox name={"PASSWORD"}></LabelTextBox>
                <div className="login-captcha" onClick={toggleWindow}><CaptchaButton /></div>
                <button className="signup-button"> Sign up</button>
            </div>

            {window && <Window fade={fadeClass}/>}
        </>
    );
}