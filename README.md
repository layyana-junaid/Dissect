<div align="center">

<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 8L44 12L52 20L56 32L54 44L48 56L40 68L36 72L32 68L26 56L20 44L18 32L22 20L30 12L34 8L40 8Z" fill="#B5293A"/>
  <path d="M40 8L44 12L48 20L50 28L48 36L44 44L40 52L38 56L36 52L32 44L28 36L26 28L28 20L32 12L36 8L40 8Z" fill="#8B1A28"/>
  <path d="M40 4L42 8L40 72L38 76L36 72L38 8L40 4Z" fill="#B5293A"/>
  <ellipse cx="40" cy="76" rx="4" ry="2" fill="#6B6B6B"/>
  <path d="M38 8L40 4L42 8L44 16L42 24L40 32L38 24L36 16L38 8Z" fill="#FFFFFF" fill-opacity="0.3"/>
</svg>

# Dissect

**Your idea, under the knife.**

Four adversarial AI agents tear your idea apart. One rebuilds it stronger.

<br/>

![Built with LangGraph](https://img.shields.io/badge/Built%20with-LangGraph-B5293A?style=for-the-badge)
![Powered by Groq](https://img.shields.io/badge/Powered%20by-Groq-1A1A1A?style=for-the-badge)
![React + FastAPI](https://img.shields.io/badge/React-FastAPI-2D4A8A?style=for-the-badge)
![Multi-Agent](https://img.shields.io/badge/Multi--Agent-Architecture-6B3A8A?style=for-the-badge)

<br/>

</div>

---

## Architecture

<div align="center">

<svg width="700" height="380" viewBox="0 0 700 380" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="700" height="380" fill="#FAFAFA"/>

  <!-- Input Node -->
  <rect x="275" y="20" width="150" height="50" rx="8" fill="#FFFFFF" stroke="#B5293A" stroke-width="2"/>
  <text x="350" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1A1A1A">User Idea Input</text>

  <!-- Arrow from Input to Parallel -->
  <path d="M350 70 L350 100" stroke="#B5293A" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Parallel Execution Box -->
  <rect x="50" y="110" width="600" height="130" rx="12" fill="#FFFFFF" stroke="#B5293A" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="350" y="135" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6B6B6B">PARALLEL EXECUTION</text>

  <!-- Agent 1: Technical Skeptic -->
  <rect x="70" y="150" width="130" height="70" rx="6" fill="#FFFFFF" stroke="#2D4A8A" stroke-width="2"/>
  <text x="135" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#2D4A8A">Technical</text>
  <text x="135" y="192" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#2D4A8A">Skeptic</text>
  <text x="135" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#6B6B6B">Feasibility</text>

  <!-- Agent 2: Market Critic -->
  <rect x="220" y="150" width="130" height="70" rx="6" fill="#FFFFFF" stroke="#B5293A" stroke-width="2"/>
  <text x="285" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#B5293A">Market</text>
  <text x="285" y="192" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#B5293A">Critic</text>
  <text x="285" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#6B6B6B">Viability</text>

  <!-- Agent 3: Ethics Advocate -->
  <rect x="370" y="150" width="130" height="70" rx="6" fill="#FFFFFF" stroke="#6B3A8A" stroke-width="2"/>
  <text x="435" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#6B3A8A">Ethics</text>
  <text x="435" y="192" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#6B3A8A">Advocate</text>
  <text x="435" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#6B6B6B">Risks</text>

  <!-- Agent 4: Lazy User -->
  <rect x="520" y="150" width="130" height="70" rx="6" fill="#FFFFFF" stroke="#2A7A4B" stroke-width="2"/>
  <text x="585" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#2A7A4B">Lazy User</text>
  <text x="585" y="192" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#2A7A4B">Tester</text>
  <text x="585" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#6B6B6B">UX Friction</text>

  <!-- Arrows from Agents to Synthesis -->
  <path d="M135 220 L135 260 L300 280" stroke="#B5293A" stroke-width="2"/>
  <path d="M285 220 L285 260 L320 280" stroke="#B5293A" stroke-width="2"/>
  <path d="M435 220 L435 260 L380 280" stroke="#B5293A" stroke-width="2"/>
  <path d="M585 220 L585 260 L400 280" stroke="#B5293A" stroke-width="2"/>

  <!-- Convergence Point -->
  <circle cx="350" cy="280" r="8" fill="#B5293A"/>

  <!-- Arrow to Synthesis -->
  <path d="M350 288 L350 310" stroke="#B5293A" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Synthesis Agent -->
  <rect x="250" y="315" width="200" height="50" rx="8" fill="#B5293A" stroke="#8B1A28" stroke-width="2"/>
  <text x="350" y="345" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Synthesis Agent</text>

  <!-- Arrow definitions -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#B5293A"/>
    </marker>
  </defs>
</svg>

</div>

---

## Features

| Feature | Description |
|---------|-------------|
| **Parallel Agent Critique** | Four specialized AI agents analyze your idea simultaneously, each from a different critical angle |
| **Real-time Streaming** | Watch critiques appear token-by-token via Server-Sent Events |
| **Document Upload** | Submit ideas via text input or upload PDF/DOCX documents |
| **Synthesis Engine** | A fifth agent combines all critiques into a hardened, improved version |
| **Adversarial Prompts** | Agents are genuinely harsh, not politely critical — designed to find real weaknesses |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend Framework** | FastAPI with async SSE streaming |
| **Agent Orchestration** | LangGraph with parallel node execution |
| **LLM Provider** | Groq (llama-3.1-70b-versatile) |
| **Document Parsing** | pdfplumber, python-docx |
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS with custom design system |
| **Streaming** | Native fetch with ReadableStream |

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Groq API key ([get one here](https://console.groq.com))

### Backend Setup

```bash
cd dissect-backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Run server
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd dissect-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## How It Works

### 1. Input Processing
The user submits an idea via text or document upload. Documents (PDF/DOCX) are parsed server-side and merged with any typed text.

### 2. Parallel Critique Phase
Four adversarial agents run simultaneously via LangGraph parallel nodes:

- **Technical Skeptic** — Attacks feasibility, scalability, hidden engineering costs, security vulnerabilities
- **Market Critic** — Attacks market size, competition, timing, customer acquisition, unit economics
- **Ethics Advocate** — Exposes bias, misuse potential, privacy risks, regulatory collisions
- **Lazy User Tester** — Attacks onboarding friction, cognitive load, time-to-value

### 3. Synthesis Phase
Once all four agents complete, a fifth Synthesis Agent receives all critiques and generates:

- A rebuilt core idea addressing each weakness
- Specific technical, market, ethics, and UX fixes
- Key trade-offs and 90-day focus recommendations

### 4. Live Streaming
All agent outputs stream token-by-token to the frontend via SSE, rendered with proper markdown formatting.

---

## Project Structure

```
dissect-backend/
    main.py              # FastAPI app, SSE streaming endpoints
    agents.py            # Agent prompts and LangChain chains
    graph.py             # LangGraph parallel execution pipeline
    utils.py             # PDF/DOCX text extraction
    requirements.txt     # Python dependencies
    .env.example         # Environment template

dissect-frontend/
    src/
        App.jsx                  # Main app with SSE handling
        components/
            HeroSection.jsx      # Landing hero with CTA
            InputPanel.jsx       # Text + file upload form
            AgentCard.jsx        # Streaming agent output card
            SynthesisPanel.jsx   # Final synthesis with copy
        index.css                # Tailwind + animations
        main.jsx                 # React entry point
    index.html                   # HTML with Google Fonts
    tailwind.config.js           # Design system config
    package.json                 # Node dependencies
```

---

## API Reference

### POST /analyze

Analyze an idea using adversarial agents.

**Request:** `multipart/form-data`
- `idea` (string, optional): The idea text
- `file` (file, optional): PDF or DOCX document

**Response:** `text/event-stream`

```
data: {"agent": "technical_skeptic", "chunk": "...", "is_done": false}
data: {"agent": "market_critic", "chunk": "...", "is_done": false}
data: {"agent": "synthesis", "chunk": "...", "is_done": true}
data: {"agent": "done", "chunk": "", "is_done": true}
```

### GET /health

Health check endpoint.

**Response:** `application/json`
```json
{"status": "healthy", "service": "dissect-api"}
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#F5ECD7` | Page background |
| Primary | `#B5293A` | CTAs, accents, branding |
| Primary Dark | `#8B1A28` | Hover states |
| Card | `#FFFFFF` | Card backgrounds |
| Text Primary | `#1A1A1A` | Headings, body |
| Text Secondary | `#6B6B6B` | Muted text |
| Border | `#E8D5B5` | Card borders |
| Technical | `#2D4A8A` | Technical Skeptic accent |
| Market | `#B5293A` | Market Critic accent |
| Ethics | `#6B3A8A` | Ethics Advocate accent |
| UX | `#2A7A4B` | Lazy User Tester accent |
| Gold | `#C9973A` | Synthesis accent |

---

## License

MIT

---

<div align="center">

**Dissect** — Stress-test your ideas before the world does.

</div>
