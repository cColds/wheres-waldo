import Card from "../components/Card";

function Home() {
    return (
        <div className="flex flex-col items-center p-4 gap-6">
            <h1 className="text-3xl font-nunito-bold">Games</h1>
            <div className="flex gap-6 flex-wrap justify-center w-full">
                <Card />
            </div>
        </div>
    );
}
export default Home;
