import { LabelTextBox } from '../login-signup/label-textbox';
import { CaptchaButton } from '../login-signup/captcha-button';
import './sign-up-page.css'
import { Navbar } from '../login-signup/navbar';

export function SignUpPage(){
    return (
        <div className="background-image">
            <div className="background-blur"></div>
            <div className='navbar'><Navbar /></div>
            <div className="center-container">
                <h1 className='welcome-header'>Sign up</h1>
                <h2>To continue, please create an account.</h2>
                <LabelTextBox name={"USERNAME"}></LabelTextBox>
                <LabelTextBox name={"PASSWORD"}></LabelTextBox>
                <div className="login-captcha"><CaptchaButton /></div>
                <button className="signup-button">Create account</button>
            </div>
        </div>
    );
}