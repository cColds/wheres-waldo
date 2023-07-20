import GameData from "../types/gameData";

function Dropdown({ items }: { items: GameData }) {
    return (
        <ul className="absolute bg-dark-secondary rounded-lg right-[-150px] animate-fade-in">
            {items.characters.map(({ name, url }) => {
                return (
                    <li key={name} className="h-full">
                        <button className="flex gap-3 hover:bg-white/30 w-full p-3 transition duration-300 ease-in-out">
                            <img
                                src={url}
                                alt="character"
                                width="40px"
                                height="40px"
                                draggable="false"
                                className="rounded-lg aspect-square"
                            />
                            <span>{name}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default Dropdown;
