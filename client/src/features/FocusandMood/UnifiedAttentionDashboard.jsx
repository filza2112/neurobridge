import React, { useEffect, useState } from "react";



export default function UnifiedAttentionDashboard({ userId }) {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [simon, digit, stroop] = await Promise.all([
        fetch(`http://localhost:5000/api/attention/simon/${userId}`).then(res => res.json()),
        fetch(`http://localhost:5000/api/attention/digit/${userId}`).then(res => res.json()),
        fetch(`http://localhost:5000/api/attention/stroop/${userId}`).then(res => res.json()),
      ]);


      const getAvg = (arr, key) =>
        arr.length ? arr.reduce((a, b) => a + (b[key] || 0), 0) / arr.length : 0;

      const calcAccuracy = arr =>
        arr.length ? (arr.filter(x => x.correct).length / arr.length) * 100 : 0;

      const simonAvg = {
        level: getAvg(simon, "level"),
        accuracy: calcAccuracy(simon),
      };
      const digitAvg = {
        level: getAvg(digit, "level"),
        attempts: digit.length,
      };
      const stroopAvg = {
        reaction: getAvg(stroop, "timeTaken"),
        accuracy: calcAccuracy(stroop),
      };

      setMetrics({ simonAvg, digitAvg, stroopAvg });
    };

    fetchData();
  }, [userId]);

  if (!metrics) return <div className="text-center text-text-secondary">Loading attention data...</div>;

  // Radar chart combines scaled metrics
  const radarData = [
    { subject: "Memory", value: metrics.digitAvg.level, fullMark: 12 },
    { subject: "Focus", value: metrics.simonAvg.level, fullMark: 12 },
    { subject: "Reaction", value: 100 - metrics.stroopAvg.reaction, fullMark: 100 },
    { subject: "Accuracy", value: (metrics.simonAvg.accuracy + metrics.stroopAvg.accuracy) / 2, fullMark: 100 },
  ];

  return (
    <div className="bg-background-alt mt-10 p-6 rounded-xl shadow-md">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-primary">🎯 Simon Says</h3>
          <p className="text-text-secondary">Avg Level: <span className="text-primary font-bold">{metrics.simonAvg.level.toFixed(1)}</span></p>
          <p className="text-text-secondary">Accuracy: <span className="text-primary font-bold">{metrics.simonAvg.accuracy.toFixed(1)}%</span></p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-primary">🔢 Digit Span</h3>
          <p className="text-text-secondary">Avg Level: <span className="text-primary font-bold">{metrics.digitAvg.level.toFixed(1)}</span></p>
          <p className="text-text-secondary">Attempts: <span className="text-primary font-bold">{metrics.digitAvg.attempts}</span></p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-primary">🟥 Stroop Test</h3>
          <p className="text-text-secondary">Avg Reaction: <span className="text-primary font-bold">{metrics.stroopAvg.reaction.toFixed(0)} ms</span></p>
          <p className="text-text-secondary">Accuracy: <span className="text-primary font-bold">{metrics.stroopAvg.accuracy.toFixed(1)}%</span></p>
        </div>
      </div>
      
    </div>
  );
}
