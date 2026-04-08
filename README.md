<div align="center">

# 🚀 BayaX 
### *AI-Powered B2B & Product Architecture Flow Generator*

</div>

---

## 🛑 Project Overview
**BayaX** is an advanced AI Product Architect platform. Users can input a vague startup idea, B2B concept, or specific field, and the platform utilizes Generative AI to convert it into a structured, highly viable **Execution Blueprint**. 

The system maps out clarity checks, market analysis, optimal tech stacks, execution phases, and mind maps, translating abstract concepts into actionable visual and structural workflows.

---

## 🛠 Tech Stack
- **Frontend Layer:** React (Vite), Tailwind CSS, Framer Motion
- **Backend Layer:** Node.js, Express.js
- **Database Layer:** MongoDB (Mongoose)
- **AI Engine:** Google Generative AI (Gemini Flash Model)

---

## 🏗 Architecture & System Design (HLD)
The application is structured on an **MVC 3-Tier Layered Architecture**:
1. **Presentation (Client):** `Dashboard.jsx` & `IdeaResult.jsx` for capturing user intent/constraints and rendering the generated architectural maps.
2. **Logic Layer (API):** `idea.controller.js` orchestrates prompt engineering, ensuring valid JSON data structures containing execution mapping (MindMap, ExecutionStructure).
3. **Data Layer (MongoDB):** Stores authenticated User states and generated product blueprints.

---

## 🧩 Implementations (OOP & SDLC)
- **Design Patterns:** Implemented the **MVC Pattern** to separate routing from controller logic, and the **Singleton Pattern** for optimal Database connections. 
- **Modularity:** API services are strictly abstracted from prompt execution flows.

---
*(For Evaluation: See `/diagrams` folder for HLD, Class ER Diagram flow)*
