import './captcha-button.css'

export function CaptchaButton(){
    return (
        <div className="captcha-container">
            <div className='checkbox-text-container'>
                <input type="checkbox" id="checkbox" className='captcha-checkbox'/>
                <div className='reload-anim'></div>
                <label htmlFor="checkbox"> I'm not a robot</label>
            </div>
            <img src="/public/images/RecaptchaLogo.png" className="recaptcha-logo"></img>
        </div>
    );
}