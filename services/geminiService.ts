
import { GoogleGenAI, Type } from "@google/genai";
import { KnowledgeLevel, LearningStyle, LearningPlan } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const learningPlanSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A creative and encouraging title for the learning plan about the user's topic."
    },
    plan: {
      type: Type.ARRAY,
      description: "The array of steps in the learning plan.",
      items: {
        type: Type.OBJECT,
        properties: {
          step: {
            type: Type.INTEGER,
            description: "The step number, starting from 1."
          },
          title: {
            type: Type.STRING,
            description: "A concise title for this step of the learning plan."
          },
          description: {
            type: Type.STRING,
            description: "A detailed, paragraph-long description of what to learn or do in this step. This should be comprehensive and guide the user clearly."
          },
          resources: {
            type: Type.ARRAY,
            description: "A list of 2-3 specific, high-quality resources to help with this step, tailored to the user's learning style.",
            items: {
              type: Type.OBJECT,
              properties: {
                type: {
                  type: Type.STRING,
                  description: "The type of resource. Must be one of: Article, Video, Project, Podcast, Documentation, Course.",
                  enum: ['Article', 'Video', 'Project', 'Podcast', 'Documentation', 'Course']
                },
                title: {
                  type: Type.STRING,
                  description: "The title of the resource. E.g., 'React Official Documentation - Hooks API Reference'."
                },
                description: {
                  type: Type.STRING,
                  description: "A brief, one-sentence description of the resource and why it's useful for this step."
                }
              },
              required: ["type", "title", "description"]
            }
          }
        },
        required: ["step", "title", "description", "resources"]
      }
    }
  },
  required: ["title", "plan"]
};


export const generateLearningPlan = async (
  topic: string,
  level: KnowledgeLevel,
  styles: LearningStyle[]
): Promise<LearningPlan> => {
  const stylesString = styles.join(', ');

  const prompt = `
    Create a personalized, step-by-step learning plan for a user who wants to learn about "${topic}".

    User's Profile:
    - Current Knowledge Level: "${level}"
    - Preferred Learning Styles: "${stylesString}"

    Instructions:
    1.  Generate a plan with 5-7 distinct, logically-sequenced steps.
    2.  For each step, provide a clear title and a detailed description of the concepts to learn or tasks to complete.
    3.  For each step, suggest 2-3 specific, high-quality learning resources (like articles, videos, projects, podcasts, courses, or official documentation) that align with the user's preferred learning styles.
    4.  The tone should be encouraging, clear, and motivational.
    5.  The final output must be a JSON object that strictly follows the provided schema. Do not include any markdown formatting or introductory text outside the JSON object.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: learningPlanSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const plan = JSON.parse(jsonText);
    return plan;
  } catch (error) {
    console.error("Error generating learning plan:", error);
    throw new Error("Failed to generate learning plan. Please try again.");
  }
};
