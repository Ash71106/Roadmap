
# Learn Your Way - AI-Powered Learning Planner

Learn Your Way is an intelligent, web-based tool that generates personalized learning plans. Powered by the Google Gemini API, it crafts a custom-tailored roadmap to help you master new skills, based on your topic of interest, current knowledge level, and preferred learning styles.


## ✨ Features

- **Personalized Roadmaps:** Get a step-by-step plan tailored specifically to your learning goals.
- **Intuitive 3-Step Process:** A simple and engaging user flow to define:
    1.  The **topic** you want to learn.
    2.  Your current **knowledge level** (Novice, Beginner, or Intermediate).
    3.  Your preferred **learning styles** (Reading, Videos, Projects, Podcasts).
- **AI-Powered Suggestions:** Leverages the Google Gemini API to generate creative, relevant, and structured learning steps.
- **Curated Resources:** Each step includes a list of suggested resources (articles, videos, projects, etc.) to guide your learning.
- **Visual Mind Map:** An elegant "Learning Journey" timeline provides a high-level overview of your entire plan.
- **Responsive Design:** A clean, modern, and fully responsive UI that works beautifully on any device.
- **Smooth Animations:** Subtle animations enhance the user experience, making the process feel fluid and dynamic.

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Model:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- `npm` or your favorite package manager
- A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/).

## ⚙️ How It Works

The application's logic is straightforward:

1.  **State Management:** The main `App.tsx` component acts as a state machine, controlling the current view (`'topic'`, `'level'`, `'style'`, `'loading'`, `'result'`, `'error'`).
2.  **User Input:** The user progresses through three components: `TopicStep`, `KnowledgeLevelStep`, and `LearningStyleStep`, which collect their preferences.
3.  **API Call:** Once all information is gathered, the `handleGeneratePlan` function in `App.tsx` calls the `generateLearningPlan` service.
4.  **Gemini Service:** The `services/geminiService.ts` file constructs a detailed prompt containing the user's topic, knowledge level, and learning styles. It sends this prompt to the Gemini API, specifying a strict JSON schema for the response.
5.  **Parsing and Display:** The Gemini API returns a structured JSON object containing the learning plan. This data is parsed and passed to the `PlanResult.tsx` component.
6.  **Rendering the Plan:** `PlanResult.tsx` dynamically renders the complete plan, including the mind map overview and the detailed steps with their associated resources.

## 📁 Project Structure

```
/
├── public/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── icons/       # SVG icon components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── ...
│   ├── services/
│   │   └── geminiService.ts # Logic for interacting with the Gemini API
│   ├── App.tsx          # Main application component and state logic
│   ├── index.tsx        # React entry point
│   └── types.ts         # TypeScript type definitions
├── index.html
└── README.md
```

## 📄 Disclaimer

This tool is powered by a generative AI model. While it aims to provide accurate and helpful learning plans, the information and resources may occasionally be inaccurate or outdated. Always verify critical information.
