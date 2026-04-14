<div align="center">
  
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00C9FF,100:92FE9D&height=220&section=header&text=BayaX&fontSize=90&fontColor=ffffff&animation=twinkling&fontAlignY=35" width="100%" />

<h3 align="center">🚀 THE NEXT-GEN AI PRODUCT ARCHITECT</h3>

<p align="center">
<b>BayaX</b> is an ultra-advanced AI engine that converts chaotic startup ideas into mathematically structured, foolproof execution blueprints. No more guessing. Just pure execution.
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Powered_by-Gemini_AI-1A73E8?style=for-the-badge&logo=google&logoColor=white&labelColor=101010" alt="Gemini AI"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Powered_by-Groq_Llama_3-F55036?style=for-the-badge&logo=groq&logoColor=white&labelColor=101010" alt="Groq AI"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Frontend-React_18-00D8FF?style=for-the-badge&logo=react&logoColor=black&labelColor=101010" alt="React"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=101010" alt="Node.js"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=101010" alt="TypeScript"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=101010" alt="MongoDB"/></a>
</p>

<p align="center">
  <span style="font-size: 40px;">🚀</span>
  <span style="font-size: 40px;">🧠</span>
  <span style="font-size: 40px;">🌌</span>
</p>

</div>

---

## 🌌 The Vision

Most startups fail because of a lack of *clarity* and *structure*. **BayaX** bridges the gap between an abstract thought and a billion-dollar execution plan. Just feed it a niche or a raw idea, and watch the AI construct your entire path.



---

## ⚡ Core Arsenal (Features)

<details open>
  <summary><b>🧠 Startup Blueprint Generator</b></summary>
  <blockquote>Harnesses Generative LLMs to validate, refine, and structure your abstract ideas into a highly coherent product thesis, complete with Tech Stack recommendations and Market Feasibility parameters.</blockquote>
</details>

<details open>
  <summary><b>📚 Automated Lesson Plan Architect</b></summary>
  <blockquote>Dynamically generates comprehensive K-12 educational lesson plans complete with factual/conceptual objectives, expected queries, and automated <code>.docx</code> document exports directly downloaded to the browser.</blockquote>
</details>

<details open>
  <summary><b>🛡️ Secure JWT Authentication</b></summary>
  <blockquote>Enterprise-grade security using HttpOnly cookies, Bcrypt password hashing, and Access/Refresh token rotation flows to securely protect user portfolios and lesson histories.</blockquote>
</details>

<details open>
  <summary><b>⚡ Multi-LLM Fallback Engine</b></summary>
  <blockquote>Guaranteed uptime through a robust Strategy Pattern. If Google's Gemini SDK faces downtime or rate limits, the engine instantaneously pivots to Groq's blazing-fast Llama 3 model silently in the background.</blockquote>
</details>

---

## 🧬 Architectural DNA (System Design)

BayaX operates on a highly optimized **3-Tier MVC Architecture** integrated with bleeding-edge AI API gateways.

<div align="center">

```mermaid
graph TD
    A[👨‍💻 User] -->|HTTP Request| B(⚛️ React Dashboard)
    B -->|Encrypted Payload| C{⚡ Express Controller}
    
    C -->|Verify HTTP Cookie| F[🛡️ Auth Middleware]
    F -->|Delegate Task| S[⚙️ Business Service]
    
    S -->|Persist History| D[(MongoDB Atlas)]
    S -->|Idea / Lesson Prompt| E((🧠 AIEngine Singleton))
    
    E -->|Primary Target| G[Google Gemini API]
    E -.->|Rate Limit Fallback| H[Groq Llama API]
    
    G -->|Strict JSON Output| S
    H -.->|Strict JSON Output| S
    S -->|REST Response| C
    C -->|JSON Payload| B
    B -->|Render UI / Export Docx| A
    
    style A fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff
    style B fill:#0c4a6e,stroke:#0ea5e9,stroke-width:2px,color:#fff
    style C fill:#164e63,stroke:#06b6d4,stroke-width:2px,color:#fff
    style D fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff
    style E fill:#4c1d95,stroke:#8b5cf6,stroke-width:2px,color:#fff
    style F fill:#9d174d,stroke:#f43f5e,stroke-width:2px,color:#fff
    style S fill:#b45309,stroke:#f59e0b,stroke-width:2px,color:#fff
```

</div>

---

## 🏗️ Design Patterns & SOLID Principles

BayaX is built on a highly robust, enterprise-grade architecture. To ensure scalability, testability, and maintainability, the following design patterns and SOLID principles are deeply integrated into the codebase:

