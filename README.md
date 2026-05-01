<div align="center">


# 🗳️ VoteSmart AI

### *India's Privacy-First, AI-Powered Civic Companion*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-vote--smart--ai.vercel.app-4f46e5?style=for-the-badge)](https://vote-smart-ai.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-97.8%25-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **Empowering the next generation of Indian voters** — master the voting process, verify eligibility, and make impact-driven decisions for India's democracy.

<br/>

[🚀 Live App](https://vote-smart-ai.vercel.app) &nbsp;·&nbsp;
[🛠️ Problem Solver](https://vote-smart-ai.vercel.app/solve) &nbsp;·&nbsp;
[🤖 AI Guide](https://vote-smart-ai.vercel.app/assistant) &nbsp;·&nbsp;
[🗳️ Simulator](https://vote-smart-ai.vercel.app/simulate) &nbsp;·&nbsp;
[📊 Impact](https://vote-smart-ai.vercel.app/impact)

<br/>

---

</div>

## 📋 Table of Contents

- [🌟 About the Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [📸 App Pages & Modules](#-app-pages--modules)
- [🏗️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [🧪 Testing](#-testing)
  - [Unit Tests (Jest)](#unit-tests-jest)
  - [End-to-End Tests (Playwright)](#end-to-end-tests-playwright)
- [🚀 Deployment](#-deployment)
- [🔐 Privacy & Ethics](#-privacy--ethics)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author](#-author)
- [🙏 Acknowledgements](#-acknowledgements)

---

## 🌟 About the Project

**VoteSmart AI** is a modern, open-source civic education platform built specifically for Indian voters — especially first-time voters. The platform was built with one singular mission: **make democracy accessible, transparent, and digital-first for every citizen of India.**

India is the world's largest democracy, with over **968 million registered voters** across 543 Lok Sabha constituencies. Yet millions of eligible citizens remain confused about the voting process, unable to verify their registration, or simply intimidated by procedural uncertainty. VoteSmart AI bridges this gap by providing a zero-friction, privacy-respecting, AI-powered companion that guides voters from registration to the booth.

Built for the **2026 General Elections**, this platform is a completely independent, non-partisan educational tool — not affiliated with the Election Commission of India (ECI) in any way.

### 🎯 The Problem We're Solving

| Challenge | VoteSmart AI's Solution |
|---|---|
| "Am I even registered?" | Real-time registration check guide & Problem Solver |
| "My name is missing from the voter list" | Step-by-step resolution workflow |
| "I'm scared of the EVM machine" | Interactive EVM + VVPAT voting simulator |
| "What documents do I need?" | Smart Document Helper with instant validity check |
| "Does my vote really matter?" | Live Impact Visualizer with real constituency data |
| "I have a question at 2 AM" | 24/7 voice-enabled AI Civic Assistant |

---

## ✨ Key Features

### 🤖 AI Civic Assistant
A 24/7 neutral, voice-enabled AI companion powered by a large language model. Ask anything about India's electoral process — from voter eligibility to polling booth procedures — and receive verified, unbiased answers in plain language. The assistant proactively suggests common questions to help new voters navigate the system with ease.

### 🛠️ Problem Solver
An interactive decision-tree tool that accepts your specific voting issue and returns an instant, step-by-step resolution path. Covers the most common pain points: not being registered, name missing from the voter list, no Voter ID, confusion about the process, and more. No bureaucratic runaround — just direct, actionable guidance.

### 🗳️ Voting Simulator (EVM & VVPAT)
A fully interactive, multi-step simulation of the actual Indian Electronic Voting Machine (EVM) and Voter Verifiable Paper Audit Trail (VVPAT) process. Voters can practice pressing the EVM button, experience the VVPAT paper slip display (7-second window), and understand NOTA — all before they set foot in a polling booth. Confidence builder by design.

### 🧾 Document Helper
An intelligent document validity checker. Users input the type of ID they plan to carry and instantly receive a verdict on whether it is accepted at polling booths — without needing to upload any documents. Built with privacy as a core constraint.

### 📋 Readiness Checklist
A personalized, gamified checklist that tracks a voter's election preparedness score in real time. Checks off tasks like verifying registration, knowing the booth location, preparing documents, and more. Users can download a personalized PDF guide to carry on election day.

### 📊 Impact Visualizer
A data-driven module that uses real electoral statistics to show how a single vote can change outcomes. Features live comparisons of 2019 vs 2024 Lok Sabha turnout data, winning margin statistics (average 8,500 votes in Lok Sabha 2024), and interactive calculations showing the cascading effect of increased voter participation at various scales (+0.1%, +1%, +10% turnout).

### 🎓 Learn Module
A structured civic education library covering the Indian electoral process, constitutional rights, the role of the ECI, voting procedures, and more — written in accessible, jargon-free language.

### 📱 Progressive Web App (PWA)
Fully installable as a PWA on mobile and desktop. Cached pages remain accessible even when offline, ensuring voters in areas with poor connectivity can still access key information. The AI Assistant gracefully degrades with a clear offline notification.

---

## 📸 App Pages & Modules

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Landing page with problem quick-links and feature overview |
| `/dashboard` | **Dashboard** | Personalized voter readiness dashboard |
| `/solve` | **Problem Solver** | Issue-based step-by-step resolution engine |
| `/learn` | **Learn** | Civic education library and electoral process guides |
| `/simulate` | **Voting Simulator** | Interactive EVM & VVPAT practice simulator |
| `/assistant` | **AI Guide** | 24/7 voice-enabled AI civic companion |
| `/checklist` | **Readiness Checklist** | Personalized election preparation tracker |
| `/impact` | **Impact Visualizer** | Data visualizations of voting impact |
| `/first-time` | **First-Time Voter** | Dedicated guided walkthrough for new voters |
| `/documents` | **Document Helper** | ID validity checker for polling booths |
| `/score` | **Civic Score** | Voter engagement and knowledge scoring |
| `/about` | **About** | About the project and its mission |
| `/ethics` | **AI Ethics** | Transparency about AI usage and neutrality |
| `/sources` | **Fact-Check** | Source references and information verification |
| `/privacy` | **Privacy Policy** | Full privacy policy (no personal data stored) |
| `/faq` | **FAQ** | Frequently asked questions |

---

## 🏗️ Tech Stack

VoteSmart AI is built on a modern, production-grade web stack:

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 | Full-stack React framework (App Router) |
| **TypeScript** | 5.x | Type-safe development across the codebase |
| **React** | 19 | UI component library |

### Styling
| Technology | Purpose |
|---|---|
| **Tailwind CSS** | Utility-first CSS framework for rapid UI development |
| **PostCSS** | CSS transformation and optimization pipeline |
| **Custom CSS** | Component-level styles (1.1% of codebase) |

### Testing
| Technology | Purpose |
|---|---|
| **Jest** | Unit and integration testing framework |
| **Playwright** | End-to-end (E2E) browser automation testing |

### Deployment & Infrastructure
| Technology | Purpose |
|---|---|
| **Vercel** | Serverless deployment platform with edge network |
| **GitHub** | Source control and CI/CD pipeline |

### AI & Intelligence
| Technology | Purpose |
|---|---|
| **LLM Integration** | Powers the 24/7 AI Civic Assistant |
| **Web Speech API** | Voice input for the AI assistant |

### Developer Experience
| Technology | Purpose |
|---|---|
| **ESLint** | Code linting and style enforcement |
| **Geist Font** | Vercel's optimized font via `next/font` |

---

## 📁 Project Structure

```
VoteSmart-AI/
│
├── 📂 src/                        # Main application source code
│   └── app/                       # Next.js App Router directory
│       ├── page.tsx               # Home page (/)
│       ├── layout.tsx             # Root layout with global providers
│       ├── globals.css            # Global styles
│       ├── dashboard/             # Voter readiness dashboard
│       ├── solve/                 # Problem Solver module
│       ├── learn/                 # Civic education library
│       ├── simulate/              # EVM & VVPAT simulator
│       ├── assistant/             # AI Civic Assistant
│       ├── checklist/             # Election readiness checklist
│       ├── impact/                # Voting impact visualizer
│       ├── first-time/            # First-time voter guide
│       ├── documents/             # Document validity helper
│       ├── score/                 # Civic score tracker
│       ├── about/                 # About page
│       ├── ethics/                # AI ethics disclosure
│       ├── sources/               # Fact-checking sources
│       ├── privacy/               # Privacy policy
│       ├── faq/                   # FAQ page
│       └── ...                    # Other legal/support pages
│
├── 📂 public/                     # Static assets (images, icons, manifests)
│
├── 📂 __tests__/                  # Jest unit and integration tests
│
├── 📂 e2e/                        # Playwright end-to-end tests
│
├── 📂 scratch/                    # Development scratch/experimental files
│
├── 📄 CLAUDE.md                   # AI agent instructions
├── 📄 AGENTS.md                   # Agent-specific guidelines
├── 📄 next.config.ts              # Next.js configuration
├── 📄 tsconfig.json               # TypeScript compiler configuration
├── 📄 eslint.config.mjs           # ESLint configuration
├── 📄 jest.config.js              # Jest test runner configuration
├── 📄 jest.setup.js               # Jest global setup
├── 📄 playwright.config.ts        # Playwright E2E test configuration
├── 📄 postcss.config.mjs          # PostCSS configuration
├── 📄 package.json                # Dependencies and scripts
└── 📄 .gitignore                  # Git ignore rules
```

---

## ⚡ Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** — version `18.x` or higher ([Download](https://nodejs.org))
- **npm** — comes with Node.js (or use `yarn`, `pnpm`, or `bun`)
- **Git** — for cloning the repository ([Download](https://git-scm.com))

Verify your installations:

```bash
node --version    # Should be >= 18.0.0
npm --version     # Should be >= 9.0.0
git --version
```

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/ShreyanshGupta205/VoteSmart-AI.git
```

**2. Navigate into the project directory**

```bash
cd VoteSmart-AI
```

**3. Install all dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

**4. Set up environment variables** *(if applicable)*

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in any required API keys or configuration values.

### Running the Development Server

Start the local development server with hot-reloading:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically reload whenever you save changes to source files.

> 💡 **Tip:** The entry point for the home page is `src/app/page.tsx`. Start here to understand the application structure.

### Building for Production

To compile an optimized production build:

```bash
npm run build
```

This generates an optimized `.next/` directory. To run the production build locally:

```bash
npm run start
```

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

---

## 🧪 Testing

VoteSmart AI is equipped with a comprehensive two-tier testing strategy to ensure reliability and confidence in every deployment.

### Unit Tests (Jest)

Unit and integration tests live in the `__tests__/` directory and are powered by **Jest** with a custom setup in `jest.setup.js`.

**Run all unit tests:**

```bash
npm test
```

**Run tests in watch mode (re-runs on file changes):**

```bash
npm test -- --watch
```

**Generate a code coverage report:**

```bash
npm test -- --coverage
```

The Jest configuration is defined in `jest.config.js`. This handles TypeScript compilation, module resolution aliases, and test environment setup.

### End-to-End Tests (Playwright)

Full browser automation tests live in the `e2e/` directory and are powered by **Playwright**, which tests the application as a real user would experience it across Chromium, Firefox, and WebKit.

**Install Playwright browsers (first time only):**

```bash
npx playwright install
```

**Run all E2E tests:**

```bash
npx playwright test
```

**Run E2E tests with the interactive UI:**

```bash
npx playwright test --ui
```

**Run E2E tests in headed mode (visible browser):**

```bash
npx playwright test --headed
```

**Generate and view an HTML test report:**

```bash
npx playwright show-report
```

The Playwright configuration is defined in `playwright.config.ts`. It includes base URL settings, test timeouts, retry logic, and browser project definitions.

---

## 🚀 Deployment

VoteSmart AI is deployed and hosted on **Vercel**, the platform built by the creators of Next.js.

### Automatic Deployment (Recommended)

The simplest way to deploy your own instance:

1. Fork this repository on GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/log in
3. Click **"New Project"** and import your forked repository
4. Vercel auto-detects Next.js — accept the default settings
5. Click **"Deploy"** — your app will be live in under 2 minutes

Every push to the `main` branch will trigger an automatic production deployment. Pull requests get their own unique preview URL for testing.

### Manual Deployment via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from the project root
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

If your project uses environment variables, add them in the Vercel dashboard:
`Project Settings → Environment Variables`

### Self-Hosting (Docker / Node Server)

For self-hosting on your own server:

```bash
# 1. Build the production app
npm run build

# 2. Start the production server
npm run start
# App runs on port 3000 by default

# Optional: Use a process manager
npm install -g pm2
pm2 start npm --name "votesmart" -- start
```

---

## 🔐 Privacy & Ethics

Privacy and neutrality are not afterthoughts in VoteSmart AI — they are foundational design principles.

### Our Privacy Commitments

- ✅ **Zero personal data collection** — The platform does not collect, store, or transmit any personally identifiable information (PII)
- ✅ **No document uploads required** — The Document Helper checks ID validity without requiring users to upload sensitive documents
- ✅ **No login required** — Full functionality is available without creating an account
- ✅ **No tracking cookies** — No cross-site tracking or behavioral profiling
- ✅ **Offline-capable** — Critical pages are cached and accessible without an internet connection

### AI Neutrality

- ✅ **100% Non-partisan** — The AI assistant is strictly instructed to provide factual, neutral information and never express or imply preferences for any political party, candidate, or ideology
- ✅ **Verified information only** — All AI responses are grounded in publicly available, verifiable electoral process information
- ✅ **Transparent AI usage** — A dedicated `/ethics` page documents how AI is used within the platform

### Legal Disclaimer

VoteSmart AI is an independent educational platform built by citizens, for citizens. It is **not affiliated with, endorsed by, or connected to** the Election Commission of India (ECI) or any political party.

---

## 🗺️ Roadmap

Here's what's been built and what's coming next:

### ✅ Version 1.0 — Launched
- [x] AI Civic Assistant with voice support
- [x] Problem Solver (6 common voter issues)
- [x] EVM & VVPAT Voting Simulator
- [x] Document Helper
- [x] Readiness Checklist with PDF export
- [x] Impact Visualizer with 2024 election data
- [x] First-Time Voter guided walkthrough
- [x] Civic Score tracker
- [x] Progressive Web App (PWA) with offline support
- [x] Full unit test suite (Jest)
- [x] Full E2E test suite (Playwright)

### 🔄 Version 2.0 — In Progress
- [ ] Multi-language support (Hindi, Tamil, Telugu, Bengali, Marathi)
- [ ] Constituency-specific data lookup by PIN code
- [ ] WhatsApp chatbot integration
- [ ] State Assembly (Vidhan Sabha) election support
- [ ] Accessibility improvements (screen reader, high contrast mode)

### 🌟 Version 3.0 — Planned
- [ ] Real-time voter list verification via API integration
- [ ] Booth locator with Google Maps integration
- [ ] Push notifications for election dates and reminders
- [ ] Community Q&A forum moderated by volunteers
- [ ] Mobile app (React Native) for Android & iOS

---

## 🤝 Contributing

Contributions are what make open source amazing. Whether you're fixing a bug, improving documentation, adding a new language, or suggesting a feature — all contributions are welcome.

### How to Contribute

**1. Fork the repository**

Click the **Fork** button at the top right of this page.

**2. Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/VoteSmart-AI.git
cd VoteSmart-AI
```

**3. Create a feature branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**4. Make your changes**

Write your code, following the existing code style. Make sure to:
- Keep TypeScript types accurate
- Follow the Next.js App Router conventions
- Write or update tests as needed

**5. Test your changes**

```bash
npm test                 # Run unit tests
npx playwright test      # Run E2E tests
npm run lint             # Check for linting errors
npm run build            # Ensure production build succeeds
```

**6. Commit your changes**

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add Hindi language support to AI assistant"
# or
git commit -m "fix: correct VVPAT timer in voting simulator"
```

**7. Push and open a Pull Request**

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub with a clear description of what you've changed and why.

### Contribution Guidelines

- **Code Style** — Follow the existing TypeScript/React patterns in the codebase. ESLint will catch most violations.
- **Commit Messages** — Use [Conventional Commits](https://www.conventionalcommits.org/) format (`feat:`, `fix:`, `docs:`, `chore:`, etc.)
- **Tests** — All new features should include relevant tests. Bug fixes should include a test that covers the fixed case.
- **Accessibility** — Keep accessibility in mind. Use semantic HTML, ARIA labels where appropriate, and ensure keyboard navigation works.
- **Non-partisan** — Any content additions must remain strictly neutral and factual. Political opinions or party preferences of any kind will not be accepted.
- **Privacy** — Never add any functionality that collects or transmits user data without explicit consent and clear disclosure.

### Reporting Bugs

If you find a bug, please [open an issue](https://github.com/ShreyanshGupta205/VoteSmart-AI/issues) with:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected vs actual behavior
- Your browser/OS environment
- Screenshots if applicable

### Requesting Features

Have an idea? [Open a feature request issue](https://github.com/ShreyanshGupta205/VoteSmart-AI/issues) with:
- The problem you want to solve
- Your proposed solution
- Any alternative approaches you considered

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

```
MIT License

Copyright (c) 2026 Shreyansh Gupta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👤 Author

<div align="center">

**Shreyansh Gupta**

[![GitHub](https://img.shields.io/badge/GitHub-ShreyanshGupta205-181717?style=for-the-badge&logo=github)](https://github.com/ShreyanshGupta205)

*Built with ❤️ for India's democracy*

</div>

---

## 🙏 Acknowledgements

A heartfelt thank you to the following:

- **Election Commission of India (ECI)** — for making electoral data and process information publicly available
- **The Next.js Team at Vercel** — for building and maintaining the incredible framework that powers this app
- **The Open Source Community** — for the countless libraries, tools, and inspiration that made this project possible
- **Every First-Time Voter in India** — you are the reason this platform exists

---

<div align="center">

### 🇮🇳 *Making Democracy Accessible, Transparent, and Digital-First*

**[Visit VoteSmart AI →](https://vote-smart-ai.vercel.app)**

<br/>

*"The vote is the most powerful nonviolent tool we have."*

<br/>

⭐ **If you found this project helpful, please give it a star on GitHub!** ⭐

[![Star on GitHub](https://img.shields.io/github/stars/ShreyanshGupta205/VoteSmart-AI?style=social)](https://github.com/ShreyanshGupta205/VoteSmart-AI)

</div>
