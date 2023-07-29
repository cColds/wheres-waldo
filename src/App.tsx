import { Routes, Route } from "react-router";
import { useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { useCallback, useEffect, useState } from "react";
import games from "./gameData";
import GameData from "./types/gameData";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import { intervalToDuration } from "date-fns";
import Timer from "./types/timer";
import { FaGithub } from "react-icons/fa";

function App() {
    const location = useLocation();
    const [game, setGame] = useState<GameData | null>(null);
    const [isGameActive, setIsGameActive] = useState(false);
    const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
    const [activeGameLeaderboard, setActiveGameLeaderboard] =
        useState<GameData | null>(null);
    const [startTime, setStartTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [finalTimerTime, setFinalTimerTime] = useState<Timer>({
        minutes: 0,
        seconds: 0,
        ms: 0,
    });
    const [isCharacterListActive, setIsCharacterListActive] = useState(false);

    const toggleCharacterList = () =>
        setIsCharacterListActive(!isCharacterListActive);

    const hideCharacterList = () => setIsCharacterListActive(false);

    const updateStartTime = useCallback(
        (newTime: number) => setStartTime(newTime),
        []
    );
    const updateCurrentTime = useCallback(
        (newTime: number) => setCurrentTime(newTime),
        []
    );

    const getFinalTimerTime = () => {
        const duration = intervalToDuration({
            start: new Date(startTime),
            end: new Date(currentTime),
        });
        const ms = (startTime - currentTime) % 1000;
        const { minutes = 0, seconds = 0 } = duration;

        return { minutes, seconds, ms };
    };

    const updateTotalTimeInSeconds = () => {
        const totalSeconds = (startTime - currentTime) / 1000;

        setTotalTimeInSeconds(totalSeconds);
        setFinalTimerTime(getFinalTimerTime);
    };

    const toggleIsGameActive = () => setIsGameActive(!isGameActive);

    const updateGameCharacters = (updatedChars: GameData) => {
        setGame(updatedChars);
    };

    useEffect(() => {
        const { pathname } = location;
        hideCharacterList();
        const gamePath = games.find((game) => `/${game.gameId}` === pathname);
        if (!gamePath) {
            setGame(null);
            setIsGameActive(false);
            document.body.style.overflow = "";
            return;
        }
        setGame(gamePath);
        setActiveGameLeaderboard(gamePath);
        setIsGameActive(true);
    }, [location]);

    const updateActiveGameLeaderboard = (state: null | GameData) =>
        setActiveGameLeaderboard(state);

    return (
        <div className="bg-inherit flex flex-col h-full">
            <header className="sticky top-0 bg-inherit h-[80px] z-50">
                <Nav
                    game={game}
                    isGameActive={isGameActive}
                    updateCurrentTime={updateCurrentTime}
                    updateStartTime={updateStartTime}
                    startTime={startTime}
                    currentTime={currentTime}
                    totalTimeInSeconds={totalTimeInSeconds}
                    finalTimerTime={finalTimerTime}
                    toggleCharacterList={toggleCharacterList}
                    isCharacterListActive={isCharacterListActive}
                />
            </header>
            <main className="grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/:gameId"
                        element={
                            <Game
                                game={game}
                                updateGameCharacters={updateGameCharacters}
                                toggleIsGameActive={toggleIsGameActive}
                                isGameActive={isGameActive}
                                totalTimeInSeconds={totalTimeInSeconds}
                                updateTotalTimeInSeconds={
                                    updateTotalTimeInSeconds
                                }
                                hideCharacterList={hideCharacterList}
                            />
                        }
                    />

                    <Route
                        path="/leaderboard"
                        element={
                            <Leaderboard
                                activeGameLeaderboard={activeGameLeaderboard}
                                updateActiveGameLeaderboard={
                                    updateActiveGameLeaderboard
                                }
                            />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/404" element={<NotFound />} />
                </Routes>
            </main>

            <footer className="w-full flex justify-center h-[50px] p-4">
                <a
                    href="https://github.com/cColds/wheres-waldo"
                    className="flex gap-3 items-center"
                >
                    <span className="text-lg">cColds</span>{" "}
                    <FaGithub className="w-6 h-6" />
                </a>
            </footer>
        </div>
    );
}

export default App;