### 🧩 Core Design Patterns

1. **Singleton Pattern** (`AIEngine.ts`, `DatabaseConnection.ts`)  
   **How & Why:** Guarantees that only one instance of the AI SDK or MongoDB connection exists in memory. This prevents the server from crashing or getting rate-limited if 100 users attempt to generate ideas simultaneously by forcing them to queue through a highly optimized global engine.

2. **MVC-S Pattern (Model-View-Controller-Service)**  
   **How & Why:** The backbone of BayaX's separation of concerns. Controllers exclusively handle HTTP requests, Services manage all heavy business logic and API orchestration, and Models bind strictly to the database. This prevents spaghetti code and makes components fiercely scalable.

3. **Fallback Strategy Pattern** (`AIEngine.ts`)  
   **How & Why:** AI networks can have downtime. BayaX implements a dynamic fallback strategy. The primary strategy attempts `callGemini()`. If it hits a rate limit or failure, the system automatically catches the exception and pivots to a backup strategy: `callGroq()`. The user experiences zero downtime.

4. **Chain of Responsibility (Middleware Pattern)** (`auth.ts`)  
   **How & Why:** Instead of repeating token validation logic across 50 controllers, the `AuthMiddleware` intercepts incoming requests, decodes the JWT, and verifies the user. If valid, it passes control forward via `next()`; if compromised, it terminates the chain with a `403 Forbidden`.

5. **Facade Pattern** (`JWTService.ts`, `ConvertUtils.ts`)  
   **How & Why:** Masks complex third-party library internals. Generating mathematical `.docx` table structures is complex, but the controllers never see it—they just call `createDocument()`. Swapping dependencies in the future requires zero changes to the core application.

### 🏛️ SOLID Principles Implemented

*   **S (Single Responsibility Principle):** Controllers manage HTTP, Services manage execution logic, and Utilities manage distinct tasks (like Tokens). No file attempts to do two unrelated jobs.
*   **O (Open/Closed Principle):** The `AIEngine.execute()` method is firmly closed for modification to the outside services, but internally open for extension (e.g., adding an OpenAI handler method does not require changing the Idea Service).
*   **I (Interface Segregation Principle):** BayaX strictly relies on segregated, tiny functional interfaces like `LessonInput` or `AuthTokens` instead of forcing a massive `IUserPayload` onto services that don't need all the data properties.
*   **D (Dependency Inversion Principle):** Controllers interact with high-level service abstractions (e.g., `ideaService.storeProject()`) rather than writing low-level Mongoose query instructions. You could swap MongoDB for PostgreSQL without breaking the presentation layer.

---

## 🎮 Execution Flow (Sequence)

How exactly does BayaX read your mind? Here is the data flow vector:

<div align="center">

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as ⚛️ UI Dashboard
    participant Middle as 🛡️ Auth Middleware
    participant Service as ⚙️ Business Service
    participant AI as 🧠 AI Core (Gemini/Groq)
    participant DB as 🗄️ MongoDB Atlas

    User->>Frontend: Submit Idea / Lesson Form
    Frontend->>Middle: POST Request (with Cookie)
    activate Middle
    Middle->>Middle: Verify JWT Access Token
    Middle->>Service: Forward Authenticated Payload
    deactivate Middle
    activate Service
    Service->>AI: Trigger AIEngine (Execution Blueprint)
    activate AI
    AI-->>Service: Structured JSON Response
    deactivate AI
    Service->>DB: Mongoose.create() to save history
    Service-->>Frontend: Return Analyzed Payload
    deactivate Service
    Frontend-->>User: Display Output / Trigger .docx Download
```

</div>

---

## ⚙️ Hyper-Drive Boot Sequence (Setup)

Ready to run BayaX on your local mainframe?

### 1. Clone the Matrix
```bash
git clone https://github.com/samay-hash/bayax.git
cd bayax
```

### 2. Ignite the Backend Core
```bash
cd src/backend
# Setup your environment variables via .env.example
cp .env.example .env
npm install
npm run build
npm start
```

### 3. Spin up the Visualizer (Frontend)
```bash
cd ../frontend
# Setup your environment variables
cp .env.example .env
npm install
npm run dev
```

> **Target Acquired:** Open [http://localhost:5173](http://localhost:5173) in your browser to experience the future.

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:00C9FF,100:92FE9D&height=120&section=footer" width="100%" />
  
  <b>Designed for Visionaries. Built by the BayaX Team.</b><br/>
  <i>Leave a ⭐ if BayaX blew your mind!</i>
</div>
