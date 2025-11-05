# 🐞 BugChat – QA Messaging Test Project

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)](https://nodejs.org/)
[![Cypress](https://img.shields.io/badge/Cypress-13.x-04C38E?logo=cypress)](https://www.cypress.io/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-blue?logo=githubactions)](https://github.com/features/actions)
[![Postman](https://img.shields.io/badge/Postman-Newman-orange?logo=postman)](https://www.postman.com/)

> **Because even chats deserve bug-free conversations 💬**

---

## 📖 Project Overview

**BugChat** is a fictional messaging platform designed to simulate real-world QA automation challenges.  
The goal of this project is to demonstrate hands-on experience with **Cypress**, **API testing**, **mocking**, and **CI/CD pipelines** — all wrapped in a realistic, creative use case.

Imagine a chat system where users can send and receive messages across different channels.  
As a QA Automation Engineer, your mission is to ensure every message is delivered, received, and displayed flawlessly — no bugs allowed 🧠  

---

## ⚙️ Tech Stack

- **Cypress 13.x** – E2E & API testing  
- **JavaScript / TypeScript** – test logic and structure  
- **Postman + Newman** – API validation & reporting  
- **GitHub Actions** – continuous integration pipeline  
- **Mochawesome** – beautiful HTML test reports  
- **Node.js 20.x** – runtime environment  

---

## ✅ Features & Test Coverage

| Area | Description |
|------|--------------|
| **Login** | Validate login flow and error handling for invalid users |
| **Send Message** | Simulate sending a message and ensure API response matches UI behavior |
| **Chat History** | Verify that chat history loads correctly and maintains message order |
| **Message Delivery** | Mock network latency and simulate failed deliveries |
| **API Health** | Check API endpoints’ response codes and structure via Postman/Newman |
| **CI/CD Reports** | Generate HTML and JUnit reports automatically on each pipeline run |

---

## 🧱 Folder Structure

```
bugchat-qa-automation/
│
├── cypress/
│   ├── e2e/
│   │   ├── ui/
│   │   │   ├── login.cy.js
│   │   │   ├── sendMessage.cy.js
│   │   │   └── chatHistory.cy.js
│   │   └── api/
│   │       ├── health.cy.js
│   │       ├── messages.cy.js
│   │       └── users.cy.js
│   ├── fixtures/
│   │   └── user.json
│   └── support/
│       └── e2e.js
│
├── postman/
│   └── bugchat.postman_collection.json
├── .github/workflows/
│   └── ci.yml
├── package.json
└── README.md
```

---

## 💻 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/bugchat-qa-automation.git
cd bugchat-qa-automation

# Install dependencies
npm install

# Run Cypress tests (UI + API)
npm run test:ui

# Run Postman collection via Newman
npm run test:api:newman

# Run everything together
npm run test:all
```

> Reports will be available inside the `/reports` folder after execution.

---

## 🚀 Continuous Integration (CI)

This project includes a **GitHub Actions workflow** that automatically:
1. Installs dependencies  
2. Runs Cypress and Newman tests  
3. Uploads test reports as build artifacts  

CI status and logs are visible under the **“Actions”** tab on GitHub.

---

## 📊 Reports & Artifacts

- **HTML Reports:** generated via Mochawesome  
- **JUnit XML Reports:** exported by Newman  
- **Artifacts:** attached automatically to GitHub Actions builds

> These reports provide full visibility into test results, assertions, and API responses.

---

## ✨ Author

**Created with ❤️ by Daniele Brito**  
💬 *“Always testing, always learning.”*  
