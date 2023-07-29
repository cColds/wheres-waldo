import { useEffect, useRef, useState } from "react";
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

function Leaderboard({ lastPlayedGame }: { lastPlayedGame: GameData | null }) {
    const [gameToShow, setGameToShow] = useState(lastPlayedGame ?? games[0]);
    const [scores, setScores] = useState<Score[] | null>(null);
    const leaderboardRef = useRef<HTMLTableElement>(null);

    const handleMapClick = (game: GameData) => {
        setGameToShow(game);
    };

    useEffect(() => {
        const fetchGameScores = async () => {
            const scoresRef = collection(
                db,
                `leaderboard/${gameToShow.gameId}/scores`
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
                setTimeout(() => {
                    leaderboardRef?.current?.scrollIntoView({
                        behavior: "smooth",
                    });
                }, 200);
            })
            .catch(console.error);
    }, [gameToShow]);

    return (
        <div className="flex flex-col items-center p-4 gap-6">
            <h1 className="text-3xl font-nunito-bold">Leaderboard</h1>
            <div className="flex gap-6 flex-wrap justify-center">
                {games.map((game) => {
                    return (
                        <button
                            key={game.id}
                            onClick={() => handleMapClick(game)}
                            className="flex flex-col grow shadow-lg w-[350px] h-[350px] dark:bg-dark-secondary rounded-lg cursor-pointer"
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
            <h2 className="text-xl font-nunito-bold text-orange-800 dark:text-yellow-400 uppercase">
                {gameToShow.title}
            </h2>

            <table
                className="rounded-lg overflow-hidden border-spacing-0 border-separate text-light-background w-full max-w-[750px]"
                ref={leaderboardRef}
            >
                <thead className="bg-slate-800">
                    <tr>
                        <td className="p-4">Place</td>
                        <td className="p-4">Username</td>
                        <td className="p-4">Time</td>
                        <td className="p-4">Date</td>
                    </tr>
                </thead>

                <tbody className="bg-slate-900">
                    {scores?.map((score, index) => {
                        return (
                            <tr key={index}>
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4 overflow-hidden text-ellipsis max-w-[150px]">
                                    {score.username}
                                </td>
                                <td className="p-4">
                                    {score.time.toFixed(3)}s
                                </td>
                                <td className="p-4">
                                    {format(score.date.toDate(), "LLL d, y")}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
