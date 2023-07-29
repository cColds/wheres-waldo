import { intervalToDuration } from "date-fns";
import { useEffect } from "react";
import { default as TimerType } from "../types/timer";

type TimerProps = {
    isGameActive: boolean;
    updateCurrentTime: (newTime: number) => void;
    updateStartTime: (newTime: number) => void;
    startTime: number;
    currentTime: number;
    totalTimeInSeconds: number;

    finalTimerTime: TimerType;
};

function Timer({
    isGameActive,
    updateCurrentTime,
    updateStartTime,
    startTime,
    currentTime,
    finalTimerTime,
}: TimerProps) {
    useEffect(() => {
        updateStartTime(Date.now());
        updateCurrentTime(Date.now());
        const interval = setInterval(() => {
            updateStartTime(Date.now());
        }, 10);

        if (!isGameActive) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isGameActive, updateStartTime, updateCurrentTime]);

    const duration = intervalToDuration({
        start: new Date(startTime),
        end: new Date(currentTime),
    });

    const ms = (startTime - currentTime) % 1000;
    const { minutes = 0, seconds = 0 } = duration;

    return (
        <p className="text-lg mx-6">
            {isGameActive ? (
                <FormattedTimer minutes={minutes} seconds={seconds} ms={ms} />
            ) : (
                <FormattedTimer
                    minutes={finalTimerTime.minutes}
                    seconds={finalTimerTime.seconds}
                    ms={finalTimerTime.ms}
                />
            )}
        </p>
    );
}

function FormattedTimer({ minutes, seconds, ms }: TimerType) {
    return (
        <>
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {ms.toString().padStart(3, "0")}
        </>
    );
}

export default Timer;
