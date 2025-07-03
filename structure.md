neurobridge/
│
├── client/                       # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/              # Images, logos, icons
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Route-level components (Home, Dashboard, Chat)
│   │   ├── features/            # Core feature folders
│   │   │   ├── Chat/            # LLM Therapy chat UI
│   │   │   ├── RoutineBuilder/  # Routine builder form & logic
│   │   │   ├── Dashboard/       # Therapist/Caregiver dashboard
│   │   │   ├── MoodTracker/     # Mood + focus input
│   │   │   ├── NeuroPlay/       # Games (basic or embedded Phaser games)
│   │   ├── services/            # API calls (axios)
│   │   ├── App.js
│   │   └── index.js
│
├── server/                       # Node.js + Express Backend
│   ├── controllers/              # Route logic (chat, routine, user, mood)
│   ├── routes/                   # Express route definitions
│   ├── models/                   # Mongoose schemas
│   ├── middleware/               # Auth, error handling
│   ├── utils/                    # GPT prompt logic, log processors
│   ├── config/                   # DB and OpenAI config
│   └── index.js                  # App entry point
│
├── ml/                           # ML models and scripts (optional for scoring)
│   ├── emotion_classifier.py     # Voice/text emotion detection
│   ├── focus_predictor.py        # Routine completion/focus scoring logic
│   └── model_weights/            # Trained model storage (if any)
│
├── .env                          # API keys, Mongo URI (never push this)
├── .gitignore
├── package.json
├── README.md
└── LICENSE (optional)
