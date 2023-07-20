import GameData from "../types/gameData";
import { useState, MouseEvent } from "react";

function Game({ game }: { game: GameData | null }) {
    const [isTargetBoxActive, setIsTargetBoxActive] = useState(false);
    const [targetBoxCoords, setTargetBoxCoords] = useState({ x: 0, y: 0 });

    const handleTargetBoxClick = (e: MouseEvent<HTMLImageElement>) => {
        setIsTargetBoxActive(!isTargetBoxActive);

        const { clientX, clientY } = e;
        const rect = e.currentTarget.getBoundingClientRect();
        console.log(rect);

        setTargetBoxCoords({
            x: clientX - rect.left,
            y: clientY - rect.top,
        });
    };

    if (game == null) return null;
    return (
        <div className="relative">
            <img src={game.image} alt="game" onClick={handleTargetBoxClick} />

            {isTargetBoxActive && (
                <div
                    style={{ left: targetBoxCoords.x, top: targetBoxCoords.y }}
                    className={`absolute translate-x-[-50%] translate-y-[-50%] rounded-full w-[75px] h-[75px] z-10 border-slate-100/60 border-[1px] bg-black/30`}
                    onClick={handleTargetBoxClick}
                />
            )}
        </div>
    );
}

export default Game;
