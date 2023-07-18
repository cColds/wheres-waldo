import { Routes, Route } from "react-router";
import useTheme from "./components/hooks/useTheme";
import { LuSun, LuMoonStar } from "react-icons/lu";

function App() {
    const [isDark, setIsDark] = useTheme();

    function handleThemeToggle() {
        setIsDark(!isDark);
    }

    return (
        <>
            <main className="dark:bg-black">
                <Routes>
                    <Route path="/" element={<p>Home</p>} />
                </Routes>
            </main>
            <button
                onClick={handleThemeToggle}
                className="p-2.5 rounded-lg text-primary hover:bg-slate-200 border-primary/10 border-[1px]"
            >
                {isDark ? <LuSun /> : <LuMoonStar />}
            </button>
        </>
    );
}

export default App;
