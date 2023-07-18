import { Routes, Route } from "react-router";
import Nav from "./components/Nav";

function App() {
    return (
        <>
            <header>
                <Nav />
            </header>
            <main className="dark:bg-black">
                <Routes>
                    <Route path="/" element={<p>Home</p>} />
                </Routes>
            </main>
        </>
    );
}

export default App;
