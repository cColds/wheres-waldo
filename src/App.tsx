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
    const [isGameActive, setIsGameActive] = useState(false);

    const toggleIsGameActive = () => setIsGameActive(!isGameActive);

    const updateGameCharacters = (updatedChars: GameData) => {
        setGame(updatedChars);
    };

    useEffect(() => {
        const { pathname } = location;
        const gamePath = games.find((game) => game.gameId === pathname);
        if (!gamePath) {
            setGame(null);
            setIsGameActive(false);
            return;
        }
        setGame(gamePath);
        setIsGameActive(true);
    }, [location]);

    return (
        <div className="bg-inherit">
            <header className="sticky top-0 bg-inherit h-[80px] z-50">
                <Nav game={game} isGameActive={isGameActive} />
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
                                toggleIsGameActive={toggleIsGameActive}
                            />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
