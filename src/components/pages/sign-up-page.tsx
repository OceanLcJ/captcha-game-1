import { LabelTextBox } from '../login-signup/label-textbox';
import { CaptchaButton } from '../login-signup/captcha-button';
import './sign-up-page.css'
import { Navbar } from '../login-signup/navbar';

type signUpFormData = {
    username: string,
    pw: string,
    highScore: number
};

const signUpForm = () => {
    const submitMutation = useMutation({
        mutationFn: async (formData: signUpFormData) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // throw new Error("Failed to submit form");
            console.log("Submitted form data", formData);
            return "";

            // endpoint would go here vv

             const response = await fetch("https://127.0.0.1:5000/signup", {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify(formData),
             });
             if (!response.ok) {
                 throw new Error("Failed to submit form");
             }
             return response.json();
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        submitMutation.mutate({
            username: e.target.username.value,
            pw: e.target.pw.value,
            highScore: e.target.highScore.value
        });
    };
}

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