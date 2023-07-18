import { Link } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import { LuSun, LuMoonStar } from "react-icons/lu";

function Nav() {
    const [isDark, setIsDark] = useTheme();

    function handleThemeToggle() {
        setIsDark(!isDark);
    }

    return (
        <nav className="px-6 py-4 flex justify-between items-center">
            <Link to="/" aria-label="pixelhunt homepage">
                <p className="text-2xl">
                    <span className=" text-light-text dark:text-dark-text">
                        Pixel
                    </span>
                    <span className="text-primary">Hunt</span>
                </p>
            </Link>

            <button
                onClick={handleThemeToggle}
                className="rounded-lg p-2 text-primary hover:bg-slate-100 dark:border-slate-800 border-[1px] dark:hover:bg-slate-900"
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
