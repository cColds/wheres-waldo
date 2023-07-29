import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import app from "../firebase";
import { ChangeEvent, FormEvent, useState } from "react";
import GameData from "../types/gameData";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);

type WinModalProps = {
    totalTimeInSeconds: number;
    game: GameData;
};

function WinModal({ totalTimeInSeconds, game }: WinModalProps) {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLeaderboardSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const leaderboardRef = collection(
            db,
            `leaderboard/${game.gameId}/scores`
        );

        const leaderboardScore = {
            username,
            time: totalTimeInSeconds,
            date: serverTimestamp(),
        };
        try {
            await addDoc(leaderboardRef, leaderboardScore);
            navigate("/leaderboard");
        } catch (e) {
            console.error(e);
        }
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
        setUsername(e.currentTarget.value);

    return (
        <div className="fixed bg-black/75 animate-fade-in inset-0 z-50">
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-light-background dark:bg-dark-background rounded-lg p-4 ">
                <div className="mb-3">
                    <h1 className="text-xl font-nunito-bold">
                        You finished in {totalTimeInSeconds.toFixed(3)}s!
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Submit your score to the leaderboard
                    </p>
                </div>

                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleLeaderboardSubmit}
                >
                    <label className="flex flex-col gap-1">
                        <span className="text-slate-600 dark:text-slate-400">
                            Username
                        </span>
                        <input
                            type="text"
                            minLength={1}
                            maxLength={25}
                            required
                            className="w-full rounded-md bg-transparent border-[1px] border-slate-600 h-8"
                            onChange={handleUsernameChange}
                        />
                    </label>

                    <button
                        type="submit"
                        className="self-end rounded-lg bg-primary text-dark-background px-6 py-1.5 hover:bg-primary/80 transition ease-in-out duration-300 active:scale-95"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WinModal;
