import { useEffect, useState } from "react";
import games from "../gameData";
import GameData from "../types/gameData";
import {
    Timestamp,
    collection,
    getDocs,
    getFirestore,
} from "firebase/firestore";
import app from "../firebase";
import format from "date-fns/format";

const db = getFirestore(app);

type Score = {
    username: string;
    time: number;
    date: Timestamp;
};

type LeaderboardProps = {
    activeGameLeaderboard: GameData | null;
    updateActiveGameLeaderboard: (state: GameData | null) => void;
};

function Leaderboard({
    activeGameLeaderboard,
    updateActiveGameLeaderboard,
}: LeaderboardProps) {
    const [scores, setScores] = useState<Score[] | null>(null);
    const activeGame = activeGameLeaderboard ?? games[0];

    const handleMapClick = (game: GameData) => {
        updateActiveGameLeaderboard(game);
    };

    useEffect(() => {
        const fetchGameScores = async () => {
            const scoresRef = collection(
                db,
                `leaderboard/${activeGame.gameId}/scores`
            );
            const querySnap = await getDocs(scoresRef);
            const scores: Score[] = [];
            querySnap.forEach((doc) => {
                scores.push(doc.data() as Score);
            });

            const fastestScores = [...scores].sort((a, b) => a.time - b.time);

            return fastestScores;
        };

        fetchGameScores()
            .then((data) => {
                setScores(data);
            })
            .catch(console.error);
    }, [activeGame]);

    return (
        <div className="flex flex-col items-center p-4 gap-6">
            <h1 className="text-3xl font-nunito-bold">Leaderboard</h1>
            <div className="flex gap-6 flex-wrap justify-center">
                {games.map((game) => {
                    const isSelectedGame = Object.is(activeGame, game);

                    return (
                        <button
                            key={game.id}
                            onClick={() => handleMapClick(game)}
                            className={`${
                                isSelectedGame
                                    ? "scale-[1.03] border-2 border-primary shadow-primary/70 shadow-lg"
                                    : "shadow-md"
                            } transition-[transform,shadow] duration-300 ease-in-out flex flex-col grow w-[350px] h-[350px] bg-cyan-100/30 dark:bg-dark-secondary rounded-lg cursor-pointer`}
                        >
                            <img
                                src={game.image}
                                alt="game preview"
                                className="h-[80%] object-cover rounded-t-lg w-full"
                                draggable={false}
                            />
                            <div className="p-3 flex flex-col justify-between grow items-center w-full">
                                <h2 className="text-lg overflow-hidden text-center w-full whitespace-nowrap text-ellipsis">
                                    {game.title}
                                </h2>
                            </div>
                        </button>
                    );
                })}
            </div>
            <h2 className="text-xl font-nunito-bold uppercase">
                {activeGame.title}
            </h2>
            {scores?.length ? (
                <Table scores={scores} />
            ) : (
                <p className="text-slate-600 dark:text-slate-400">
                    It looks like no one has submitted their score to the
                    leaderboard yet, be the first one!
                </p>
            )}
        </div>
    );
}

function Table({ scores }: { scores: Score[] }) {
    return (
        <table className="rounded-lg overflow-hidden border-spacing-0 border-separate text-light-background w-full max-w-[750px] shadow-md">
            <thead className="bg-slate-300 dark:bg-slate-800">
                <tr className="text-light-text dark:text-dark-text">
                    <td className="p-4">Place</td>
                    <td className="p-4">Username</td>
                    <td className="p-4">Time</td>
                    <td className="p-4">Date</td>
                </tr>
            </thead>

            <tbody className="bg-slate-200/70 dark:bg-slate-900">
                {scores?.map((score, index) => {
                    return (
                        <tr
                            key={index}
                            className="text-light-text dark:text-dark-text"
                        >
                            <td className="p-4">{index + 1}</td>
                            <td className="p-4 overflow-hidden text-ellipsis max-w-[150px]">
                                {score.username}
                            </td>
                            <td className="p-4">{score.time.toFixed(3)}s</td>
                            <td className="p-4">
                                {format(score.date.toDate(), "LLL d, y")}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Leaderboard;
