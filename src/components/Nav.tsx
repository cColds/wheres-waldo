import useTheme from "./hooks/useTheme";
import { LuSun, LuMoonStar } from "react-icons/lu";

function Nav() {
    const [isDark, setIsDark] = useTheme();

    function handleThemeToggle() {
        setIsDark(!isDark);
    }

    return (
        <nav className="px-6 py-4 flex justify-between items-center border-b-2 ">
            <p className="text-xl">
                <span className=" text-light-text dark:text-dark-text">
                    Pixel
                </span>
                <span className="text-primary">Hunt</span>
            </p>

            <button
                onClick={handleThemeToggle}
                className="p-2.5 rounded-lg text-primary hover:bg-slate-200 border-primary/10 border-[1px]"
            >
                {isDark ? <LuSun /> : <LuMoonStar />}
            </button>
        </nav>
    );
}

export default Nav;
