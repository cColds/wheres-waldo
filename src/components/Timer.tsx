import { useEffect, useState } from "react";

const Timer = ({ isGameActive }: { isGameActive: boolean }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [ms, setMs] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMs((prevMs) => {
                if (prevMs + 15 < 1000) return prevMs + 15;

                setSeconds((prevSeconds) => {
                    if (prevSeconds === 59) {
                        setMinutes((prevMinutes) => prevMinutes + 1);

                        return 0;
                    }

                    return prevSeconds + 1;
                });

                return 0;
            });
        }, 15);

        if (!isGameActive) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [minutes, seconds, isGameActive]);

    return (
        <p className="text-lg">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}:
            {ms > 0 ? ms.toString().substring(0, 2) : "00"}
        </p>
    );
};

export default Timer;
