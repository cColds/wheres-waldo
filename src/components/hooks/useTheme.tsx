import { useEffect, useState } from "react";

function useTheme() {
    const preferDarkQuery = "(prefers-color-scheme: dark)";
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const theme = localStorage.getItem("theme");
        if (theme) {
            return theme === "dark";
        }

        return matchMedia(preferDarkQuery).matches;
    });

    useEffect(() => {
        const mediaTheme = matchMedia(preferDarkQuery);
        const handleChange = () => {
            setIsDarkMode(mediaTheme.matches);
        };
        mediaTheme.addEventListener("change", handleChange);

        return () => mediaTheme.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode, setIsDarkMode]);

    return [isDarkMode, setIsDarkMode] as const;
}

export default useTheme;
