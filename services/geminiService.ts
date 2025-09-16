
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    matchPercentage: {
      type: Type.INTEGER,
      description: "Integer from 0 to 100 representing profile-job match.",
    },
    summary: {
      type: Type.STRING,
      description: "A concise, objective one-sentence summary of the user’s fit.",
    },
    matchingSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key skills from the user's profile that match the job description.",
    },
    missingSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key skills from the job description missing in the user's profile.",
    },
    careerGuidance: {
      type: Type.STRING,
      description: "Actionable advice for the user to improve their profile. Each distinct piece of advice must be separated by a newline character.",
    },
    interviewQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 tailored interview questions based on the profile and job role.",
    },
  },
  required: [
    'matchPercentage', 
    'summary', 
    'matchingSkills', 
    'missingSkills', 
    'careerGuidance', 
    'interviewQuestions'
  ],
};

export async function getAnalysis(
  userProfileBase64: string, 
  jobTitle: string,
  mimeType: string
): Promise<AnalysisResult> {
  const prompt = `
    You are an expert career coach and HR analyst AI called ROLEFIT>Ai.
    Your task is to analyze the user's resume, provided as a file, against a specific job title.

    First, from the job title "${jobTitle}", infer the typical skills, responsibilities, and qualifications required for the role.

    Next, thoroughly analyze the user's attached resume file.

    Finally, based on this two-pronged analysis, generate a JSON object that provides:
    1. A match percentage.
    2. A concise summary of their fit.
    3. A list of skills from their resume that match the inferred job requirements.
    4. A list of key skills required for the job that seem to be missing from their resume.
    5. Actionable career guidance to bridge these gaps. Each distinct piece of advice should be on its own line, separated by a newline.
    6. Tailored interview questions.

    Ensure the analysis is detailed, accurate, and constructive. The JSON output must adhere strictly to the provided schema.
  `;

  try {
    const promptPart = { text: prompt };
    const filePart = {
      inlineData: {
        data: userProfileBase64,
        mimeType,
      },
    };

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [promptPart, filePart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: analysisSchema,
        },
    });

    const jsonText = response.text.trim();
    const parsedResult: AnalysisResult = JSON.parse(jsonText);
    return parsedResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check the console for more details.");
  }
}