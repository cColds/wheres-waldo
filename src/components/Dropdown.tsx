import GameData from "../types/gameData";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../firebase";
import Dimension from "../types/dimension";
import NaturalDimension from "../types/naturalDimension";
import Characters from "../types/characters";
import DropdownPositions from "../types/dropdownPositions";

const db = getFirestore(app);

type Coordinate = {
    startWidth: number;
    endWidth: number;
    startHeight: number;
    endHeight: number;
};

type CharacterCoord = Coordinate[];

type CharactersCoord = {
    [key: string]: Coordinate[];
};

function Dropdown({
    items,
    coords,
    naturalDimension,
    imgDimension,
    updateGameCharacters,
    handleNotification,
    toggleTargetBox,
    toggleIsGameActive,
    dropdownPosition,
}: {
    items: GameData;
    coords: Dimension;
    naturalDimension: NaturalDimension;
    imgDimension: Dimension;
    updateGameCharacters: (updatedChars: GameData) => void;
    handleNotification: (message: string, isFound: boolean) => void;
    toggleTargetBox: () => void;
    toggleIsGameActive: () => void;
    dropdownPosition: DropdownPositions;
}) {
    const getUpdatedCharacter = (name: string) => {
        return items.characters.map((char) => {
            if (char.name === name) {
                return { ...char, found: true };
            }

            return char;
        });
    };

    const getCalculatedHeight = () => {
        const { naturalHeight } = naturalDimension;
        return Math.round(
            (coords.height / imgDimension.height) * naturalHeight
        );
    };

    const getCalculatedWidth = () => {
        const { naturalWidth } = naturalDimension;
        return Math.round((coords.width / imgDimension.width) * naturalWidth);
    };

    const isWithinCoord = (coord: number, start: number, end: number) => {
        return Math.abs(coord - start) <= 75 || Math.abs(coord - end) <= 75;
    };

    const checkValidCoord = (character: CharacterCoord) => {
        const widthCoord = getCalculatedWidth();
        const heightCoord = getCalculatedHeight();

        return character.find(
            ({ startWidth, endWidth, startHeight, endHeight }) => {
                const isWidthWithin = isWithinCoord(
                    widthCoord,
                    startWidth,
                    endWidth
                );
                const isHeightWithin = isWithinCoord(
                    heightCoord,
                    startHeight,
                    endHeight
                );
                return isWidthWithin && isHeightWithin;
            }
        );
    };

    const isEveryCharFound = (chars: Characters) =>
        chars.every((char) => char.found);

    const handleCharacterClick = async (name: string) => {
        toggleTargetBox();

        const docRef = doc(db, `${items.gameId}/characters`);
        const docSnap = await getDoc(docRef);
        const characters = docSnap.data() as CharactersCoord;
        const character = characters[name];

        const isValidCoord = checkValidCoord(character);
        if (!isValidCoord) {
            handleNotification(`Try again`, false);
            return;
        }

        const updatedCharacter = getUpdatedCharacter(name);
        if (isEveryCharFound(updatedCharacter)) {
            toggleIsGameActive();
            document.body.style.overflow = "hidden";
        }
        updateGameCharacters({
            ...items,
            characters: updatedCharacter,
        });
        handleNotification(`You found ${name}!`, true);
    };

    return (
        <>
            <ul
                style={dropdownPosition}
                className="absolute bg-light-background dark:bg-dark-secondary rounded-lg animate-fade-in w-[150px]"
            >
                {items.characters.map((character) => {
                    if (character.found) return null;

                    return (
                        <li key={character.name} className="h-full">
                            <button
                                onClick={() =>
                                    handleCharacterClick(character.name)
                                }
                                className="flex gap-3 hover:bg-dark-background/10 dark:hover:bg-white/10 w-full p-3 transition duration-300 ease-in-out"
                            >
                                <img
                                    src={character.url}
                                    alt="character"
                                    width="40"
                                    height="40"
                                    draggable="false"
                                    className="shadow-lg rounded-lg aspect-square"
                                />
                                <span>{character.name}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default Dropdown;
