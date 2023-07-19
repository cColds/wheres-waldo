type GameData = {
    title: string;
    image: string;
    gameId: string;
    id: string;
    characters: {
        name: string;
        url: string;
    }[];
};

export default GameData;
