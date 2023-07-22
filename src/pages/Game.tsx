import GameData from "../types/gameData";
import { useState, MouseEvent, SyntheticEvent } from "react";
import Dropdown from "../components/Dropdown";

function Game({
    game,
    updateGameCharacters,
}: {
    game: GameData | null;
    updateGameCharacters: (updatedChars: GameData) => void;
}) {
    const [isTargetBoxActive, setIsTargetBoxActive] = useState(false);
    const [coords, setCoords] = useState({ width: 0, height: 0 });
    const [naturalDimensions, setNaturalDimensions] = useState({
        naturalWidth: 0,
        naturalHeight: 0,
    });
    const [imgDimensions, setImgDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        setNaturalDimensions({
            naturalWidth: e.currentTarget.naturalWidth,
            naturalHeight: e.currentTarget.naturalHeight,
        });

        setImgDimensions({
            width: e.currentTarget.clientWidth,
            height: e.currentTarget.clientHeight,
        });
    };
    const handleTargetBoxClick = (e: MouseEvent<HTMLImageElement>) => {
        setIsTargetBoxActive(!isTargetBoxActive);

        const { clientX, clientY } = e;
        const rect = e.currentTarget.getBoundingClientRect();

        setImgDimensions({
            width: e.currentTarget.clientWidth,
            height: e.currentTarget.clientHeight,
        });

        setCoords({
            width: clientX - rect.left,
            height: clientY - rect.top,
        });
    };

    if (game == null) return null;
    return (
        <div className="relative">
            <img
                src={game.image}
                alt="game"
                onLoad={handleImageLoad}
                onClick={handleTargetBoxClick}
            />

            {isTargetBoxActive && (
                <div
                    style={{ left: coords.width, top: coords.height }}
                    className="absolute translate-x-[-50%] translate-y-[-50%] rounded-full w-[75px] h-[75px] z-10 border-slate-100/60 border-[1px] bg-black/30"
                    onClick={handleTargetBoxClick}
                >
                    <Dropdown
                        items={game}
                        coords={coords}
                        naturalDimensions={naturalDimensions}
                        imgDimensions={imgDimensions}
                        updateGameCharacters={updateGameCharacters}
                    />
                </div>
            )}
        </div>
    );
}

export default Game;
