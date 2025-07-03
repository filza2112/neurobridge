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
            <h1 className="text-3xl font-bold text-center mb-8">Focus & Mood Tracker</h1>

            {/* Focus Tracking */}
            <section className="bg-background-alt p-6 rounded-2xl shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4"> Focus Tracking</h2>
                <CPTGame />
                <FocusChart />
            </section>

            {/* Mood Tracking */}
            <section className="bg-background-alt p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4"> Mood Tracking</h2>
                <MoodSlider />
                <MoodDiary />
                <MoodChart />
            </section>
            <div className="text-center mt-8 text-text-secondary">
                <p>Track your focus and mood to improve your mental well-being.</p>
                <p>Data is saved automatically for your convenience.</p>
            </div>
    </div >
  );
}

export default FocusPage;
