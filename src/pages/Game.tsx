import GameData from "../types/gameData";
import { useState, MouseEvent, SyntheticEvent, useEffect, useRef } from "react";
import Dropdown from "../components/Dropdown";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

type NotificationDetails = {
    message: string;
    isFound: boolean;
};

function Notification({
    notificationDetails,
}: {
    notificationDetails: NotificationDetails | null;
}) {
    if (notificationDetails == null) return null;

    const { message, isFound } = notificationDetails;
    return (
        <div
            className={`fixed z-50 p-3 ${
                isFound ? "bg-green-800" : "bg-rose-800"
            } rounded-lg left-[50%] top-[125px] translate-x-[-50%] translate-y-[-50%] shadow-lg flex items-center gap-3 text-light-background animate-fade-in`}
        >
            {isFound ? <FaCircleCheck /> : <FaCircleExclamation />}
            <p className="text-center text-sm">{message}</p>
        </div>
    );
}

type Characters = {
    name: string;
    url: string;
    found: boolean;
    marker: { x: number; y: number };
}[];

type Dimension = {
    width: number;
    height: number;
};

type NaturalDimensions = {
    naturalWidth: number;
    naturalHeight: number;
};

function Marker({
    characters,
    naturalDimensions,
    imgDimensions,
}: {
    characters: Characters;
    naturalDimensions: NaturalDimensions;
    imgDimensions: Dimension;
}) {
    return (
        <>
            {characters.map((character) => {
                if (!character.found) return null;
                const { naturalWidth, naturalHeight } = naturalDimensions;
                const { width, height } = imgDimensions;
                const { x, y } = character.marker;
                const coordX = (x / naturalWidth) * width;
                const coordY = (y / naturalHeight) * height;
                return (
                    <FaMapMarkerAlt
                        style={{ left: coordX, top: coordY }}
                        className="absolute z-10 text-red-800 w-5 h-5 translate-x-[-50%] translate-y-[-50%]"
                        key={character.name}
                    />
                );
            })}
        </>
    );
}

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
    const [shouldShowNotification, setShouldShowNotification] = useState(false);
    const [notificationDetails, setNotificationDetails] =
        useState<NotificationDetails | null>(null);

    const handleNotification = (message: string, isFound: boolean) => {
        setShouldShowNotification(true);
        setNotificationDetails({ message, isFound });

        setTimeout(() => {
            setShouldShowNotification(false);
            setNotificationDetails(null);
        }, 1500);
    };

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

    const toggleTargetBox = () => setIsTargetBoxActive(!isTargetBoxActive);

    const handleTargetBoxClick = (e: MouseEvent<HTMLImageElement>) => {
        toggleTargetBox();
        if (isTargetBoxActive) return;

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

    useEffect(() => {
        const handleResize = () => {
            setIsTargetBoxActive(false);
            const { width, height } = imgDimensions;
            setImgDimensions({ width, height });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (game == null) return null;
    return (
        <div className="relative">
            {shouldShowNotification && (
                <Notification notificationDetails={notificationDetails} />
            )}

            <Marker
                characters={game.characters}
                naturalDimensions={naturalDimensions}
                imgDimensions={imgDimensions}
            />

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
                        handleNotification={handleNotification}
                        toggleTargetBox={toggleTargetBox}
                    />
                </div>
            )}
        </div>
    );
}

export default Game;
