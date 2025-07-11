require("dotenv").config();
const mongoose = require("mongoose");

const QuizQuestion = require("../models/QuizQuestion");

const MONGODB_URI = process.env.MONGODB_URI;

const questions = [
  // —— ADHD (Likert, 5 questions) ——
  {
    id: "adhd1",
    category: "Attention",
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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
    type: "first",
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

  //weekly
  {
    id: "adhd_weekly_1",
    category: "ADHD",
    type: "weekly",
    question: "I was able to stay focused on tasks without getting distracted.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd_weekly_2",
    category: "ADHD",
    type: "weekly",
    question:
      "I managed to follow through with tasks without abandoning them midway.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd_weekly_3",
    category: "ADHD",
    type: "weekly",
    question: "I felt in control of my impulses throughout the week.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd_weekly_4",
    category: "ADHD",
    type: "weekly",
    question: "I could sit still or remain calm when required.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd_weekly_5",
    category: "ADHD",
    type: "weekly",
    question: "I planned my schedule and stuck to it.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd_weekly_6",
    category: "ADHD",
    type: "weekly",
    question:
      "I remembered appointments and responsibilities without reminders.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd_weekly_7",
    category: "ADHD",
    type: "weekly",
    question: "I completed tasks on time without procrastination.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd_weekly_8",
    category: "ADHD",
    type: "weekly",
    question: "I avoided multitasking and focused on one task at a time.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd_weekly_9",
    category: "ADHD",
    type: "weekly",
    question: "I minimized interruptions or distractions in my environment.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },
  {
    id: "adhd_weekly_10",
    category: "ADHD",
    type: "weekly",
    question: "I felt in control of my attention and energy levels.",
    options: [
      { text: "Strongly Disagree", traits: ["ADHD"], weight: 0 },
      { text: "Disagree", traits: ["ADHD"], weight: 1 },
      { text: "Neutral", traits: ["ADHD"], weight: 2 },
      { text: "Agree", traits: ["ADHD"], weight: 3 },
      { text: "Strongly Agree", traits: ["ADHD"], weight: 4 },
    ],
  },

  {
    id: "ocd_weekly_1",
    category: "OCD",
    type: "weekly",
    question: "I experienced fewer obsessive thoughts than usual.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd_weekly_2",
    category: "OCD",
    type: "weekly",
    question: "I was able to resist the urge to perform compulsive actions.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd_weekly_3",
    category: "OCD",
    type: "weekly",
    question: "I felt less anxious when routines were disrupted.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd_weekly_4",
    category: "OCD",
    type: "weekly",
    question: "I spent less time rechecking or rereading tasks.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd_weekly_5",
    category: "OCD",
    type: "weekly",
    question: "I felt more in control of my thoughts and behaviors.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd_weekly_6",
    category: "OCD",
    type: "weekly",
    question: "I could delay or avoid compulsive rituals without distress.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd_weekly_7",
    category: "OCD",
    type: "weekly",
    question: "I accepted uncertainty more easily than before.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd_weekly_8",
    category: "OCD",
    type: "weekly",
    question: "I experienced fewer urges to organize or control things.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd_weekly_9",
    category: "OCD",
    type: "weekly",
    question: "I challenged my intrusive thoughts with rational thinking.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },
  {
    id: "ocd_weekly_10",
    category: "OCD",
    type: "weekly",
    question: "I felt less emotional distress from unwanted thoughts.",
    options: [
      { text: "Strongly Disagree", traits: ["OCD"], weight: 0 },
      { text: "Disagree", traits: ["OCD"], weight: 1 },
      { text: "Neutral", traits: ["OCD"], weight: 2 },
      { text: "Agree", traits: ["OCD"], weight: 3 },
      { text: "Strongly Agree", traits: ["OCD"], weight: 4 },
    ],
  },

  {
    id: "autism_weekly_1",
    category: "Autism",
    type: "weekly",
    question: "I felt more comfortable during social interactions this week.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
  {
    id: "autism_weekly_2",
    category: "Autism",
    type: "weekly",
    question: "I was flexible with changes in plans or routines.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
  {
    id: "autism_weekly_3",
    category: "Autism",
    type: "weekly",
    question: "I felt less overwhelmed by loud noises or bright lights.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
  {
    id: "autism_weekly_4",
    category: "Autism",
    type: "weekly",
    question: "I expressed myself clearly when talking to others.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
  {
    id: "autism_weekly_5",
    category: "Autism",
    type: "weekly",
    question: "I tried new activities or adapted to changes easily.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
  {
    id: "autism_weekly_6",
    category: "Autism",
    type: "weekly",
    question: "I managed transitions between tasks or environments better.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
  {
    id: "autism_weekly_7",
    category: "Autism",
    type: "weekly",
    question: "I participated in group activities with less anxiety.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
  {
    id: "autism_weekly_8",
    category: "Autism",
    type: "weekly",
    question: "I handled unexpected situations with more calmness.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
  {
    id: "autism_weekly_9",
    category: "Autism",
    type: "weekly",
    question: "I was more tolerant of sensory discomforts.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
  {
    id: "autism_weekly_10",
    category: "Autism",
    type: "weekly",
    question: "I practiced or improved social skills intentionally.",
    options: [
      { text: "Strongly Disagree", traits: ["Autism"], weight: 0 },
      { text: "Disagree", traits: ["Autism"], weight: 1 },
      { text: "Neutral", traits: ["Autism"], weight: 2 },
      { text: "Agree", traits: ["Autism"], weight: 3 },
      { text: "Strongly Agree", traits: ["Autism"], weight: 4 },
    ],
  },
];

async function seed() {
  try {
    
    console.log("MONGODB_URI:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI); // ← Check if it's undefined or malformed

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
