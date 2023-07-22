type GameData = {
    title: string;
    image: string;
    gameId: string;
    id: string;
    characters: {
        name: string;
        url: string;
        found: boolean;
        marker: { x: number; y: number };
    }[];
};

export default GameData;
