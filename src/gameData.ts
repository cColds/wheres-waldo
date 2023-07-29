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

    {
        title: "Super Mario Bros",
        image: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fbackground%2Fsuper-mario-bros.webp?alt=media&token=4e5d2551-7f70-4dad-a59b-b6bbdf40ecda",
        gameId: "game-2",
        id: crypto.randomUUID(),
        characters: [
            {
                name: "Fire Mario",
                url: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fcharacters%2Ffire-mario.webp?alt=media&token=e048c6ab-a7d7-43af-b380-8b3d7c55822c",
                found: false,
                marker: { x: 3000, y: 2270 },
            },
            {
                name: "King Boo",
                url: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fcharacters%2Fking-boo.webp?alt=media&token=8d8f1284-a0a0-4981-8cca-ee5dfe9206ca",
                found: false,
                marker: { x: 1102, y: 2722 },
            },
            {
                name: "Waluigi",
                url: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fcharacters%2Fwaluigi.webp?alt=media&token=ea196878-f730-43c7-834c-b8a63e52330e",
                found: false,
                marker: { x: 2541, y: 4738 },
            },
        ],
    },

    {
        title: "Aquatic Aquarium",
        image: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-3%2Fbackground%2Faquatic-aquarium.webp?alt=media&token=c35739d5-e864-4a60-8902-70f07d052fe4",
        gameId: "game-3",
        id: crypto.randomUUID(),
        characters: [
            {
                name: "Feebas",
                url: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-3%2Fcharacters%2Ffeebas.webp?alt=media&token=5d39eda0-96f8-4fe8-9e40-5668bf6dc8a7",
                found: false,
                marker: { x: 222, y: 703 },
            },
            {
                name: "Starmie",
                url: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-3%2Fcharacters%2Fstarmie.webp?alt=media&token=04ebb186-fe03-40d2-93f5-94edda079eaa",
                found: false,
                marker: { x: 1916, y: 880 },
            },
            {
                name: "Mantyke",
                url: "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-3%2Fcharacters%2Fmantyke.webp?alt=media&token=ea658a2b-c6f4-4913-b63b-becb487fbd29",
                found: false,
                marker: { x: 2108, y: 449 },
            },
        ],
    },
];

export default games;
