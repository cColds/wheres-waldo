import GameData from "../types/gameData";
import { useState, MouseEvent, SyntheticEvent, useEffect, useRef } from "react";
import Dropdown from "../components/Dropdown";
import Notification from "../components/Notification";
import NotificationDetails from "../types/notificationDetails";
import Marker from "../components/Marker";
import WinModal from "../components/WinModal";
import games from "../gameData";
import { useNavigate, useParams } from "react-router-dom";
import DropdownPositions from "../types/dropdownPositions";
import isEmptyObj from "../utils/isEmptyObj";
import getCharsAlive from "../utils/getCharsAlive";

function Game({
    game,
    updateGameCharacters,
    toggleIsGameActive,
    isGameActive,
    totalTimeInSeconds,
    updateTotalTimeInSeconds,
    hideCharacterList,
}: {
    game: GameData | null;
    updateGameCharacters: (updatedChars: GameData) => void;
    toggleIsGameActive: () => void;
    isGameActive: boolean;
    totalTimeInSeconds: number;
    updateTotalTimeInSeconds: () => void;
    hideCharacterList: () => void;
}) {
    const { gameId } = useParams();
    const navigate = useNavigate();

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
    const [dropdownPosition, setDropdownPosition] = useState<DropdownPositions>(
        { right: "-150px" }
    );

    const getDropdownPosition = (
        coordWidth: number,
        coordHeight: number,
        imgWidth: number,
        imgHeight: number
    ) => {
        const widthDiff = Math.abs(coordWidth - imgWidth);
        const heightDiff = Math.abs(coordHeight - imgHeight);
        const TARGET_BOX_RADIUS = 75 / 2;
        const DROPDOWN_WIDTH = 150;
        const DROPDOWN_HEIGHT = 195;
        const widthBoundary = DROPDOWN_WIDTH + TARGET_BOX_RADIUS;
        const heightBoundary = DROPDOWN_HEIGHT + TARGET_BOX_RADIUS;
        const DROPDOWN_ITEM_HEIGHT = 65;
        const calculatedDropdownHeight =
            DROPDOWN_ITEM_HEIGHT * (getCharsAlive(game)?.length ?? 3);

        const isCloseToRightBoundary = widthDiff < widthBoundary;
        const isCloseToBottomBoundary = heightDiff < heightBoundary;
        const isCloseToTopBoundary = Math.abs(heightDiff - imgHeight) < 30;
        const isCloseToLeftBoundary = Math.abs(widthDiff - imgWidth) < 30;

        const dropdownPosition: DropdownPositions = {};
        if (isCloseToTopBoundary)
            dropdownPosition.bottom = `-${calculatedDropdownHeight}px`;
        if (isCloseToBottomBoundary)
            dropdownPosition.top = `-${calculatedDropdownHeight}px`;
        if (isCloseToLeftBoundary) dropdownPosition.right = "-150px";
        if (isCloseToRightBoundary) dropdownPosition.left = "-150px";

        const defaultPos = { right: "-150px" };
        return isEmptyObj(dropdownPosition) ? defaultPos : dropdownPosition;
    };

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
        hideCharacterList();
        toggleTargetBox();
        if (isTargetBoxActive) return;

        const { clientX, clientY } = e;
        const rect = e.currentTarget.getBoundingClientRect();
        const imgWidth = e.currentTarget.clientWidth;
        const imgHeight = e.currentTarget.clientHeight;
        const coordWidth = clientX - rect.left;
        const coordHeight = clientY - rect.top;

        setDropdownPosition(
            getDropdownPosition(coordWidth, coordHeight, imgWidth, imgHeight)
        );

        setImgDimension({
            width: imgWidth,
            height: imgHeight,
        });

        setCoords({
            width: coordWidth,
            height: coordHeight,
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setIsTargetBoxActive(false);
            if (imgRef.current == null) return;

            const { clientWidth, clientHeight } = imgRef.current;

            setImgDimension({ width: clientWidth, height: clientHeight });
        };

        const isValidUrl = () => {
            return games.find((game) => game.gameId === gameId);
        };

        if (!isValidUrl()) {
            navigate("/404", { replace: true });
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    if (game == null) return null;
    return (
        <div className="relative overflow-hidden flex justify-center">
            {shouldShowNotification && (
                <Notification notificationDetails={notificationDetails} />
            )}

            {!isGameActive && (
                <WinModal totalTimeInSeconds={totalTimeInSeconds} game={game} />
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
                className="game-image"
            />

            {isTargetBoxActive && (
                <div
                    style={{ left: coords.width, top: coords.height }}
                    className="absolute translate-x-[-50%] translate-y-[-50%] rounded-full w-[75px] h-[75px] z-10 border-slate-100 border-2 border-dashed bg-black/50 border-spacing-4"
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
                        toggleIsGameActive={toggleIsGameActive}
                        dropdownPosition={dropdownPosition}
                        updateTotalTimeInSeconds={updateTotalTimeInSeconds}
                    />
                    <div className="rounded-full w-1 h-1 absolute bg-red-600 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
                </div>
            )}
        </div>
    );
}

export default Game;
