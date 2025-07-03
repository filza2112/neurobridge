import React, { useEffect, useState } from "react";
import MoodSlider from "../features/FocusandMood/MoodSlider";
import MoodDiary from "../features/FocusandMood/MoodDiary";
import CPTGame from "../features/FocusandMood/CPTGame";
import FocusChart from "../features/FocusandMood/FocusChart";
import MoodChart from "../features/FocusandMood/MoodChart";


const userId = "demo-user"; // Replace with real user ID from auth if available

function FocusPage() {
    const [startTime, setStartTime] = useState(Date.now());

    // Tab visibility change tracking
    useEffect(() => {
        const handleVisibility = () => {
            fetch("http://localhost:5000/api/focus/visibility", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    timestamp: new Date(),
                    visible: !document.hidden,
                }),
            });
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    // Session duration logging
    useEffect(() => {
        const handleBeforeUnload = () => {
            const endTime = Date.now();
            const duration = Math.round((endTime - startTime) / 1000);
            navigator.sendBeacon("http://localhost:5000/api/focus/session", JSON.stringify({
                userId,
                sessionStart: new Date(startTime),
                sessionEnd: new Date(endTime),
                durationSeconds: duration,
            }));
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [startTime]);

    return (
        <div className="font-mullish bg-background min-h-screen text-primary p-6">
            <h1 className="text-3xl font-bold text-center mb-2">Focus & Mood Tracker</h1>
            <div className="text-center mb-4 text-text-secondary">
                <p>Track your focus and mood to improve your mental well-being.</p>
            </div>
            {/* Focus Tracking */}
            <section className="bg-background-alt p-6 rounded-2xl shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4"> Focus Tracking</h2>
                <CPTGame />
                <FocusChart />
            </section>

            {/* Mood Tracking */}
            <section className="bg-background-alt p-6 rounded-2xl shadow-lg mt-6">
                <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
                    Mood Tracking
                </h2>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Mood Slider (Left) */}
                    <div className="w-full md:w-1/2">
                        <MoodSlider />
                    </div>

                    {/* Mood Chart (Right) */}
                    <div className="w-full md:w-1/2">
                        <MoodChart />
                    </div>
                </div>
            </section>

            
        </div >
    );
}

export default FocusPage;
