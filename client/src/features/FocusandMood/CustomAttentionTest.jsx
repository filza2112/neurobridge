import React, { useState } from "react";
import StroopTest from "./StroopTest";
import DigitSpanTest from "./DigitSpanTest";
import SimonSaysTest from "./SimonSaysTest";
import UnifiedAttentionDashboard from "./UnifiedAttentionDashboard";

export default function CustomAttentionTest({ userId }) {
  const [testType, setTestType] = useState("stroop");
  const [difficulty, setDifficulty] = useState("medium");

  const renderTest = () => {
    const props = { userId, difficulty };
    switch (testType) {
      case "stroop": return <StroopTest {...props} />;
      case "digit-span": return <DigitSpanTest {...props} />;
      case "simon": return <SimonSaysTest {...props} />;
      default: return null;
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl shadow-lg max-w-xl w-full mx-auto">
      <h2 className="text-xl font-bold text-primary mb-4 text-center">🧠 Custom Attention Tests</h2>

      <div className="flex justify-between gap-4 mb-4">
        <select
          value={testType}
          onChange={(e) => setTestType(e.target.value)}
          className="w-full p-2 border border-accent rounded-md"
        >
          <option value="stroop">Stroop Test</option>
          <option value="digit-span">Digit Span</option>
          <option value="simon">Simon Says</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 border border-accent rounded-md"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {renderTest()}
      <div className="mt-6">
        <UnifiedAttentionDashboard userId="demo-user" />
      </div>

    </div>
  );
}
