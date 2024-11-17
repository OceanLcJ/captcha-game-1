import './leaderboard-page.css'
import { Navbar } from '../login-signup/navbar';

interface Props {
    time: Date;
}

function getTimeSinceStart(start: Date){
    return (new Date().valueOf() - start.valueOf()) / 1000;
}

export function LeaderboardPage(props: Props){
    return (
        <>
            <div className='hero'>
                <div className='background-blur'></div>
                <div className='navbar'><Navbar /></div>
                <div className='hero-text'>
                    <h1>Congrats!</h1>
                    <h2>You have successfully signed in.</h2>
                </div>
            </div>
            <div className='content'>
                <h2>Your fastest time is: {getTimeSinceStart(props.time)} seconds</h2>
                <h2>Leaderboard</h2>
                <table>
                    <tr>
                        <th style={{width: "10%"}}>Place</th>
                        <th style={{width: "60%"}}>Name</th>
                        <th>Time</th>
                    </tr>
                    <tr>
                        <td>1.</td>
                        <td>Test Name</td>
                        <td>Test Time</td>
                    </tr>
                </table>
            </div>
        </>
    );
}