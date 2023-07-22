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

    const updateGameCharacters = (updatedChars: GameData) => {
        setGame(updatedChars);
    };

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
        <div className="bg-inherit">
            <header className="sticky top-0 bg-inherit h-[80px] z-50">
                <Nav game={game} />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/:gameId"
                        element={
                            <Game
                                game={game}
                                updateGameCharacters={updateGameCharacters}
                            />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
