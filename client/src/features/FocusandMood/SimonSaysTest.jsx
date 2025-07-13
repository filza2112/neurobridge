import React, { useState, useEffect } from "react";

const colors = ["red", "green", "blue", "yellow"];
const colorMap = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
};


export default function SimonSaysTest({ userId, difficulty }) {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [activeColor, setActiveColor] = useState(null);
    const [message, setMessage] = useState("");
    const [level, setLevel] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState(null);

    const getDelay = () => {
        switch (difficulty) {
            case "easy": return 1000;
            case "medium": return 600;
            case "hard": return 400;
            default: return 600;
        }
    };

    const playSequence = async (seq) => {
        setIsPlaying(true);
        for (let color of seq) {
            setActiveColor(color);
            await new Promise((r) => setTimeout(r, getDelay()));
            setActiveColor(null);
            await new Promise((r) => setTimeout(r, 200));
        }
        setIsPlaying(false);
    };

    const nextRound = () => {
        const nextColor = colors[Math.floor(Math.random() * 4)];
        const newSeq = [...sequence, nextColor];
        setSequence(newSeq);
        setUserSequence([]);
        playSequence(newSeq);
        setStartTime(Date.now());
    };

    useEffect(() => {
        nextRound();
    }, [difficulty]);


    const handleUserClick = (color) => {
        if (isPlaying) return;
        const newUserSeq = [...userSequence, color];
        setUserSequence(newUserSeq);

        if (sequence[newUserSeq.length - 1] !== color) {
            setMessage("Incorrect");
            saveToDB(false);
            setTimeout(() => resetGame(), 1500);
        } else if (newUserSeq.length === sequence.length) {
            setMessage("Correct");
            const endTime = Date.now();
            saveToDB(true, endTime - startTime);
            setLevel(level + 1);
            setTimeout(() => {
                setMessage("");
                nextRound();
            }, 1000);
        }
    };
    const [sessionAttempts, setSessionAttempts] = useState([]);

    const saveToDB = (correct, timeTaken = 0) => {
        const attempt = {
            userId,
            sequence,
            userInput: userSequence,
            correct,
            level: level + 1,
            timeTaken,
            difficulty,
            timestamp: new Date(),
        };
        setSessionAttempts((prev) => [...prev, attempt]);
    };



    const resetGame = () => {
        setSequence([]);
        setUserSequence([]);
        setLevel(0);
        setTimeout(() => nextRound(), 1000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl text-center w-full">
            <h2 className="text-2xl font-bold text-primary mb-4">🎯 Simon Says Test</h2>
            <p className="text-text-secondary mb-2">Repeat the sequence shown</p>
            <p className="text-sm mb-4">Level: <span className="text-primary font-bold">{level + 1}</span></p>

            <div className="grid grid-cols-2 gap-4 justify-center items-center mb-4">
                {colors.map((color) => (
                    <button
                        key={color}
                        className={`w-20 h-20 rounded-lg transition-all duration-150 ${colorMap[color]
                            } ${activeColor === color ? "opacity-100 scale-110" : "opacity-60"}`}
                        onClick={() => handleUserClick(color)}
                        disabled={isPlaying}
                    />
                ))}
            </div>

            {message && <p className="text-lg font-semibold text-text-secondary">{message}</p>}


        </div>
    );
}
