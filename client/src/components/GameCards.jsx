import React from "react";
import { useNavigate } from "react-router-dom";

const theme = {
  background: "#FFFFFF",
  backgroundAlt: "#EAF4F4",
  accent: "#CCE3DE",
  textDark: "#4a6459",
  textSecondary: "#A4C3B2",
  primary: "#6B9080",
};

const games = [
  {
    title: "🧠 Memory Game",
    path: "/features/game/Memory",
    description: "Test your memory with a fun tile-flipping challenge.",
  },
  {
    title: "🎯 Another Game",
    path: "/another-game",
    description: "Explore another fun game to sharpen your mind!",
  },
];

const CardGames = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h1
        className="text-3xl md:text-4xl font-bold mb-8"
        style={{ color: theme.textDark }}
      >
        🎮 Choose a Game
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {games.map((game, idx) => (
          <div
            key={idx}
            className="cursor-pointer rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme.background,
              border: `2px solid ${theme.accent}`,
              color: theme.textDark,
            }}
            onClick={() => navigate(game.path)}
          >
            <h2 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
              {game.title}
            </h2>
            <p className="text-base" style={{ color: theme.textSecondary }}>
              {game.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGames;
