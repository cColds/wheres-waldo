import { Link } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import { LuSun, LuMoonStar } from "react-icons/lu";
import GameData from "../types/gameData";

function Nav({ game }: { game: GameData | null }) {
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
                                        className="rounded-lg object-cover aspect-square pointer-events-none"
                                    />
                                    <p className="">{character.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <button
                onClick={handleThemeToggle}
                className="flex justify-center w-[40px] h-[40px] rounded-lg p-2 text-primary hover:bg-slate-100 dark:border-slate-800 border-[1px] dark:hover:bg-slate-900"
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
