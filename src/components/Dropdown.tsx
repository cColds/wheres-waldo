import GameData from "../types/gameData";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../firebase";

const db = getFirestore(app);

type Dimension = {
    width: number;
    height: number;
};

type NaturalDimensions = {
    naturalWidth: number;
    naturalHeight: number;
};

type Characters = {
    [key: string]: {
        startWidth: number;
        endWidth: number;
        startHeight: number;
        endHeight: number;
    }[];
};

function Dropdown({
    items,
    coords,
    naturalDimensions,
    imgDimensions,
    updateGameCharacters,
}: {
    items: GameData;
    coords: Dimension;
    naturalDimensions: NaturalDimensions;
    imgDimensions: Dimension;
    updateGameCharacters: (updatedChars: GameData) => void;
}) {
    const handleCharacterClick = async (name: string) => {
        const docRef = doc(db, `${items.gameId}/characters`);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return;

        const characters = docSnap.data() as Characters;
        const character = characters[name];

        const { naturalWidth, naturalHeight } = naturalDimensions;
        const naturalWidthCoord = Math.round(
            (coords.width / imgDimensions.width) * naturalWidth
        );
        const naturalHeightCoord = Math.round(
            (coords.height / imgDimensions.height) * naturalHeight
        );

        const isValidCoord = character.find((point) => {
            const isWidthWithinCoord =
                naturalWidthCoord >= point.startWidth &&
                naturalWidthCoord <= point.endWidth;

            const isHeightWithinCoord =
                naturalHeightCoord >= point.startHeight &&
                naturalHeightCoord <= point.endHeight;

            return isWidthWithinCoord && isHeightWithinCoord;
        });

        if (isValidCoord) {
            const updatedCharacter = items.characters.map((char) => {
                if (char.name === name) {
                    return { ...char, found: true };
                }

                return char;
            });
            updateGameCharacters({ ...items, characters: updatedCharacter });
        }
    };

    return (
        <ul className="absolute bg-light-background dark:bg-dark-secondary rounded-lg right-[-150px] animate-fade-in">
            {items.characters.map((character) => {
                if (character.found) return null;

                return (
                    <li key={character.name} className="h-full">
                        <button
                            onClick={() => handleCharacterClick(character.name)}
                            className="flex gap-3 hover:bg-dark-background/10 dark:hover:bg-white/10 w-full p-3 transition duration-300 ease-in-out"
                        >
                            <img
                                src={character.url}
                                alt="character"
                                width="40px"
                                height="40px"
                                draggable="false"
                                className="shadow-lg rounded-lg aspect-square"
                            />
                            <span>{character.name}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default Dropdown;
