export declare class AIEngine {
    private static instance;
    private readonly modelName;
    private readonly groq;
    private readonly genAI;
    private constructor();
    static getInstance(): AIEngine;
    buildPrompt(context: string, type: "idea" | "lesson"): string;
    execute(prompt: string): Promise<object>;
    private callGemini;
    private callGroq;
    private parseJSON;
}
