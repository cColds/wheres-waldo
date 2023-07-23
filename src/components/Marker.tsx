import { FaMapMarkerAlt } from "react-icons/fa";
import Dimension from "../types/dimension";
import NaturalDimension from "../types/naturalDimension";

type Characters = {
    name: string;
    url: string;
    found: boolean;
    marker: { x: number; y: number };
}[];

function Marker({
    characters,
    naturalDimension,
    imgDimension,
}: {
    characters: Characters;
    naturalDimension: NaturalDimension;
    imgDimension: Dimension;
}) {
    return (
        <>
            {characters.map((character) => {
                if (!character.found) return null;
                const { naturalWidth, naturalHeight } = naturalDimension;
                const { width, height } = imgDimension;
                const { x, y } = character.marker;
                const coordX = (x / naturalWidth) * width;
                const coordY = (y / naturalHeight) * height;
                return (
                    <FaMapMarkerAlt
                        style={{ left: coordX, top: coordY }}
                        className="absolute z-10 text-red-800 w-5 h-5 translate-x-[-50%] translate-y-[-50%]"
                        key={character.name}
                    />
                );
            })}
        </>
    );
}

export default Marker;
