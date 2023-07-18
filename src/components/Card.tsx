import { Link } from "react-router-dom";

function Card() {
    return (
        <>
            <div className="flex flex-col shadow-lg max-w-full w-[350px] h-[350px] bg-light-secondary dark:bg-dark-secondary rounded-lg">
                <img
                    src="src/assets/dragon-charmers-island.webp"
                    alt="game preview"
                    className="text-light-text dark:text-dark-text h-[70%] object-cover rounded-t-lg"
                    draggable={false}
                />
                <div className="p-3 flex flex-col justify-between grow items-center">
                    <h2 className="text-dark-background dark:text-light-background text-lg overflow-hidden text-center w-full whitespace-nowrap text-ellipsis">
                        Dragon Charmer's Island
                    </h2>
                    <Link
                        to="game-1"
                        className="rounded-lg bg-primary text-light-background px-6 py-2 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95"
                    >
                        Start Game
                    </Link>
                </div>
            </div>
            <div className="flex flex-col shadow-lg max-w-full w-[350px] h-[350px] bg-light-secondary dark:bg-dark-secondary rounded-lg">
                <img
                    src="src/assets/dragon-charmers-island.webp"
                    alt="game preview"
                    className="text-light-text dark:text-dark-text h-[70%] object-cover rounded-t-lg"
                    draggable={false}
                />
                <div className="p-3 flex flex-col justify-between grow items-center">
                    <h2 className="text-dark-background dark:text-light-background text-lg overflow-hidden text-center w-full whitespace-nowrap text-ellipsis">
                        Dragon Charmer's Island
                    </h2>
                    <Link
                        to="game-1"
                        className="rounded-lg bg-primary text-light-background px-6 py-2 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95"
                    >
                        Start Game
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Card;
