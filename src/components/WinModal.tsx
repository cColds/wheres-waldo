function WinModal({ totalTimeInSeconds }: { totalTimeInSeconds: number }) {
    return (
        <div className="fixed bg-black/75 animate-fade-in inset-0 z-50">
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-light-background dark:bg-dark-background rounded-lg p-4 ">
                <div className="mb-3">
                    <h1 className="text-xl">
                        You finished in {totalTimeInSeconds.toFixed(2)}s!
                    </h1>
                    <p>Submit your time to the leaderboard</p>
                </div>

                <form className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1">
                        <span>Username</span>
                        <input
                            type="text"
                            minLength={1}
                            maxLength={25}
                            required
                            className="w-full rounded-md bg-transparent border-[1px] border-slate-600 h-8"
                        />
                    </label>

                    <button
                        type="submit"
                        className="self-end rounded-lg bg-primary text-light-background px-6 py-1.5 hover:brightness-90 transition ease-in-out duration-300 active:scale-95"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WinModal;
