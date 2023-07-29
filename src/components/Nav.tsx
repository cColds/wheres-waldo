import { Link } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import { LuSun, LuMoonStar } from "react-icons/lu";
import GameData from "../types/gameData";
import Timer from "./Timer";
import { default as TimerType } from "../types/timer";
import getCharsAlive from "../utils/getCharsAlive";

function Nav({
    game,
    isGameActive,
    updateCurrentTime,
    updateStartTime,
    startTime,
    currentTime,
    totalTimeInSeconds,
    finalTimerTime,
    toggleCharacterList,
    isCharacterListActive,
}: {
    game: GameData | null;
    isGameActive: boolean;
    updateCurrentTime: (newTime: number) => void;
    updateStartTime: (newTime: number) => void;
    startTime: number;
    currentTime: number;
    totalTimeInSeconds: number;
    finalTimerTime: TimerType;
    toggleCharacterList: () => void;
    isCharacterListActive: boolean;
}) {
    const [isDark, setIsDark] = useTheme();

    function handleThemeToggle() {
        setIsDark(!isDark);
    }

    return (
        <nav className="px-6 py-4 flex justify-between items-center h-full">
            <Link to="/" aria-label="pixelhunt homepage">
                <p className="text-2xl">
                    <span>Pixel</span>
                    <span className="text-primary">Hunt</span>
                </p>
            </Link>

            {!isGameActive && !game && (
                <Link to="leaderboard" className="text-lg ml-auto mr-4">
                    Leaderboard
                </Link>
            )}

            {game && (
                <Timer
                    isGameActive={isGameActive}
                    updateCurrentTime={updateCurrentTime}
                    updateStartTime={updateStartTime}
                    startTime={startTime}
                    currentTime={currentTime}
                    totalTimeInSeconds={totalTimeInSeconds}
                    finalTimerTime={finalTimerTime}
                />
            )}

            {game && (
                <div className="hidden md:flex">
                    {game.characters.map((character) => {
                        return (
                            <div
                                key={character.name}
                                className="flex items-center gap-3 mx-2"
                            >
                                <img
                                    src={character.url}
                                    alt="character"
                                    width="40px"
                                    height="40px"
                                    className={`${
                                        character.found ? "opacity-70" : ""
                                    } shadow-lg rounded-lg object-cover aspect-square hover:scale-110 transition-transform duration-300 ease-in-out`}
                                />
                                <p
                                    className={`${
                                        character.found
                                            ? "line-through opacity-70"
                                            : ""
                                    }`}
                                >
                                    {character.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {game && (
                <div className="md:hidden flex grow justify-end relative">
                    <button
                        onClick={toggleCharacterList}
                        className="rounded-full bg-red-800 w-[30px] h-[30px] text-dark-text mr-6"
                    >
                        {getCharsAlive(game)?.length ?? 3}
                    </button>
                    {isCharacterListActive && <CharacterList game={game} />}
                </div>
            )}

            <button
                onClick={handleThemeToggle}
                className="shadow-lg flex justify-center w-[40px] h-[40px] rounded-lg p-2 text-primary hover:bg-slate-100 dark:border-slate-800 border-[1px] dark:hover:bg-slate-900"
                aria-label="toggle theme"
            >
                {isDark ? (
                    <LuSun className="w-5 h-5" />
                ) : (
                    <LuMoonStar className="w-5 h-5" />
                )}
            </button>
        </nav>
    );
}

function CharacterList({ game }: { game: GameData }) {
    return (
        <ul className="absolute top-[30px] bg-light-background dark:bg-dark-secondary rounded-lg animate-fade-in w-[150px]">
            {game.characters.map((character) => {
                if (character.found) return null;

                return (
                    <li key={character.name}>
                        <button className="h-[65px] flex gap-3 hover:bg-dark-background/10 dark:hover:bg-white/10 w-full p-3 transition duration-300 ease-in-out cursor-default">
                            <img
                                src={character.url}
                                alt="character"
                                width="40"
                                height="40"
                                draggable="false"
                                className="shadow-lg rounded-lg aspect-square"
                            />
                            <span>{character.name}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default Nav;
