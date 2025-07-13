import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import 'react-calendar/dist/Calendar.css';

const moodColors = {
  0: "bg-red-500",
  25: "bg-blue-900",
  50: "bg-blue-500",
  75: "bg-green-300",
  100: "bg-green-500",
};

export default function MoodCalendar({ userId }) {
  const [moodLogs, setMoodLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

    useEffect(() => {
      if (!userId) return;
    fetch(`http://localhost:5000/api/mood/all/${userId}`)
      .then((res) => res.json())
        .then((data) => {
          console.log("Mood logs fetched:", data);
        setMoodLogs(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching mood logs:", err));

  }, [userId]);

  const getMoodEntry = (date) => {
    return moodLogs.find((log) => {
      const logDate = new Date(log.timestamp);
      return (
        logDate.getFullYear() === date.getFullYear() &&
        logDate.getMonth() === date.getMonth() &&
        logDate.getDate() === date.getDate()
      );
    });
  };

  const getTileClassName = ({ date, view }) => {
    if (view !== "month") return "";
    const entry = getMoodEntry(date);
    if (!entry) return "";
    return `${moodColors[entry.mood]} text-white rounded-md`; // full background color
  };



  const handleDateClick = (date) => {
    setSelectedDate(date);
    const entry = getMoodEntry(date);
    setSelectedEntry(entry);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Mood Calendar</h2>
      <Calendar
        className="mx-auto" // centers the calendar
        onClickDay={handleDateClick}
        tileClassName={getTileClassName}
      />
      {selectedEntry && (
        <div className="mt-4 p-4 border rounded bg-white shadow-md">
          <p>
            <strong>Mood:</strong> {selectedEntry.mood}
          </p>
          <p>
            <strong>Why:</strong> {selectedEntry.why || "No reason logged"}
          </p>
          <p>
            <strong>Tags:</strong>{" "}
            {selectedEntry.tags?.length > 0
              ? selectedEntry.tags.join(", ")
              : "None"}
          </p>
        </div>
      )}
    </div>
  );
}
