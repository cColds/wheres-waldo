import GameData from "../types/gameData";
import { useState, MouseEvent, SyntheticEvent, useEffect, useRef } from "react";
import Dropdown from "../components/Dropdown";
import Notification from "../components/Notification";
import NotificationDetails from "../types/notificationDetails";
import Marker from "../components/Marker";

function Game({
    game,
    updateGameCharacters,
}: {
    game: GameData | null;
    updateGameCharacters: (updatedChars: GameData) => void;
}) {
    const [isTargetBoxActive, setIsTargetBoxActive] = useState(false);
    const [coords, setCoords] = useState({ width: 0, height: 0 });
    const [naturalDimension, setNaturalDimension] = useState({
        naturalWidth: 0,
        naturalHeight: 0,
    });
    const [imgDimension, setImgDimension] = useState({
        width: 0,
        height: 0,
    });
    const [shouldShowNotification, setShouldShowNotification] = useState(false);
    const [notificationDetails, setNotificationDetails] =
        useState<NotificationDetails | null>(null);
    const imgRef = useRef(null);

    const handleNotification = (message: string, isFound: boolean) => {
        setShouldShowNotification(true);
        setNotificationDetails({ message, isFound });

        setTimeout(() => {
            setShouldShowNotification(false);
            setNotificationDetails(null);
        }, 1500);
    };

    const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        setNaturalDimension({
            naturalWidth: e.currentTarget.naturalWidth,
            naturalHeight: e.currentTarget.naturalHeight,
        });

        setImgDimension({
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

        setImgDimension({
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
            if (imgRef.current == null) return;

            const { clientWidth, clientHeight } = imgRef.current;

            setImgDimension({ width: clientWidth, height: clientHeight });
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
                naturalDimension={naturalDimension}
                imgDimension={imgDimension}
            />

            <img
                src={game.image}
                alt="game"
                onLoad={handleImageLoad}
                onClick={handleTargetBoxClick}
                ref={imgRef}
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
                        naturalDimension={naturalDimension}
                        imgDimension={imgDimension}
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
