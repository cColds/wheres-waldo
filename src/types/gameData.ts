type GameData = {
    title: string;
    image: string;
    gameId: string;
    id: string;
    characters: {
        name: string;
        url: string;
        found: boolean;
    }[];
};

export default GameData;
