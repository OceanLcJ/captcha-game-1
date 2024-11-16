import { useState } from 'react';
import './captcha-button.css'

function GetCheckmarkDiv(captchaComplete: boolean){
    if(captchaComplete){
        return (
            <div className='checkmark'></div>
        );
    }
    else{
        return (
            <>
                <input type="checkbox" id="checkbox" className='captcha-checkbox'/>
                <div className='reload-anim'></div>
            </>
        );
    }
}

export function CaptchaButton() {
    const [captchaComplete, setCaptchaComplete] = useState(false)

    function HandleCheckmarkClick(){
        setCaptchaComplete(!captchaComplete);
    }

    return (
        <div className="captcha-container">
            <div className='checkbox-text-container'>
                {GetCheckmarkDiv(captchaComplete)}
                <label htmlFor="checkbox">I'm not a robot</label>
            </div>
            <img src="/public/images/RecaptchaLogo.png" className="recaptcha-logo"></img>
        </div>
    );
}