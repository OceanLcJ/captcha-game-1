import "./leaderboard-page.css";
import { Navbar } from "../login-signup/navbar";
import { useEffect, useState } from "react";

export interface User {
  username: string;
  highScoreMin: number;
  highScoreSec: number;
  highScoreDate: string;
}

interface Props {
  user: User;
}

export function LeaderboardPage(props: Props) {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);

  const fetchLeaderboard = async () => {
    const response = await fetch("/api/leaderboard");

    if (response.ok) {
      const data = (await response.json()) as User[];
      setLeaderboard(data);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const signout = () => {
    fetch("/api/logout");
    location.reload(); // lol whatever
  };

  return (
    <>
      <div className="hero">
        <div className="background-blur"></div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="hero-text">
          <h1>Congrats!</h1>
          <h2>You have successfully signed in.</h2>
          <div
            className="bg-blue-400 mt-5 p-5 rounded cursor-pointer"
            onClick={signout}
          >
            Sign out
          </div>
        </div>
      </div>
      <div className="leaderboard-content">
        <h2>
          Your fastest time is: {props.user.highScoreMin}:
          {props.user.highScoreSec} on {props.user.highScoreDate}
        </h2>
        <h2>Leaderboard</h2>
        <table>
          <tr>
            <th style={{ width: "10%" }}>Place</th>
            <th style={{ width: "60%" }}>Name</th>
            <th>Time</th>
          </tr>
          {leaderboard.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>
                {user.highScoreMin}:{user.highScoreSec}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
