import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class AIEngine {
  private static instance: AIEngine;
  private readonly modelName: string;
  private readonly groq: Groq;
  private readonly genAI: GoogleGenerativeAI;

  private constructor() {
    this.modelName = "gemini-flash-latest";
    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  }

  public static getInstance(): AIEngine {
    if (!AIEngine.instance) {
      AIEngine.instance = new AIEngine();
    }
    return AIEngine.instance;
  }

  public buildPrompt(context: string): string {
    return `
      You are BayaX, the world's most advanced Product Architect AI.
      Your goal is to transform the input into a complete EXECUTION BLUEPRINT.
      Return ONLY a valid JSON object. No markdown. No extra text.
      JSON STRUCTURE:
      {
        "clarityCheck": { "originalInput": "String", "refinedConcept": "String", "category": "String" },
        "marketAnalysis": { "score": 0, "verdict": "String", "competitors": ["String"], "targetAudience": ["String"], "monetization": ["String"] },
        "techStack": { "frontend": "String", "backend": "String", "database": "String", "deployment": "String", "rationale": "String" },
        "mindMap": { "root": "String", "branches": [{ "label": "String", "children": ["String"] }] },
        "executionStructure": { "phases": [{ "name": "Phase 1: MVP", "steps": ["Step 1", "Step 2"] }] },
        "logicFlow": { "topic": "String", "problem": "String", "solution": "String", "marketEffects": { "positive": "String", "negative": "String" } },
        "criticalQuestions": ["String"]
      }
      CONTEXT: ${context}
    `;
  }

  public async execute(prompt: string): Promise<object> {
    try {
      return await this.callGemini(prompt);
    } catch (geminiError: any) {
      console.warn("[AIEngine] Gemini failed, switching to Groq:", geminiError.message);
      return await this.callGroq(prompt);
    }
  }

  private async callGemini(prompt: string): Promise<object> {
    const model = this.genAI.getGenerativeModel({ model: this.modelName });
    const result = await model.generateContent(prompt + "\nOutput ONLY valid JSON.");
    const text = result.response.text();
    return this.parseJSON(text);
  }

  private async callGroq(prompt: string): Promise<object> {
    const response = await this.groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });
    const text = response.choices[0]?.message?.content || "";
    return this.parseJSON(text);
  }

  private parseJSON(text: string): object {
    try {
      return JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      throw new Error("AIEngine: Failed to parse JSON response from AI.");
    }
  }
}
