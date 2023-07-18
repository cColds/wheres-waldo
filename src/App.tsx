import { Routes, Route } from "react-router";
import Nav from "./components/Nav";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <header>
                <Nav />
            </header>
            <main className="dark:bg-black">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
