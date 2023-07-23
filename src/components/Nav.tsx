import { Link } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import { LuSun, LuMoonStar } from "react-icons/lu";
import GameData from "../types/gameData";
import Timer from "./Timer";

function Nav({
    game,
    isGameActive,
    updateTotalTimeInSeconds,
}: {
    game: GameData | null;
    isGameActive: boolean;
    updateTotalTimeInSeconds: (seconds: number) => void;
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

            {game && (
                <Timer
                    isGameActive={isGameActive}
                    updateTotalTimeInSeconds={updateTotalTimeInSeconds}
                />
            )}

            {game && (
                <div>
                    <div className="flex">
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
                </div>
            )}

            <button
                onClick={handleThemeToggle}
                className="shadow-lg flex justify-center w-[40px] h-[40px] rounded-lg p-2 text-primary hover:bg-slate-100 dark:border-slate-800 border-[1px] dark:hover:bg-slate-900"
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

export default Nav;
