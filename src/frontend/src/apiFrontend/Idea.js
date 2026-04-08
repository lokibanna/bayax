import axios from "axios";

const axiosIdea = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3004/api/v1"}/idea`,
    withCredentials: true,
});

const analyzeIdea = async ({ inputType, content, field, username }) => {
    try {
        const response = await axiosIdea.post("/analyze", {
            inputType,
            content,
            field,
            username
        });
        return response;
    } catch (error) {
        console.error(`Error analyzing idea: ${error}`);
        return error.response;
    }
};

export { analyzeIdea };
