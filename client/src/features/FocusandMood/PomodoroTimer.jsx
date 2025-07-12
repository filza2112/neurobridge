import React, { useState, useEffect } from "react";

const Pomodoro = () => {
    const [sessionLength, setSessionLength] = useState(25); // in minutes
    const [breakLength, setBreakLength] = useState(5);
    const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev === 1) {
                        if (isBreak) {
                            setIsBreak(false);
                            return sessionLength * 60;
                        } else {
                            setIsBreak(true);
                            setCompletedSessions((prev) => prev + 1);
                            return breakLength * 60;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, isBreak, sessionLength, breakLength]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (

        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md min-h-[500px] border border-accent">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">
                🍅 Pomodoro Timer
            </h1>

            <div className="flex justify-between mb-4">
                <div className="flex flex-col items-center">
                    <label className="text-text-secondary font-semibold">Focus</label>
                    <input
                        type="number"
                        value={sessionLength}
                        onChange={(e) => setSessionLength(Number(e.target.value))}
                        className="w-16 text-center border border-accent rounded p-1 bg-background"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <label className="text-text-secondary font-semibold">Break</label>
                    <input
                        type="number"
                        value={breakLength}
                        onChange={(e) => setBreakLength(Number(e.target.value))}
                        className="w-16 text-center border border-accent rounded p-1 bg-background"
                    />
                </div>
            </div>

            <div className="text-center my-6">
                <div className="text-5xl font-bold text-primary">
                    {formatTime(secondsLeft)}
                </div>
                <div className="text-sm text-text-secondary">
                    {isBreak ? "Break Time ☕" : "Focus Time 🔥"}
                </div>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button
                    onClick={() => {
                        setIsRunning(false);
                        setSecondsLeft(sessionLength * 60);
                        setIsBreak(false);
                    }}
                    className="border border-primary text-primary px-4 py-2 rounded hover:bg-accent hover:text-background transition"
                >
                    Reset
                </button>
            </div>

            <div className="mt-6 text-center text-text-secondary">
                Completed Pomodoros: <span className="font-semibold text-primary">{completedSessions}</span>
            </div>
        </div>
    );
};

export default Pomodoro;
