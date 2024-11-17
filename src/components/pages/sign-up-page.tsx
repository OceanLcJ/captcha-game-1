import { LabelTextBox } from '../login-signup/label-textbox';
import { CaptchaButton } from '../login-signup/captcha-button';
import './sign-up-page.css';
import Window from './../Window.tsx';
import {useEffect, useState} from "react";
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
    const [window, setWindow] = useState(false);
    const [fadeClass, setFadeClass] = useState("hidden");

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

    return (
        <div className="background-image">
            <div className="background-blur"></div>
            <div className='navbar'><Navbar /></div>
            <div className="center-container">
                <h1 className='welcome-header'>Sign up/Login</h1>
                <h2>Create a new username and password, or enter existing credentials.</h2>
                <div className='credential-textbox'><LabelTextBox onChange={setUsername} value={username} name={"Username"} isPassword={false}></LabelTextBox></div>
                <div className='credential-textbox'><LabelTextBox onChange={setPassword} value={password} name={"Password"} isPassword={true}></LabelTextBox></div>
                <div className="login-captcha"><CaptchaButton click={toggleWindow}/></div>
                <button className="signup-button">
                    Create account
                </button>
            </div>
            {window && <Window fade={fadeClass} username={username} />}
        </div>
    );
}