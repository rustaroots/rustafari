# Contributing to Rustafari

Thank you for considering contributing to **Rustafari**! This guide will help you make effective contributions to the project.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Reporting Issues](#reporting-issues)
3. [Proposing a New Feature](#proposing-a-new-feature)
4. [Setting Up Your Environment](#setting-up-your-environment)
5. [Code Style](#code-style)
6. [Submitting a Pull Request](#submitting-a-pull-request)
7. [Communication](#communication)

---

## Getting Started

1. **Fork the repository**: Create a copy of the project on your own GitHub account.
2. **Clone your fork**: Clone your fork to your local machine:
   ```bash
   git clone https://github.com/your-username/rustafari.git
   ```
3. **Create a branch**: Work on a specific branch for your contribution:
   ```bash
   git checkout -b feature/feature-name
   ```

---

## Reporting Issues

If you find a bug or have a question, please open an issue. Before submitting:

1. **Search for existing issues** to avoid duplicates.
2. **Provide as much detail as possible**:
    - The version you’re using.
    - Steps to reproduce the issue.
    - Expected and actual behavior.
    - Screenshots or logs, if applicable.

Use a clear and descriptive title for your issue.

---

## Proposing a New Feature

We welcome feature suggestions! To propose a new feature:

1. **Check existing issues** to see if the feature is already discussed.
2. Open a **Feature Request** issue with:
    - A clear and descriptive title.
    - The problem the feature addresses.
    - A detailed explanation of your proposal.
    - Any mockups or examples (if applicable).

---

## Setting Up Your Environment

Follow these steps to set up your local development environment:

1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).
2. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/your-username/rustafari.git
   cd rustafari
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Run the tests to ensure everything works:
   ```bash
   npm test
   ```

---

## Code Style

Please adhere to the following coding conventions:

1. Use **TypeScript** for all new code.
2. Follow the project's linting rules by running:
   ```bash
   npm run lint
   ```
3. Write clear, concise, and well-documented code.
4. Add comments where necessary to explain non-obvious logic.

---

## Submitting a Pull Request

1. Ensure your code follows the [Code Style](#code-style) guidelines.
2. Rebase your branch onto the latest `main` branch:
   ```bash
   git pull --rebase origin main
   ```
3. Push your branch to your fork:
   ```bash
   git push origin feature/feature-name
   ```
4. Open a Pull Request (PR) from your branch to the `main` branch of the upstream repository.
5. Include the following in your PR description:
    - The purpose of the PR.
    - A summary of changes.
    - Any relevant issues the PR fixes or addresses.

---

## Communication

For questions, discussions, or feedback, feel free to reach out via:

- [GitHub Issues](https://github.com/rustaroots/rustafari)

We look forward to your contributions! Thank you for helping make **Rustafari** better.
