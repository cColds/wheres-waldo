import GameData from "../types/gameData";

function Game({ game }: { game: GameData | null }) {
    if (game == null) return null;

    return (
        <>
            <img src={game.image} alt="game" height="100%" width="100%" />
        </>
    );
}

export default Game;
