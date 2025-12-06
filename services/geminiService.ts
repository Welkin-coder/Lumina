import { GoogleGenAI } from "@google/genai";
import { MBTIResult } from "../types";

// Helper to determine if we can use the API
export const isGeminiConfigured = (): boolean => {
  return !!process.env.API_KEY;
};

export const generatePersonalityAnalysis = async (result: MBTIResult): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found. Returning mock data.");
    return "API Key missing. Please configure the environment to receive AI insights.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are an expert personality psychologist.
    The user has taken a 40-question personality test and tested as: **${result.type}**.
    
    Here is the breakdown:
    - ${result.scores.EI.label}: ${result.scores.EI.score}%
    - ${result.scores.SN.label}: ${result.scores.SN.score}%
    - ${result.scores.TF.label}: ${result.scores.TF.score}%
    - ${result.scores.JP.label}: ${result.scores.JP.score}%
    
    Provide a premium, encouraging, and deeply insightful analysis of this profile.
    
    Format the output as a valid JSON object with the following schema:
    {
      "title": "A catchy archetypal name (e.g., The Visionary Architect)",
      "summary": "A 2-3 sentence engaging summary of their essence.",
      "strengths": ["Strength 1", "Strength 2", "Strength 3", "Strength 4"],
      "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
      "workStyle": "A short paragraph about how they work best.",
      "idealEnvironment": "A short paragraph about their ideal social/work environment.",
      "careerPaths": ["Career 1", "Career 2", "Career 3", "Career 4"]
    }
    
    Do not include markdown code blocks (like \`\`\`json). Just return the raw JSON string.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
