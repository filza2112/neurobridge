import React, { useEffect, useState } from "react";
const api = process.env.REACT_APP_API_URL;



export default function UnifiedAttentionDashboard({userId}) {
  const [metrics, setMetrics] = useState(null);
  console.log("UnifiedAttentionDashboard userId:", userId);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${api}/api/attention/summary/${userId}`);
        const summary = await res.json();
        console.log("📊 Summary response:", summary);

        const { simon, digit, stroop } = summary;

        const simonAvg = {
          level: simon.maxLevel || 0,
          accuracy: simon.accuracy || 0,
        };
        const digitAvg = {
          reaction: digit.avgTime/1000 || 0,
          accuracy: digit.accuracy || 0,
        };
        const stroopAvg = {
          reaction: stroop.avgTime/1000 || 0,
          accuracy: stroop.accuracy || 0,
        };

        setMetrics({ simonAvg, digitAvg, stroopAvg });
      } catch (err) {
        console.error("Error fetching attention summary:", err);
      }
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
          <p className="text-text-secondary">Avg Time taken: <span className="text-primary font-bold">{metrics.digitAvg.reaction.toFixed(1)} s</span></p>
          <p className="text-text-secondary">Accuracy: <span className="text-primary font-bold">{metrics.digitAvg.accuracy}%</span></p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-primary">🟥 Stroop Test</h3>
          <p className="text-text-secondary">Avg Reaction: <span className="text-primary font-bold">{metrics.stroopAvg.reaction.toFixed(0)} s</span></p>
          <p className="text-text-secondary">Accuracy: <span className="text-primary font-bold">{metrics.stroopAvg.accuracy.toFixed(1)}%</span></p>
        </div>
      </div>

    </div>
  );
}
