# Dissect — Multi-Agent Adversarial Idea Critique Tool

Four ruthless AI agents tear your idea apart from every angle. A fifth rebuilds it stronger. Stress-test your ideas before the world does.

## How It Works

1. **Input your idea** — Type it out or upload a PDF/DOCX document
2. **Four adversarial agents attack simultaneously:**
   - ⚙️ **Technical Skeptic** — Attacks feasibility, scalability, and engineering complexity
   - 📊 **Market Critic** — Attacks market size, competition, and monetization
   - ⚖️ **Ethics Devil's Advocate** — Exposes ethical risks, bias, and regulation concerns
   - 😴 **Lazy User Tester** — Attacks UX friction and onboarding pain points
3. **Synthesis Agent rebuilds** — Combines all critiques into a hardened, improved version

All responses stream live to the UI in real-time.

## Tech Stack

- **Backend:** Python, FastAPI, LangGraph, LangChain, Groq (llama-3.1-70b-versatile)
- **Frontend:** React (Vite), Tailwind CSS, SSE streaming

## Setup

### Backend

```bash
cd dissect-backend
pip install -r requirements.txt

# Create .env file with your Groq API key
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Run the server
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

### Frontend

```bash
cd dissect-frontend
npm install
npm run dev
```

The app will be available at http://localhost:5173

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key (get one at https://console.groq.com) |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/analyze` | POST | Analyze idea (multipart form with `idea` text and optional `file`) |
| `/analyze-json` | POST | Analyze idea (JSON body with `idea` field) |

## License

MIT
