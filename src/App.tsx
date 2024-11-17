import "./App.css";
import "./components/pages/sign-up-page.tsx";
import { SignUpPage } from "./components/pages/sign-up-page.tsx";
import { User, LeaderboardPage } from "./components/pages/leaderboard-page.tsx";
import { useEffect, useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const fetchLoggedIn = async () => {
    const response = await fetch("/api/me");

    if (response.ok) {
      const data = (await response.json()) as User;
      setLoggedInUser(data);
    } else if (response.status === 403) {
      setLoggedInUser(null);
    }
  };

  useEffect(() => {
    fetchLoggedIn();
  }, []);

  return (
    <>
      {loggedInUser ? <LeaderboardPage user={loggedInUser} /> : <SignUpPage />}
    </>
  );
}

export default App;
