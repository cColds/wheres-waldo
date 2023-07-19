import { Routes, Route } from "react-router";
import { useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { useEffect, useState } from "react";
import games from "./gameData";
import GameData from "./types/gameData";

function App() {
    const location = useLocation();
    const [game, setGame] = useState<GameData | null>(null);

    useEffect(() => {
        const { pathname } = location;
        const gamePath = games.find((game) => game.gameId === pathname);
        if (!gamePath) {
            setGame(null);
            return;
        }

        setGame(gamePath);
    }, [location]);

    return (
        <div className="text-light-text bg-light-background dark:text-dark-text dark:bg-black">
            <header className="sticky top-0 bg-inherit h-[80px]">
                <Nav game={game} />
            </header>
            <main className="">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:gameId" element={<Game game={game} />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
