# 🚀 Full Stack AI Career Coach

A modern AI-powered career guidance platform built with **Next.js**, **Neon DB**, **Prisma**, **Tailwind**, **Inngest**, and **shadcn/ui**.  
The platform helps users with:
- AI Interview Preparation
- AI Resume Review & Enhancement
- AI Cover Letter Generation

---

## 🌟 Overview

This application acts as a **personal career mentor**, providing insights, coaching suggestions, resume improvements, and cover letters tailored to any job description or role.

It showcases how to build a **production-ready AI application** using a powerful, scalable tech stack — ideal to learn full-stack development and AI integration.

---

## ✨ Core Features

### 🧠 AI Interview Coach  
- Role-specific interview questions  
- Feedback on user answers  
- Suggestions for improvement  

### 📄 AI Resume Assistant  
- Highlights strengths & improvement points  
- ATS-friendly formatting suggestions  
- Resume tailoring based on job role  

### 📝 AI Cover Letter Generator  
- Personalized content based on resume + JD  
- Change tone (formal, friendly, concise, etc.)  
- Editable and exportable  

### 🎨 Modern UI/UX  
- Responsive UI using **Tailwind CSS**  
- Dynamic forms and interactions  
- Beautiful design using **shadcn/ui**  

---

## 🛠️ Tech Stack

| Layer | Tools |
|------|-------|
| Frontend | Next.js (App Router), shadcn/ui |
| Backend | Server Actions, REST APIs |
| Database | Neon Postgres |
| ORM | Prisma |
| Styling | Tailwind CSS |
| Background Jobs | Inngest |
| Other | TypeScript |

---

## 📁 Folder Structure

```

.
├── actions/            # Server actions & core logic
├── app/                # Pages, layouts, routing
├── components/         # Reusable UI components
├── data/               # Static/seed data
├── hooks/              # Custom frontend hooks
├── lib/                # Utilities, DB clients, helpers
├── prisma/             # Prisma schema + migrations
├── public/             # Static assets
├── middleware.js       # Edge-level middleware
├── tailwind.config.mjs # Tailwind configuration
└── next.config.mjs     # Next.js configuration

````

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kabilan-karthi/SkillXAI.git
````

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Environment Variables

Create a `.env` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
GEMINI_API_KEY=
DATABASE_URL=
```

---

## 🗃️ Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start Prisma Studio (optional):

```bash
npx prisma studio
```

---

## 🚀 Start Development Server

```bash
npm run dev
```

App runs at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧠 How the AI Works

1. User submits resume/job information
2. Backend processes content with AI
3. Data is stored & analyzed using Neon + Prisma
4. Inngest runs asynchronous AI workflows
5. UI displays clean actionable insights

---

## 📦 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Build production bundles |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 🚀 Roadmap

* Resume PDF Export
* Mock AI Interview Calls
* Job Recommendation Engine
* LinkedIn Profile Analyzer
* Salary Estimation Insights

---

## 🤝 Contributing

Contributions are welcome!

```bash
1. Fork it
2. Create new branch
3. Commit changes
4. Open Pull Request
```

---

## 📄 License

Licensed under the **MIT License**.

---

## 🙏 Acknowledgements

* Next.js
* Prisma
* shadcn/ui
* Inngest
* OpenAI / Gemini

---


