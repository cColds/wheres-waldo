const games = [
    {
        title: "Dragon Charmer's Island",
        image: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-1%2Fbackground%2Fdragon-charmers-island.webp?alt=media&token=9b698d26-a9ad-45c4-aa42-926ef9500de6",
        gameId: "game-1",
        id: crypto.randomUUID(),
        characters: [
            {
                name: "Raft Man",
                url: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-1%2Fcharacters%2Fraft-man.png?alt=media&token=0ec1ef07-2511-4001-a3d9-96ee14248598",
                found: false,
                marker: { x: 148, y: 1737 },
            },
            {
                name: "Wizard",
                url: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-1%2Fcharacters%2Fwizard.png?alt=media&token=efbb508b-4cce-432d-920c-50297f9565e6",
                found: false,
                marker: { x: 2198, y: 2708 },
            },
            {
                name: "Dragon",
                url: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-1%2Fcharacters%2Fdragon.png?alt=media&token=41009fe7-4cde-4534-bc2f-0e3b79a125c7",
                found: false,
                marker: { x: 1925, y: 1741 },
            },
        ],
    },
];

export default games;
