import GameData from "../types/gameData";

const getCharsAlive = (game: GameData | null) => {
    if (game == null) return null;
    const { characters } = game;

    const charsAlive = characters.filter((char) => !char.found);

    return charsAlive;
};

export default getCharsAlive;
