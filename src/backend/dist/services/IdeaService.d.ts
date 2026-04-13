interface IdeaInput {
    field: string;
    intent: string;
    content?: string;
    techStack?: string;
    creatorId: string;
}
export declare class IdeaService {
    private readonly aiEngine;
    constructor();
    performAnalysis(data: IdeaInput): Promise<object>;
    storeProject(data: IdeaInput, analysisData: object): Promise<void>;
    getProjects(creatorId: string): Promise<(import("mongoose").Document<unknown, {}, import("../model/idea.model").IIdeaProject> & import("../model/idea.model").IIdeaProject & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    })[]>;
    deleteProject(projectId: string, creatorId: string): Promise<void>;
}
export {};
