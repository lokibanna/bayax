"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIEngine = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AIEngine {
    constructor() {
        this.modelName = "gemini-flash-latest";
        this.groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY || "" });
        this.genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }
    static getInstance() {
        if (!AIEngine.instance) {
            AIEngine.instance = new AIEngine();
        }
        return AIEngine.instance;
    }
    buildPrompt(context, type) {
        if (type === "idea") {
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
        return context;
    }
    async execute(prompt) {
        try {
            return await this.callGemini(prompt);
        }
        catch (geminiError) {
            console.warn("[AIEngine] Gemini failed, switching to Groq:", geminiError.message);
            return await this.callGroq(prompt);
        }
    }
    async callGemini(prompt) {
        const model = this.genAI.getGenerativeModel({ model: this.modelName });
        const result = await model.generateContent(prompt + "\nOutput ONLY valid JSON.");
        const text = result.response.text();
        return this.parseJSON(text);
    }
    async callGroq(prompt) {
        const response = await this.groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "system", content: prompt }],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });
        const text = response.choices[0]?.message?.content || "";
        return this.parseJSON(text);
    }
    parseJSON(text) {
        try {
            return JSON.parse(text);
        }
        catch {
            const match = text.match(/\{[\s\S]*\}/);
            if (match)
                return JSON.parse(match[0]);
            throw new Error("AIEngine: Failed to parse JSON response from AI.");
        }
    }
}
exports.AIEngine = AIEngine;
