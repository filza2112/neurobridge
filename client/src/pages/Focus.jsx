import React, { useEffect, useState } from "react";
import MoodSlider from "../features/FocusandMood/MoodSlider";

import CPTGame from "../features/FocusandMood/CPTGame";
import PomodoroTimer from "../features/FocusandMood/PomodoroTimer";
import Distraction from "../features/FocusandMood/Distraction";
import CustomAttentionTest from "../features/FocusandMood/CustomAttentionTest";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
const api = process.env.REACT_APP_API_URL;


function FocusPage() {
    const [startTime] = useState(Date.now());
    const userId = localStorage.getItem("userId");
    console.log("FocusPage userId:", userId);
    // Tab visibility change tracking
    useEffect(() => {
        const handleVisibility = () => {
            fetch(`${api}/api/focus/visibility`, {
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
    }, [userId]);

    // Session duration logging
    useEffect(() => {
        const handleBeforeUnload = () => {
            const endTime = Date.now();
            const duration = Math.round((endTime - startTime) / 1000);
            navigator.sendBeacon(`${api}/api/focus/session`, JSON.stringify({
                userId,
                sessionStart: new Date(startTime),
                sessionEnd: new Date(endTime),
                durationSeconds: duration,
            }));
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [startTime, userId]);

    return (
      <>
        <Navbar />
        <div className="font-mullish bg-background min-h-screen text-primary p-6">
            <h1 className="text-3xl font-bold text-center mb-2 mt-4">Focus & Mood Tracker</h1>
            <div className="text-center mb-4 text-text-secondary">
                <p>Track your focus and mood to improve your mental well-being.</p>
            </div>
            {/* Focus Tracking */}
            <section className="flex flex-row justify-center items-start bg-background-alt rounded-2xl shadow-lg gap-4 p-6">
                <PomodoroTimer/>
                <Distraction />
            </section>

            <section className="flex flex-row justify-center items-start bg-background-alt rounded-2xl shadow-lg gap-4 p-6">
                <CPTGame />
                <CustomAttentionTest userId={userId}/>
            </section>



            {/* Mood Tracking */}
            <section className="flex flex-row justify-center items-start bg-background-alt rounded-2xl shadow-lg gap-4 p-6">
                <MoodSlider />
            </section>

          <Footer />
        </div>
      </>
    );
}

export default FocusPage;
