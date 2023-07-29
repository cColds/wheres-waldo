import { Link } from "react-router-dom";
import games from "../gameData";

function Card() {
    return (
        <>
            {games.map((game) => {
                return (
                    <div
                        key={game.id}
                        className="flex grow flex-col shadow-lg max-w-full w-[350px] h-[350px] dark:bg-dark-secondary rounded-lg"
                    >
                        <img
                            src={game.image}
                            alt="game preview"
                            className="h-[70%] object-cover rounded-t-lg"
                            draggable={false}
                        />
                        <div className="p-3 flex flex-col justify-between grow items-center">
                            <h2 className="text-lg overflow-hidden text-center w-full whitespace-nowrap text-ellipsis">
                                {game.title}
                            </h2>
                            <Link
                                to={`/${game.gameId}`}
                                className="rounded-lg bg-primary text-light-background px-6 py-2 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95"
                            >
                                Start Game
                            </Link>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Card;
