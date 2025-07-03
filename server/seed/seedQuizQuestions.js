require("dotenv").config();
const mongoose = require("mongoose");

const QuizQuestion = require("../models/QuizQuestion");

const MONGODB_URI = process.env.MONGODB_URI;

const questions = [
  // —— ADHD (Likert, 5 questions) ——
  {
    id: "adhd1",
    category: "Attention",
    type: "likert",
    question:
      "How often do you start tasks but get easily distracted and forget to finish them?",
    options: [
      { text: "Never", traits: ["ADHD"], weight: 0 },
      { text: "Rarely", traits: ["ADHD"], weight: 1 },
      { text: "Sometimes", traits: ["ADHD"], weight: 2 },
      { text: "Often", traits: ["ADHD"], weight: 3 },
      { text: "Always", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd2",
    category: "Impulsivity",
    type: "likert",
    question:
      "How often do you act on sudden urges without thinking through the consequences?",
    options: [
      { text: "Never", traits: ["ADHD"], weight: 0 },
      { text: "Rarely", traits: ["ADHD"], weight: 1 },
      { text: "Sometimes", traits: ["ADHD"], weight: 2 },
      { text: "Often", traits: ["ADHD"], weight: 3 },
      { text: "Always", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd3",
    category: "Hyperactivity",
    type: "likert",
    question:
      "How often do you feel restless or find it difficult to stay seated?",
    options: [
      { text: "Never", traits: ["ADHD"], weight: 0 },
      { text: "Rarely", traits: ["ADHD"], weight: 1 },
      { text: "Sometimes", traits: ["ADHD"], weight: 2 },
      { text: "Often", traits: ["ADHD"], weight: 3 },
      { text: "Always", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd4",
    category: "Organization",
    type: "likert",
    question:
      "How often are you disorganized or messy when planning for tasks?",
    options: [
      { text: "Never", traits: ["ADHD"], weight: 0 },
      { text: "Rarely", traits: ["ADHD"], weight: 1 },
      { text: "Sometimes", traits: ["ADHD"], weight: 2 },
      { text: "Often", traits: ["ADHD"], weight: 3 },
      { text: "Always", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd5",
    category: "Forgetfulness",
    type: "likert",
    question: "How often do you forget important dates, names, or deadlines?",
    options: [
      { text: "Never", traits: ["ADHD"], weight: 0 },
      { text: "Rarely", traits: ["ADHD"], weight: 1 },
      { text: "Sometimes", traits: ["ADHD"], weight: 2 },
      { text: "Often", traits: ["ADHD"], weight: 3 },
      { text: "Always", traits: ["ADHD"], weight: 4 },
    ],
  },

  // —— Autism (Likert, 5 questions) ——
  {
    id: "autism1",
    category: "Social Perception",
    type: "likert",
    question: "I often find it difficult to understand subtle social cues.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Agree", traits: ["Autism"], weight: 2 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 3 },
    ],
  },
  {
    id: "autism2",
    category: "Routine & Change",
    type: "likert",
    question: "I feel anxious when my daily routine is unexpectedly changed.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Agree", traits: ["Autism"], weight: 2 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 3 },
    ],
  },
  {
    id: "autism3",
    category: "Sensory Sensitivity",
    type: "likert",
    question:
      "Certain noises, lights, or textures overwhelm me more than others.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Agree", traits: ["Autism"], weight: 2 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 3 },
    ],
  },
  {
    id: "autism4",
    category: "Focus on Detail",
    type: "likert",
    question:
      "I prefer focusing on specific details rather than the big picture.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Agree", traits: ["Autism"], weight: 2 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 3 },
    ],
  },
  {
    id: "autism5",
    category: "Social Energy",
    type: "likert",
    question: "Social events often leave me feeling drained afterward.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Agree", traits: ["Autism"], weight: 2 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 3 },
    ],
  },

  // —— OCD (Likert, 5 questions) ——
  {
    id: "ocd1",
    category: "Obsessions",
    type: "likert",
    question: "How often do unwanted thoughts replay in your mind?",
    options: [
      { text: "Never", traits: ["OCD"], weight: 0 },
      { text: "Rarely", traits: ["OCD"], weight: 1 },
      { text: "Sometimes", traits: ["OCD"], weight: 2 },
      { text: "Often", traits: ["OCD"], weight: 3 },
      { text: "Always", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd2",
    category: "Compulsions",
    type: "likert",
    question: "I feel a strong urge to repeat actions to ease my anxiety.",
    options: [
      { text: "Never", traits: ["OCD"], weight: 0 },
      { text: "Rarely", traits: ["OCD"], weight: 1 },
      { text: "Sometimes", traits: ["OCD"], weight: 2 },
      { text: "Often", traits: ["OCD"], weight: 3 },
      { text: "Always", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd3",
    category: "Control",
    type: "likert",
    question: "I spend time checking or sorting things repeatedly.",
    options: [
      { text: "Never", traits: ["OCD"], weight: 0 },
      { text: "Rarely", traits: ["OCD"], weight: 1 },
      { text: "Sometimes", traits: ["OCD"], weight: 2 },
      { text: "Often", traits: ["OCD"], weight: 3 },
      { text: "Always", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd4",
    category: "Anxiety Relief",
    type: "likert",
    question:
      "I feel distressed if I can’t complete a ritual or pattern of behavior.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Agree", traits: ["OCD"], weight: 2 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 3 },
    ],
  },
  {
    id: "ocd5",
    category: "Intrusive Thoughts",
    type: "likert",
    question:
      "Do you find yourself stuck on negative thoughts you can’t easily shake off?",
    options: [
      { text: "Never", traits: ["OCD"], weight: 0 },
      { text: "Rarely", traits: ["OCD"], weight: 1 },
      { text: "Sometimes", traits: ["OCD"], weight: 2 },
      { text: "Often", traits: ["OCD"], weight: 3 },
      { text: "Always", traits: ["OCD"], weight: 4 },
    ],
  },
  // —— Scenario-Based (5 questions) ——
  {
    id: "scenario1",
    category: "Scenario",
    type: "scenario",
    question: "You realize you forgot your homework at home. What do you do?",
    options: [
      { text: "Panic and replay it in your mind", traits: ["OCD"], weight: 1 },
      { text: "Say 'Oops I forgot' and move on", traits: ["ADHD"], weight: 1 },
      { text: "Freeze and avoid engaging", traits: ["Autism"], weight: 1 },
    ],
  },
  {
    id: "scenario2",
    category: "Scenario",
    type: "scenario",
    question: "Your daily plan is disrupted. What’s your reaction?",
    options: [
      {
        text: "Feel agitated and try to restore order",
        traits: ["OCD"],
        weight: 1,
      },
      { text: "Switch to a new plan easily", traits: ["ADHD"], weight: 1 },
      {
        text: "Feel anxious and cling to something familiar",
        traits: ["Autism"],
        weight: 1,
      },
    ],
  },
  {
    id: "scenario3",
    category: "Scenario",
    type: "scenario",
    question: "A loud, chaotic environment is around you—what do you do?",
    options: [
      { text: "Try to control your surroundings", traits: ["OCD"], weight: 1 },
      {
        text: "Become distracted and engage randomly",
        traits: ["ADHD"],
        weight: 1,
      },
      { text: "Find a quiet spot and observe", traits: ["Autism"], weight: 1 },
    ],
  },
  {
    id: "scenario4",
    category: "Scenario",
    type: "scenario",
    question: "You have some unplanned free time—what’s your response?",
    options: [
      { text: "Organize something meticulously", traits: ["OCD"], weight: 1 },
      { text: "Jump into a hobby impulsively", traits: ["ADHD"], weight: 1 },
      { text: "Stick with your routine", traits: ["Autism"], weight: 1 },
    ],
  },
  {
    id: "scenario5",
    category: "Scenario",
    type: "scenario",
    question:
      "Facing a social gathering you didn’t prepare for—what do you do?",
    options: [
      { text: "Recheck what to say/do and worry", traits: ["OCD"], weight: 1 },
      {
        text: "Jump into conversations unfiltered",
        traits: ["ADHD"],
        weight: 1,
      },
      { text: "Hang back and quietly observe", traits: ["Autism"], weight: 1 },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await QuizQuestion.deleteMany({});
    await QuizQuestion.insertMany(questions);

    console.log("Questions inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
