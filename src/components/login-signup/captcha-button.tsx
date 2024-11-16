import './captcha-button.css'

export function CaptchaButton(){
    return (
        <label className='captcha-container'>
            <input type="checkbox" className="checkbox" />
        </label>
    );
}