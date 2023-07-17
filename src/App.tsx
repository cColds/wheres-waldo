import { Routes, Route } from "react-router";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<p>Home</p>} />
            </Routes>

            <button className="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">
                ...aa
            </button>
        </>
    );
}

export default App;
