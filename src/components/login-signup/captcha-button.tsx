import './captcha-button.css'

export function CaptchaButton(){
    return (
        <div className="captcha-container">
            <input type="checkbox" name="checkbox" className='captcha-checkbox'/>
            <label htmlFor="checkbox"> I'm not a robot</label>
            <img src="/public/images/RecaptchaLogo.png" className="recaptcha-logo"></img>
        </div>
    );
}