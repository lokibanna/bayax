<div align="center">

# 📚 AI Lesson Planner
### *The Future of Automated Curriculum Design*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

<br />

<!-- <p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmNkdXQ5Y3JueGV6aXl6aXl6aXl6aXl6aXl6aXl6aXl6/xT9IgzoKnwFNmISR8I/giphy.gif" alt="AI Animation" width="600">
  <br>
  <em>Turn hours of planning into seconds of creativity.</em>
</p> -->

</div>

---

## 🛑 The Problem
Teachers and educators face a silent productivity crisis:
- **Time Drain:** Spending 10+ hours a week formatting Word documents.
- **Writer's Block:** Staring at blank pages trying to align curricular goals with activities.
- **Inconsistency:** delivering varied quality in lesson structures across different subjects.
- **Rigid Tools:** Existing tools are either too simple (notes apps) or too complex (full LMS).

## 🚀 The Solution
**AI Lesson Planner** is a full-stack SaaS platform that leverages **Google's Gemini 2.0 Flash** to instantly generate comprehensive, standards-aligned lesson plans. 

We don't just generate text; we **engineer documents**.
*   **Input:** Subject, Topic, Grade, Duration.
*   **Process:** AI analyzes educational standards + Backend generates a structured `.docx` file.
*   **Output:** A beautiful Web UI presentation + Downloadable PDF & Word documents.

---

## ⚡ Key Features

✨ **Generative AI Core:** Powered by `gemini-2.0-flash-lite` for lightning-fast, highly accurate educational content.
📄 **Native DOCX Generation:** The backend programmatically builds Microsoft Word documents (not just HTML exports), ensuring perfect formatting for administrative submission.
🎨 **Modern UI/UX:** Built with React, Tailwind, and Framer Motion for a slick, dark-mode-first aesthetic.
🔐 **Secure Auth:** robust authentication system using JWT (Access + Refresh Tokens) and HTTP-only cookies.
☁️ **Cloud Native:** Fully deployable on Vercel (Frontend) and Render (Backend).

---

## 🛠 Tech Stack

### **Frontend**
*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS + Framer Motion (Animations)
*   **State Management:** Recoil
*   **HTTP Client:** Axios
*   **PDF Generation:** html2pdf.js

### **Backend**
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (Mongoose)
*   **AI Engine:** Google Generative AI SDK (@google/generative-ai)
*   **Document Engine:** `docx` library (Programmatic Word file creation)
*   **Validation:** Zod

---

## 🔌 Installation & Setup

Follow these steps to get the platform running locally.

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Lesson-Planning-Platform.git
cd Lesson-Planning-Platform
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `/server` folder:
```env
PORT=3004
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_random_secret_string
REFRESH_TOKEN_SECRET=your_random_secret_string
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
GEMINI_API_KEY=your_google_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
```

Create a `.env` file in the `/client` folder:
```env
VITE_API_URL=http://localhost:3004/api/v1
```

Run the client:
```bash
npm run dev
```

---

## 🤖 How It Works (Under the Hood)

1.  **User Request:** The client sends the lesson topic (e.g., "Photosynthesis") to the API.
2.  **AI Processing:** The server constructs a prompt for **Gemini 2.0**, instructing it to return a structured JSON object containing:
    *   *Overview, Curricular Goals, Factual Knowledge, Teaching Points, Activities, Homework.*
3.  **File Synthesis:** 
    *   The server uses the `docx` library to assume this JSON data and "draw" a Word document paragraph by paragraph, applying bolding, bullet points, and headers programmatically.
4.  **Delivery:** The server saves this file temporarily and streams both the raw JSON (for the UI) and the file (as base64) back to the user in a single request.
5.  **Result:** The user sees the plan on screen and can click "Download DOCX" to get the physical file.

---

## 🤝 Contribution

We welcome contributions!
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<div align="center">
  <p>Made with ❤️ for Educators hhh.</p>
</div>
