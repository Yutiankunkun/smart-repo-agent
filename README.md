# Smart Repo Agent

A full-stack system for student management and AI-assisted meeting support. Homeroom teachers can manage students, teachers, and meeting records, and interact with an AI agent for natural-language queries and meeting memo summarization.

## Project Structure

```
smart-repo-agent/
├── smart-repo-agent-backend/   # FastAPI backend
├── smart-repo-agent-frontend/  # React frontend (built with vibe coding)
└── README.md
```

## Quick Start

### Backend

```bash
cd smart-repo-agent-backend
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
# Set DASHSCOPE_API_KEY in .env
python main.py
```

API runs at `http://localhost:8000`.

### Frontend

> **Note:** The frontend was built with vibe coding.

```bash
cd smart-repo-agent-frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## Features

- **Student Management**: CRUD for students with teacher assignment and filtering
- **Teacher Management**: CRUD for homeroom teachers
- **AI Meeting Assistant**: Chat interface for querying student info, summarizing meeting memos, and updating records via natural language

## Tech Stack

| Layer   | Stack                          |
|---------|---------------------------------|
| Backend | FastAPI, SQLAlchemy, SQLite     |
| Frontend| React 18, Tailwind CSS, Axios   |
| AI      | DashScope (Qwen) via OpenAI API |

## Documentation

- [Backend README](smart-repo-agent-backend/README.md) — API details, agent tools, setup
- [Frontend README](smart-repo-agent-frontend/README.md) — Frontend setup and features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.