import { Link } from "react-router-dom";
import notFound from "../assets/404.png";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <img
                src={notFound}
                alt="not found"
                className="rounded-lg max-w-full w-[300px]"
                width="100%"
                height="100%"
            />
            <h1 className="text-3xl my-6">Page not found</h1>
            <p className="text-slate-600 dark:text-slate-400 text-center">
                The link you visited doesn't exist.{" "}
                <Link
                    to="/"
                    className="text-black dark:text-white font-nunito-bold"
                >
                    Back to home.
                </Link>
            </p>
        </div>
    );
}

export default NotFound;
