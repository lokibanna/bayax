import { Request, Response } from "express";
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "mock_key" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "mock_key");

interface IdeaRequestBody {
  step?: string;
  field: string;
  intent: string;
  content?: string;
  techStack?: string;
  username?: string;
}

export const analyzeIdea = async (req: Request, res: Response): Promise<void> => {
  try {
    const { field, intent, content, techStack }: IdeaRequestBody = req.body;

    let promptContext = "";

    if (intent === "need_idea") {
      promptContext = `
        USER SCENARIO: The user wants to build something in the "${field}" field but DOES NOT have a specific idea.
        USER CONSTRAINTS: "${content || "None provided"}"
        PREFERRED TECH: "${techStack || "Any"}"
        TASK: Generate a highly viable, modern startup idea for this user in the ${field} space.
        Then analyze that generated idea as if it was their own.
      `;
    } else {
      promptContext = `
        USER SCENARIO: The user has a specific idea in the "${field}" field.
        IDEA DESCRIPTION: "${content}"
        PREFERRED TECH: "${techStack || "Best suited for the project"}"
        TASK: Analyze this specific idea. Enhance it, structure it, and validate it.
      `;
    }

    const systemPrompt = `
      You are BayaX, the world's most advanced Product Architect AI.
      Your goal is to transform separate inputs into a complete EXECUTION BLUEPRINT.

      OUTPUT FORMAT:
      Return strictly a valid JSON object. Do not include markdown formatting.

      JSON STRUCTURE:
      {
        "clarityCheck": {
           "originalInput": "String",
           "refinedConcept": "String",
           "category": "String"
        },
        "marketAnalysis": {
           "score": 0,
           "verdict": "String",
           "competitors": ["String"],
           "targetAudience": ["String"],
           "monetization": ["String"]
        },
        "techStack": {
             "frontend": "String",
             "backend": "String",
             "database": "String",
             "deployment": "String",
             "rationale": "String"
        },
        "mindMap": {
            "root": "String",
            "branches": [
                { "label": "String", "children": ["String"] }
            ]
        },
        "executionStructure": {
           "phases": [
              { "name": "Phase 1: MVP", "steps": ["Step 1", "Step 2"] }
           ]
        },
        "logicFlow": {
            "topic": "String",
            "problem": "String",
            "solution": "String",
            "marketEffects": {
                "positive": "String",
                "negative": "String"
            }
        },
        "criticalQuestions": ["String"]
      }

      CONTEXT:
      ${promptContext}
    `;

    let jsonResponse;

    try {
      // Primary attempt: Gemini 1.5 Flash
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const result = await model.generateContent(systemPrompt + "\nOutput strictly valid JSON.");
      const geminiResponse = await result.response;
      const responseText = geminiResponse.text();
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
         throw new Error("Gemini invalid JSON format");
      }
      jsonResponse = JSON.parse(jsonMatch[0]);
    } catch (geminiError: any) {
      console.warn("Gemini Failed, falling back to Groq:", geminiError.message || geminiError);
      
      // Fallback attempt: Groq Llama 3
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const responseText = response.choices[0]?.message?.content || "";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error("AI failed to return a valid JSON structure (Both Gemini and Groq).");
      }

      jsonResponse = JSON.parse(jsonMatch[0]);
    }

    res.status(200).json({ success: true, data: jsonResponse });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "AI Analysis Failed", error: error.message });
  }
};

